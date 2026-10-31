<?php

namespace App\Support;

use App\Http\Middleware\StaffMiddleware;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * «بكام» notifications that make the experience feel alive (31 Oct 2026):
 *  1. offer answered      — the buyer hears back: accepted / rejected / counter price   (UnitOfferController@respond)
 *  2. link opened         — the salesman knows the client is looking at the units now   (UnitCollectionController@show)
 *  3. favorite price drop — everyone who saved the unit                                  (Unit::updated)
 *  4. unit published / not published, with the reason — the owner who listed it         (Unit::updated)
 *  5. your advisor        — the client learns who will call and from which number        (Lead::saved)
 * Every notification goes to the bell on the website / app and as a push to the phone.
 * The same message never repeats inside its window (cache key), and nothing here can break the save that triggered it.
 */
class ClientNotify
{
    /** send once per $key inside $hours; returns true when sent */
    public static function send($user, $title, $desc, array $extra = [], $key = null, $hours = 24)
    {
        if (!$user) return false;
        if ($key && !Cache::add('cn:' . $key, 1, now()->addHours($hours))) return false;
        $unitId = $extra['unit_id'] ?? null;
        $data = ['notification_type' => $unitId ? 'unit' : 'Broadcast', 'title' => mb_substr($title, 0, 120), 'description' => mb_substr($desc, 0, 190)];
        if ($unitId) $data['id'] = (int) $unitId;
        if (!empty($extra['lead_id'])) $data['lead_id'] = (int) $extra['lead_id'];
        $before = DB::table('notifications')->where('user_id', $user->id)->max('id');
        try { $user->pushNotification($data); } catch (\Throwable $e) { Log::info('client notify: ' . $e->getMessage()); }
        // the bell must show it even if the push itself failed
        if (DB::table('notifications')->where('user_id', $user->id)->max('id') == $before) {
            try {
                DB::table('notifications')->insert(['user_id' => $user->id, 'title' => $data['title'], 'type' => $data['notification_type'],
                    'description' => $data['description'], 'unit_id' => $unitId, 'seen' => 0, 'created_at' => now(), 'updated_at' => now()]);
            } catch (\Throwable $e) {}
        }
        return true;
    }

    /** the website / app account of a phone number (last 10 digits), or null */
    public static function userByPhone($phone)
    {
        $d = preg_replace('/\D+/', '', (string) $phone);
        if (strlen($d) < 10) return null;
        $tail = substr($d, -10);
        try {
            return User::whereNull('deleted_at')->where('phone', 'like', '%' . substr($tail, -9))->get()
                ->first(function ($u) use ($tail) { return substr(preg_replace('/\D+/', '', (string) $u->phone), -10) === $tail; });
        } catch (\Throwable $e) {
            return User::where('phone', 'like', '%' . substr($tail, -9))->get()
                ->first(function ($u) use ($tail) { return substr(preg_replace('/\D+/', '', (string) $u->phone), -10) === $tail; });
        }
    }

    private static function money($v)
    {
        $v = (int) $v;
        if ($v >= 1000000) return rtrim(rtrim(number_format($v / 1000000, 2), '0'), '.') . ' مليون ج.م';
        return number_format($v) . ' ج.م';
    }

    private static function unitName($u)
    {
        $types = ['Apartment' => 'شقة', 'Chalet' => 'شاليه', 'Ground Floor' => 'دور أرضي بجاردن', 'Stand Alone' => 'فيلا مستقلة', 'Twin House' => 'توين هاوس',
            'Penthouse' => 'بنتهاوس', 'Town house middle' => 'تاون هاوس', 'Town house corner' => 'تاون هاوس كورنر', 'Studio' => 'استوديو',
            'I Villa Garden' => 'آي فيلا جاردن', 'I Villa Roof' => 'آي فيلا روف', 'Loft' => 'لوفت', 'Duplex' => 'دوبلكس', 'Cabin' => 'كابينة',
            'Sky House' => 'سكاي هاوس', 'Beach House' => 'بيتش هاوس', 'Office' => 'مكتب', 'Upper Duplex' => 'دوبلكس علوي', 'Clinic' => 'عيادة',
            'Stand Alone Chalet' => 'شاليه مستقل', 'Ground Duplex' => 'دوبلكس أرضي', 'Service Apartment' => 'شقة فندقية', 'Service Chalet' => 'شاليه فندقي',
            'Villa' => 'فيلا', 'Townhouse' => 'تاون هاوس', 'Shop' => 'محل'];
        $t = $types[$u->type ?? ''] ?? ($u->type ?: 'وحدة');
        $p = null;
        try { $p = $u->project_id ? DB::table('projects')->where('id', $u->project_id)->value('name') : null; } catch (\Throwable $e) {}
        return trim($t . ($p ? ' في ' . $p : ($u->city ? ' في ' . $u->city : '')));
    }

    /* ---------------------------------------------------------------- 3 + 4: a unit changed */

