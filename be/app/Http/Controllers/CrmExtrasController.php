<?php

namespace App\Http\Controllers;

use App\Models\Action;
use App\Models\Lead;
use App\Models\User;
use App\Support\CrmSchema;
use App\Support\LeadScope;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

/** WhatsApp templates, protected phone numbers, personal calendar feed. */
class CrmExtrasController extends Controller
{
    const VIEW_ALERT_PER_HOUR = 30;

    private function leadOr403($id)
    {
        CrmSchema::ensure();
        $lead = Lead::find((int) $id);
        if (!$lead) abort(response()->json(['message' => 'Not found'], 404));
        $ids = LeadScope::userIds(Auth::user());
        if ($ids !== null && !in_array((int) $lead->user_id, $ids, true)) abort(response()->json(['message' => 'Forbidden'], 403));
        return $lead;
    }

    private function adminOnly()
    {
        if (!LeadScope::isAdmin(Auth::user())) abort(response()->json(['message' => 'Admins only'], 403));
        CrmSchema::ensure();
    }

    /* ================= WhatsApp templates ================= */

    public function waTemplates()
    {
        CrmSchema::ensure();
        return response()->json(['items' => DB::table('wa_templates')->orderBy('title')->get(['id', 'title', 'body'])]);
    }

    public function waStore(Request $request)
    {
        $this->adminOnly();
        $d = $this->waValid($request);
        $id = DB::table('wa_templates')->insertGetId($d + ['created_by' => Auth::id(), 'created_at' => now(), 'updated_at' => now()]);
        return response()->json(['id' => $id] + $d, 201);
    }

    public function waUpdate(Request $request, $id)
    {
        $this->adminOnly();
        $d = $this->waValid($request);
        DB::table('wa_templates')->where('id', (int) $id)->update($d + ['updated_at' => now()]);
        return response()->json(['id' => (int) $id] + $d);
    }

    public function waDelete($id)
    {
        $this->adminOnly();
        DB::table('wa_templates')->where('id', (int) $id)->delete();
        return response()->json(['ok' => true]);
    }

    private function waValid(Request $request)
    {
        $title = trim((string) $request->input('title'));
        $body = trim((string) $request->input('body'));
        if ($title === '' || $body === '') abort(response()->json(['message' => 'Title and message are required'], 422));
        return ['title' => mb_substr($title, 0, 120), 'body' => mb_substr($body, 0, 4000)];
    }

    /** POST /crm/leads/{id}/wa-log {template} — keeps a line in the lead history */
    public function waLog(Request $request, $id)
    {
        $lead = $this->leadOr403($id);
        $me = Auth::user();
        $t = trim((string) $request->input('template', ''));
        Action::create([
            'user_id' => $me->id,
            'action_type' => 'whatsapp',
            'details' => $me->first_name . ' ' . $me->last_name . ' sent WhatsApp' . ($t !== '' ? ' "' . mb_substr($t, 0, 120) . '"' : '') . ' to Lead: ' . $lead->client_name,
            'lead_id' => $lead->id,
        ]);
        return response()->json(['ok' => true]);
    }

    /* ================= protected numbers ================= */

    /** GET /crm/leads/{id}/phone?reason=view|call|whatsapp — full number, logged */
    public function phone(Request $request, $id)
    {
        $lead = $this->leadOr403($id);
        $me = Auth::user();
        $reason = in_array($request->input('reason'), ['view', 'call', 'whatsapp'], true) ? $request->input('reason') : 'view';
        if (!LeadScope::isAdmin($me)) {
            DB::table('lead_phone_views')->insert(['lead_id' => $lead->id, 'user_id' => $me->id, 'reason' => $reason, 'created_at' => now()]);
            $count = DB::table('lead_phone_views')->where('user_id', $me->id)->where('created_at', '>=', now()->subHour())->distinct()->count('lead_id');
            if ($count >= self::VIEW_ALERT_PER_HOUR && Cache::add('crm.phone.alert.' . $me->id, 1, 3600)) {
                $name = trim($me->first_name . ' ' . $me->last_name);
                foreach (User::where('role_id', 3)->orWhere('account_type', 'Admin')->get() as $admin) {
                    try {
                        $admin->pushNotification([
                            'title' => 'Data alert',
                            'description' => $name . ' opened ' . $count . ' client numbers in the last hour',
                            'notification_type' => 'Broadcast',
                        ]);
                    } catch (\Throwable $e) {}
                }
            }
        }
        return response()->json(['client_number' => $lead->client_number, 'client_sec_number' => $lead->client_sec_number]);
    }

    /** GET /crm/phone-views?days=7 — admin: who opened how many numbers */
    public function phoneViews(Request $request)
    {
        $this->adminOnly();
        $days = max(1, min(90, (int) $request->input('days', 7)));
        $rows = DB::table('lead_phone_views as v')->join('users as u', 'u.id', '=', 'v.user_id')
            ->where('v.created_at', '>=', now()->subDays($days))
            ->groupBy('v.user_id', 'u.first_name', 'u.last_name')
            ->selectRaw("v.user_id, TRIM(CONCAT(u.first_name,' ',u.last_name)) as name, COUNT(*) as views, COUNT(DISTINCT v.lead_id) as leads, MAX(v.created_at) as last_at")
            ->orderByDesc('leads')->get();
        return response()->json(['days' => $days, 'rows' => $rows, 'alert_per_hour' => self::VIEW_ALERT_PER_HOUR]);
    }

