<?php

namespace App\Http\Controllers;

use App\Http\Middleware\StaffMiddleware;
use App\Models\Action;
use App\Models\Lead;
use App\Models\User;
use App\Support\CrmSchema;
use App\Support\CrmTicker;
use App\Support\LeadRouter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * «بكام» — "قدّم عرض سعر" on a unit.
 *
 * POST /api/web/units/{id}/offer {price, name?, phone?, note?}
 *  - logged-in website users: name / phone are taken from their account
 *  - the offer is saved (unit_offers) and becomes a lead in the CRM:
 *      unit posted by staff  → the lead goes to that person + a notification
 *      unit posted by an owner → automatic distribution (or the admin)
 *  - returns the WhatsApp number of the person who posted the unit; the website
 *    opens WhatsApp on the client's phone with the full offer message ready.
 */
class UnitOfferController extends Controller
{
    const COMPANY_WA = '201113555557';

    public function store(Request $request, $id)
    {
        CrmSchema::ensure();
        $me = $this->optionalUser();
        $d = $request->validate([
            'price' => 'required|integer|min:10000|max:100000000000',
            'name' => ($me ? 'nullable' : 'required') . '|string|min:2|max:120',
            'phone' => ($me ? 'nullable' : 'required') . '|string|min:8|max:40',
            'note' => 'nullable|string|max:500',
            'website' => 'nullable|max:0', // honeypot
        ]);
        $u = DB::table('units')->whereNull('deleted_at')->where('state', 'approved')->where('id', (int) $id)->first();
        if (!$u) return response()->json(['message' => 'Not found'], 404);

        $name = trim($me ? ($me->first_name . ' ' . $me->last_name) : $d['name']) ?: trim((string) ($d['name'] ?? ''));
        $rawPhone = $me && $me->phone ? $me->phone : ($d['phone'] ?? '');
        $phone = \App\Support\Phone::normalize($rawPhone) ?: preg_replace('/[^\d+]/', '', (string) $rawPhone);
        if ($phone === '' || strlen(preg_replace('/\D/', '', $phone)) < 8) {
            return response()->json(['message' => 'رقم الموبايل مش مظبوط', 'errors' => ['phone' => ['invalid']]], 422);
        }

        $poster = $u->user_id ? User::find($u->user_id) : null;
        $wa = $this->waNumber($poster ? $poster->phone : '');
        $staff = $poster ? StaffMiddleware::isStaff($poster) : false;
        $asking = (int) ($u->price ?? 0);
        $diff = $asking > 0 ? round(($d['price'] - $asking) / $asking * 100, 1) : null;
        $link = \App\Support\PublicUrl::site($request) . '/unit/' . (int) $u->id;

        $leadId = null;
        try {
            $leadId = $this->toCrm($u, $poster, $staff, $name, $phone, (int) $d['price'], $asking, $diff, $d['note'] ?? null, $link);
        } catch (\Throwable $e) {
            Log::warning('unit offer → crm: ' . $e->getMessage());
        }
        DB::table('unit_offers')->insert([
            'unit_id' => $u->id, 'user_id' => $me ? $me->id : null, 'lead_id' => $leadId,
            'name' => mb_substr($name, 0, 120), 'phone' => $phone, 'price' => (int) $d['price'], 'asking' => $asking ?: null,
            'note' => $d['note'] ?? null, 'created_at' => now(),
        ]);

        return response()->json([
            'ok' => true,
            'wa' => $wa ?: self::COMPANY_WA,
            'direct' => $wa !== '',
            'owner' => $poster ? trim($poster->first_name . ' ' . $poster->last_name) : '',
            'name' => $name,
            'phone' => $phone,
        ], 201);
    }

    private function toCrm($u, $poster, $staff, $name, $phone, $price, $asking, $diff, $note, $link)
    {
        $existing = Lead::findDuplicate([$phone]);
        $owner = $staff ? (int) $poster->id : ($existing && $existing->user_id ? (int) $existing->user_id : LeadRouter::ADMIN_FALLBACK);
        $lead = Lead::create([
            'client_name' => mb_substr($name, 0, 120),
            'client_number' => $phone,
            'user_id' => $owner,
            'project_id' => $u->project_id ?: null,
            'unit_link' => $link,
            'action_type' => 'Price offer',
            'channel' => 'Website',
            'area' => $u->city ?: 'Other',
            'stage' => 'Fresh lead',
            'status' => 'In progress',
            'isduplicate' => $existing ? true : false,
        ]);
        $line = 'عرض سعر على الوحدة #' . $u->id . ': ' . number_format($price) . ' ج.م'
            . ($asking ? ' (المطلوب ' . number_format($asking) . ' ج.م، ' . ($diff >= 0 ? '+' : '') . $diff . '%)' : '')
            . ($note ? ' | ملاحظة: ' . $note : '');
        Action::create(['user_id' => LeadRouter::ADMIN_FALLBACK, 'lead_id' => $lead->id, 'action_type' => 'create lead', 'details' => 'Website (بكام) price offer — ' . $line]);

        $n = ['title' => 'Price offer #' . $lead->id, 'description' => $name . ' — ' . number_format($price) . ' EGP on unit #' . $u->id, 'lead_id' => $lead->id, 'notification_type' => 'Broadcast'];
        if ($staff) {
            CrmTicker::notifyUsers([$poster], $n);
        } elseif (!$existing && !LeadRouter::route($lead, 'Price offer')) {
            CrmTicker::notifyUsers(User::where('role_id', 3)->get(), $n);
        } elseif ($existing) {
            CrmTicker::notifyLead($lead, $n, false);
        }
        return $lead->id;
    }

    /** the website account if a valid login token came with the request (the route itself is public) */
    private function optionalUser()
    {
        if (!request()->bearerToken()) return null;
        try { return Auth::guard('api')->user(); } catch (\Throwable $e) { return null; }
    }

    /** a phone number as WhatsApp wants it (20…), or '' */
    private function waNumber($raw)
    {
        $d = preg_replace('/\D+/', '', (string) $raw);
        if ($d === '') return '';
        if (strpos($d, '0020') === 0) $d = substr($d, 2);
        if ($d[0] === '0') $d = '2' . $d;
        if (strpos($d, '20') !== 0 && strlen($d) === 10) $d = '20' . $d;
        return strlen($d) >= 11 ? $d : '';
    }
}