    public static function unitUpdated($unit)
    {
        try {
            $orig = $unit->getOriginal();
            $live = $unit->state === 'approved' && !$unit->deleted_at;

            // 4. published / not published — tell the person who listed it (not when they approve their own)
            $wasLive = ($orig['state'] ?? null) === 'approved' && empty($orig['deleted_at']);
            $owner = $unit->user_id ? User::find($unit->user_id) : null;
            $byOwner = $owner && (int) (Auth::guard('api')->id() ?: Auth::id()) === (int) $owner->id;
            if ($owner && !$byOwner) {
                if ($live && !$wasLive && $unit->wasChanged(['state', 'deleted_at'])) {
                    self::send($owner, 'وحدتك اتنشرت على بكام ✅', self::unitName($unit) . ' بقت ظاهرة للناس على الموقع والأبلكيشن.',
                        ['unit_id' => $unit->id], 'pub:' . $unit->id . ':' . $unit->updated_at, 1);
                } elseif ($unit->state === 'rejected' && ($orig['state'] ?? null) !== 'rejected') {
                    $why = trim((string) $unit->reason);
                    self::send($owner, 'وحدتك ما اتنشرتش', self::unitName($unit) . ($why ? ' — السبب: ' . $why : '') . '. عدّلها من «وحداتي» وابعتها تاني.',
                        ['unit_id' => $unit->id], 'rej:' . $unit->id . ':' . $unit->updated_at, 1);
                }
            }

            // 3. price went down on a live unit — everyone who saved it (not the owner)
            $old = (int) ($orig['price'] ?? 0);
            $new = (int) $unit->price;
            if ($live && $unit->wasChanged('price') && $old > 0 && $new > 0 && $new < $old) {
                $pct = round(($old - $new) / $old * 100);
                $ids = DB::table('wishlists')->where('unit_id', $unit->id)->pluck('user_id')->unique()->take(500);
                foreach (User::whereIn('id', $ids)->get() as $u) {
                    if ($owner && $u->id === $owner->id) continue;
                    self::send($u, 'السعر نزل في وحدة في المفضلة 🔻', self::unitName($unit) . ': من ' . self::money($old) . ' لـ ' . self::money($new) . ($pct >= 1 ? ' (−' . $pct . '%)' : ''),
                        ['unit_id' => $unit->id], 'drop:' . $unit->id . ':' . $u->id . ':' . $new, 72);
                }
            }
        } catch (\Throwable $e) {
            Log::warning('client notify unit ' . ($unit->id ?? '') . ': ' . $e->getMessage());
        }
    }

    /* ---------------------------------------------------------------- 5: who is your advisor */

    public static function leadSaved($lead)
    {
        try {
            if (!in_array((string) $lead->channel, ['Website', 'App', 'بكام'], true)) return;
            if (!$lead->wasRecentlyCreated && !$lead->wasChanged('user_id')) return;
            if (!$lead->user_id || (int) $lead->user_id === (int) LeadRouter::ADMIN_FALLBACK) return;
            $agent = User::find($lead->user_id);
            if (!$agent || !StaffMiddleware::isStaff($agent)) return;
            $client = self::userByPhone($lead->client_number);
            if (!$client || StaffMiddleware::isStaff($client)) return;
            $name = trim($agent->first_name . ' ' . $agent->last_name) ?: 'فريق بكام';
            $phone = preg_replace('/[^\d+]/', '', (string) $agent->phone);
            self::send($client, 'مستشارك في بكام: ' . $name, $name . ' هيكلمك قريب' . ($phone ? ' من الرقم ' . $phone : '') . '. لو عايز تسبقه كلّمه على طول.',
                [], 'adv:' . $client->id . ':' . $agent->id, 72);
        } catch (\Throwable $e) {
            Log::warning('client notify lead ' . ($lead->id ?? '') . ': ' . $e->getMessage());
        }
    }

    /* ---------------------------------------------------------------- 2: the client opened the link */

    public static function collectionOpened($c)
    {
        try {
            if (!$c || !$c->user_id) return;
            // the salesman checking his own link right after making it is not a client visit
            if ($c->created_at && now()->diffInSeconds(\Carbon\Carbon::parse($c->created_at)) < 120) return;
            $viewer = null;
            try { $viewer = request()->bearerToken() ? Auth::guard('api')->user() : null; } catch (\Throwable $e) {}
            if ($viewer && (int) $viewer->id === (int) $c->user_id) return;
            $agent = User::find($c->user_id);
            if (!$agent) return;
            $n = count(array_filter(explode(',', (string) $c->unit_ids)));
            self::send($agent, 'العميل فتح اللينك دلوقتي 👀', ($c->title ? '«' . $c->title . '» — ' : '') . 'اللي فيه ' . $n . ' وحدة. ده أحسن وقت تكلّمه.',
                [], 'coll:' . $c->id, 6);
        } catch (\Throwable $e) {
            Log::warning('client notify collection: ' . $e->getMessage());
        }
    }

    /* ---------------------------------------------------------------- 1: the offer was answered */

    public static function offerAnswered($offer, $unit)
    {
        $buyer = $offer->user_id ? User::find($offer->user_id) : null;
        if (!$buyer) $buyer = self::userByPhone($offer->phone);
        if (!$buyer) return false;
        $name = self::unitName($unit);
        if ($offer->status === 'accepted') {
            $t = 'عرضك اتقبل ✅'; $d = 'المالك وافق على ' . self::money($offer->price) . ' في ' . $name . '. فريق بكام هيكلمك عشان الخطوة الجاية.';
        } elseif ($offer->status === 'countered') {
            $t = 'المالك ردّ على عرضك بسعر تاني'; $d = $name . ': عرضك ' . self::money($offer->price) . '، والمالك طالب ' . self::money($offer->counter_price) . '.';
        } else {
            $t = 'عرضك ما اتقبلش'; $d = 'المالك مش موافق على ' . self::money($offer->price) . ' في ' . $name . '. تقدر تبعت عرض تاني أو تشوف وحدات قريبة.';
        }
        return self::send($buyer, $t, $d, ['unit_id' => $unit->id], 'offer:' . $offer->id . ':' . $offer->status . ':' . ($offer->counter_price ?? ''), 720);
    }
}
