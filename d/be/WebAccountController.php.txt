<?php

namespace App\Http\Controllers;

use App\Models\Action;
use App\Models\ContactUs;
use App\Models\Lead;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

/**
 * «بكام» website: profile, password, delete account, notifications, special request (طلب خاص).
 */
class WebAccountController extends Controller
{
    private const ADMIN_USER_ID = 2;

    private function normPhone($raw)
    {
        $d = preg_replace('/\D+/', '', (string) $raw);
        if (strpos($d, '0020') === 0) $d = substr($d, 4);
        if (strpos($d, '20') === 0 && strlen($d) === 12) $d = substr($d, 2);
        if (strlen($d) === 11 && $d[0] === '0') $d = substr($d, 1);
        return strlen($d) === 10 ? '+20' . $d : null;
    }

    private function me(User $u)
    {
        return ['id' => $u->id, 'name' => trim($u->first_name . ' ' . $u->last_name), 'first_name' => $u->first_name,
            'last_name' => $u->last_name, 'phone' => $u->phone, 'email' => $u->email, 'staff' => \App\Http\Middleware\StaffMiddleware::isStaff($u)];
    }

    /** PUT /api/web/profile {first_name,last_name,email,phone} — only these fields */
    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        $data = $request->validate([
            'first_name' => 'required|string|min:2|max:60',
            'last_name' => 'required|string|min:1|max:60',
            'email' => 'required|email|max:120',
            'phone' => 'required|string|max:20',
        ]);
        $phone = $this->normPhone($data['phone']);
        if (!$phone) return response()->json(['message' => 'اكتب رقم موبايل مصري صحيح'], 422);
        if (User::where('email', $data['email'])->where('id', '!=', $user->id)->exists()) {
            return response()->json(['message' => 'الإيميل ده مستخدم في حساب تاني'], 409);
        }
        if (User::where('phone', $phone)->where('id', '!=', $user->id)->exists()) {
            return response()->json(['message' => 'الرقم ده مستخدم في حساب تاني'], 409);
        }
        $user->first_name = $data['first_name'];
        $user->last_name = $data['last_name'];
        $user->email = $data['email'];
        $user->phone = $phone;
        $user->save();
        return response()->json(['user' => $this->me($user)]);
    }

    /** POST /api/web/profile/password {old_password,password} */
    public function changePassword(Request $request)
    {
        $user = Auth::user();
        $data = $request->validate(['old_password' => 'required|string', 'password' => 'required|string|min:6|max:120']);
        if (!Hash::check($data['old_password'], $user->password)) {
            return response()->json(['message' => 'الباسوورد الحالي غلط'], 422);
        }
        if (Hash::check($data['password'], $user->password)) {
            return response()->json(['message' => 'الباسوورد الجديد لازم يكون مختلف عن القديم'], 422);
        }
        $user->password = Hash::make($data['password']);
        $user->save();
        return response()->json(['ok' => true]);
    }

    /** DELETE /api/web/profile {password} — disables the account (data kept for the CRM history) */
    public function deleteAccount(Request $request)
    {
        $user = Auth::user();
        $request->validate(['password' => 'required|string']);
        if (!Hash::check($request->input('password'), $user->password)) {
            return response()->json(['message' => 'الباسوورد غلط'], 422);
        }
        if (\App\Http\Middleware\StaffMiddleware::isStaff($user)) {
            return response()->json(['message' => 'حسابات فريق العمل بتتقفل من الـ CRM'], 403);
        }
        DB::transaction(function () use ($user) {
            DB::table('wishlists')->where('user_id', $user->id)->delete();
            DB::table('units')->where('user_id', $user->id)->whereNull('deleted_at')->update(['deleted_at' => now()]);
            $user->email = 'deleted+' . $user->id . '+' . Str::random(6) . '@deleted.bekam';
            $user->phone = 'deleted-' . $user->id;
            $user->password = Hash::make(Str::random(40));
            $user->device_token = null;
            $user->save();
            try { DB::table('oauth_access_tokens')->where('user_id', $user->id)->update(['revoked' => 1]); } catch (\Throwable $e) {}
        });
        return response()->json(['ok' => true]);
    }

    /** GET /api/web/notifications?page= */
    public function notifications(Request $request)
    {
        $uid = Auth::id();
        if ($request->query('page', 1) == 1) WebAlertsController::runSafely($uid);
        $page = DB::table('notifications')->where('user_id', $uid)->orderByDesc('id')
            ->select(array_merge(['id', 'title', 'description', 'seen', 'unit_id', 'project_id', 'developer_id', 'created_at'],
                \App\Support\CrmSchema::has('notifications', 'lead_id') ? ['lead_id'] : []))
            ->paginate(20);
        return response()->json([
            'data' => $page->items(),
            'unread' => DB::table('notifications')->where('user_id', $uid)->where('seen', 0)->count(),
            'page' => $page->currentPage(), 'last_page' => $page->lastPage(),
        ]);
    }

    /** POST /api/web/notifications/seen */
    public function notificationsSeen()
    {
        DB::table('notifications')->where('user_id', Auth::id())->where('seen', 0)->update(['seen' => 1, 'updated_at' => now()]);
        return response()->json(['ok' => true]);
    }

    /** POST /api/web/requests — "طلب خاص": describe the unit you want; goes to Contact-us + CRM lead */
    public function specialRequest(Request $request)
    {
        if ($request->filled('website')) return response()->json(['ok' => true], 201);
        $user = Auth::guard('api')->user();
        $data = $request->validate([
            'name' => ($user ? 'nullable' : 'required') . '|string|min:2|max:120',
            'phone' => ($user ? 'nullable' : 'required') . '|string|max:20',
            'category' => 'required|in:Resale,Rent,Primary',
            'type' => 'nullable|string|max:60',
            'city' => 'nullable|string|max:80',
            'developer_name' => 'nullable|string|max:120',
            'project_name' => 'nullable|string|max:120',
            'bedrooms' => 'nullable|integer|min:0|max:20',
            'size' => 'nullable|integer|min:0|max:100000',
            'price' => 'nullable|integer|min:0|max:2000000000',
            'down_payment' => 'nullable|integer|min:0|max:2000000000',
            'finishing' => 'nullable|string|max:60',
            'delivery_date' => 'nullable|string|max:40',
            'description' => 'nullable|string|max:2000',
        ]);
        $name = $user ? trim($user->first_name . ' ' . $user->last_name) : $data['name'];
        $phone = $user ? $user->phone : ($this->normPhone($data['phone']) ?: $data['phone']);
        if (!$user && !$this->normPhone($data['phone'])) {
            return response()->json(['message' => 'اكتب رقم موبايل مصري صحيح'], 422);
        }

        $c = ContactUs::create([
            'name' => $name, 'user_name' => $name, 'user_phone' => $phone, 'user_email' => $user ? $user->email : null,
            'user_id' => $user ? $user->id : self::ADMIN_USER_ID,
            'description' => $data['description'] ?? null, 'type' => $data['type'] ?? null, 'category' => $data['category'],
            'location' => $data['city'] ?? null, 'city' => $data['city'] ?? null, 'size' => $data['size'] ?? null,
            'bedrooms' => $data['bedrooms'] ?? null, 'price' => $data['price'] ?? null,
            'down_payment' => $data['down_payment'] ?? null, 'finishing' => $data['finishing'] ?? null,
            'delivery_date' => $data['delivery_date'] ?? null,
        ]);
        try {
            DB::table('contact_us')->where('id', $c->id)->update(['developer_name' => $data['developer_name'] ?? null, 'project_name' => $data['project_name'] ?? null]);
        } catch (\Throwable $e) {}

        // Also a CRM lead so sales follow up
        $local = \App\Support\Phone::normalize($phone) ?: (string) $phone;
        $existing = Lead::findDuplicate([$local]);
        if (!DB::table('channels')->where('name', 'Website')->exists()) {
            DB::table('channels')->insert(['name' => 'Website', 'created_at' => now(), 'updated_at' => now()]);
        }
        $lead = Lead::create([
            'client_name' => $name, 'client_number' => $local, 'user_id' => self::ADMIN_USER_ID,
            'action_type' => 'Special request', 'channel' => 'Website', 'area' => $data['city'] ?? 'Other',
            'stage' => 'Fresh lead', 'status' => 'In progress', 'isduplicate' => $existing ? true : false,
        ]);
        $parts = array_filter([
            $data['category'] === 'Rent' ? 'إيجار' : ($data['category'] === 'Primary' ? 'من المطور' : 'ريسيل'),
            $data['type'] ?? null, $data['city'] ?? null, $data['project_name'] ?? null,
            !empty($data['bedrooms']) ? $data['bedrooms'] . ' غرف' : null,
            !empty($data['size']) ? $data['size'] . ' م²' : null,
            !empty($data['price']) ? 'لحد ' . number_format($data['price']) : null,
            $data['description'] ?? null,
        ]);
        Action::create(['user_id' => self::ADMIN_USER_ID, 'action_type' => 'create lead', 'lead_id' => $lead->id,
            'details' => 'طلب خاص من موقع بكام (#' . $c->id . '): ' . implode(' | ', $parts)]);
        \App\Support\CrmSchema::ensure();
        if (\App\Support\CrmSchema::has('leads', 'web_form')) Lead::where('id', $lead->id)->toBase()->update(['web_form' => 'request']);
        // distribution in turn (when on) + the salesman, his team leader and the admins / managers are told
        if (!$existing) \App\Support\LeadRouter::route($lead, 'Website request');
        try {
            $lead->refresh();
            \App\Support\CrmTicker::notifyLead($lead, ['title' => 'Special request #' . $c->id . ' (Website)', 'description' => $name . ' — ' . implode(' · ', array_slice($parts, 0, 4)) . ' (Requests)']);
        } catch (\Throwable $e) {
            Log::warning('web.request notify: ' . $e->getMessage());
        }
        // the request also becomes an alert: when a matching unit goes live, the person gets a notification (app + website)
        $filters = array_filter([
            'category' => $data['category'] === 'Primary' ? 'Resale' : $data['category'], 'city' => $data['city'] ?? null, 'type' => $data['type'] ?? null,
            'max_price' => $data['price'] ?? null, 'max_down' => $data['down_payment'] ?? null, 'beds' => $data['bedrooms'] ?? null,
            'delivery' => $data['delivery_date'] ?? null, 'finishing' => $data['finishing'] ?? null,
        ], function ($v) { return $v !== null && $v !== ''; });
        $alertFor = $user ?: \App\Models\User::where('phone', $phone)->orWhere('phone', $local)->first();
        if ($alertFor) {
            try {
                \App\Support\WebSchema::ensure();
                $json = json_encode(array_map('strval', $filters), JSON_UNESCAPED_UNICODE);
                if (!DB::table('saved_searches')->where('user_id', $alertFor->id)->where('filters', $json)->exists()) {
                    DB::table('saved_searches')->insert(['user_id' => $alertFor->id, 'label' => 'طلب خاص #' . $c->id, 'filters' => $json, 'notified_ids' => '[]',
                        'last_checked_at' => now(), 'created_at' => now(), 'updated_at' => now()]);
                }
            } catch (\Throwable $e) { Log::warning('web.request alert: ' . $e->getMessage()); }
        }
        // owners of units like this one hear about the interested person (name + number)
        \App\Support\Interest::notify($filters, $name, $local, $user ? $user->id : null, 'request');
        return response()->json(['ok' => true, 'id' => $c->id, 'alert' => (bool) $alertFor], 201);
    }
}