    /* ================= calendar ================= */

    private function calUrls($user)
    {
        $https = url('/api/cal/' . $user->cal_token . '.ics');
        if (strpos($https, '127.0.0.1') === false && strpos($https, 'localhost') === false) $https = preg_replace('#^http://#', 'https://', $https);
        return ['url' => $https, 'webcal' => preg_replace('#^https?://#', 'webcal://', $https),
            'google' => 'https://calendar.google.com/calendar/r?cid=' . rawurlencode(preg_replace('#^https?://#', 'webcal://', $https))];
    }

    /** GET /crm/calendar-link — personal subscribe link (created on first use) */
    public function calendarLink()
    {
        CrmSchema::ensure();
        $me = User::find(Auth::id());
        if (!$me->cal_token) { $me->cal_token = Str::random(40); $me->save(); }
        return response()->json($this->calUrls($me));
    }

    /** POST /crm/calendar-link — new link (old one stops working) */
    public function calendarReset()
    {
        CrmSchema::ensure();
        $me = User::find(Auth::id());
        $me->cal_token = Str::random(40);
        $me->save();
        return response()->json($this->calUrls($me));
    }

    /** GET /api/cal/{token}.ics — follow-ups + open tasks of that person, with reminders */
    public function feed($token)
    {
        CrmSchema::ensure();
        if (strlen($token) < 30) abort(404);
        $user = User::where('cal_token', $token)->first();
        if (!$user) abort(404);
        $tz = config('app.timezone');
        $from = now()->subDays(14);
        $to = now()->addDays(120);
        $dash = 'https://dashboard.bekameg.com';
        $esc = function ($s) { return str_replace(["\\", ';', ',', "\r", "\n"], ["\\\\", '\;', '\,', '', '\n'], (string) $s); };
        $fmt = function ($dt) use ($tz) { return \Carbon\Carbon::parse($dt, $tz)->utc()->format('Ymd\THis\Z'); };
        $lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Triple A//CRM//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
            'X-WR-CALNAME:Triple A CRM follow-ups', 'X-WR-TIMEZONE:' . $tz, 'REFRESH-INTERVAL;VALUE=DURATION:PT15M', 'X-PUBLISHED-TTL:PT15M'];
        $event = function ($uid, $start, $title, $desc, $url) use (&$lines, $fmt, $esc) {
            $s = \Carbon\Carbon::parse($start, config('app.timezone'));
            array_push($lines, 'BEGIN:VEVENT', 'UID:' . $uid . '@tapegypt.com', 'DTSTAMP:' . gmdate('Ymd\THis\Z'),
                'DTSTART:' . $fmt($s), 'DTEND:' . $fmt($s->copy()->addMinutes(30)), 'SUMMARY:' . $esc($title),
                'DESCRIPTION:' . $esc($desc), 'URL:' . $url,
                'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:' . $esc($title), 'TRIGGER:-PT10M', 'END:VALARM',
                'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:' . $esc($title), 'TRIGGER:PT0M', 'END:VALARM',
                'END:VEVENT');
        };
        $leads = Lead::where('user_id', $user->id)->whereNotNull('next_followUp_date')
            ->whereBetween('next_followUp_date', [$from, $to])
            ->whereNotIn('stage', ['Done deal', 'not interested'])
            ->orderBy('next_followUp_date')->limit(1000)->get(['id', 'client_name', 'stage', 'next_followUp_date']);
        foreach ($leads as $l) {
            $event('fu-' . $l->id, $l->next_followUp_date, 'Follow up: ' . $l->client_name,
                'Stage: ' . $l->stage . "\n" . $dash . '/lead/' . $l->id, $dash . '/lead/' . $l->id);
        }
        if (CrmSchema::has('lead_tasks')) {
            $tasks = DB::table('lead_tasks as t')->join('leads as l', 'l.id', '=', 't.lead_id')
                ->where(function ($w) use ($user) { $w->where('t.user_id', $user->id)->orWhere('l.user_id', $user->id); })
                ->whereNull('t.done_at')->whereNotNull('t.due_at')->whereBetween('t.due_at', [$from, $to])
                ->limit(1000)->get(['t.id', 't.title', 't.due_at', 'l.id as lead_id', 'l.client_name']);
            foreach ($tasks as $t) {
                $event('task-' . $t->id, $t->due_at, $t->title . ' — ' . $t->client_name, $dash . '/lead/' . $t->lead_id, $dash . '/lead/' . $t->lead_id);
            }
        }
        $lines[] = 'END:VCALENDAR';
        $body = '';
        foreach ($lines as $line) {
            while (strlen($line) > 74) { $cut = mb_strcut($line, 0, 74); $body .= $cut . "\r\n"; $line = ' ' . substr($line, strlen($cut)); }
            $body .= $line . "\r\n";
        }
        return response($body, 200, ['Content-Type' => 'text/calendar; charset=utf-8', 'Cache-Control' => 'no-cache, max-age=0']);
    }
}
