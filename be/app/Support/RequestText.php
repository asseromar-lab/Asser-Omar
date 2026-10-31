<?php

namespace App\Support;

/**
 * One full, readable summary of a special request (contact_us row), used by every notification
 * and lead note, so the team always sees who asked (name + number) and everything they wrote.
 */
class RequestText
{
    const TYPE_AR = [
        'Apartment' => 'شقة', 'Villa' => 'فيلا', 'Stand Alone' => 'فيلا مستقلة', 'Twin house' => 'توين هاوس',
        'Town house' => 'تاون هاوس', 'Town house middle' => 'تاون هاوس ميدل', 'Town house corner' => 'تاون هاوس كورنر',
        'Duplex' => 'دوبلكس', 'Penthouse' => 'بنتهاوس', 'Chalet' => 'شاليه', 'Studio' => 'ستوديو', 'Office' => 'مكتب',
        'Clinic' => 'عيادة', 'Retail' => 'محل', 'Shop' => 'محل', 'Land' => 'أرض', 'Roof' => 'روف',
    ];

    public static function money($v)
    {
        $v = (float) $v;
        if ($v <= 0) return null;
        if ($v >= 1000000) return rtrim(rtrim(number_format($v / 1000000, 2, '.', ''), '0'), '.') . ' مليون';
        return number_format($v) . ' ج.م';
    }

    /** the parts of what was asked for, in reading order */
    public static function parts($r)
    {
        $r = (object) $r;
        $cat = $r->category ?? null;
        $catAr = $cat === 'Rent' ? 'إيجار' : ($cat === 'Primary' ? 'من المطور' : ($cat ? 'ريسيل' : null));
        $type = $r->type ?? null;
        $where = array_filter([$r->project_name ?? null, $r->developer_name ?? null, ($r->city ?? null) ?: ($r->location ?? null)]);
        return array_values(array_filter([
            $catAr,
            $type ? (self::TYPE_AR[$type] ?? $type) : null,
            $where ? implode(' — ', array_unique($where)) : null,
            !empty($r->bedrooms) ? $r->bedrooms . ' غرف' : null,
            !empty($r->bathrooms) ? $r->bathrooms . ' حمام' : null,
            !empty($r->size) && (float) $r->size > 0 ? $r->size . ' م²' : null,
            self::money($r->price ?? 0) ? 'الميزانية لحد ' . self::money($r->price) : null,
            self::money($r->down_payment ?? 0) ? 'مقدم لحد ' . self::money($r->down_payment) : null,
            !empty($r->finishing) ? 'تشطيب: ' . $r->finishing : null,
            !empty($r->delivery_date) ? 'استلام: ' . $r->delivery_date : null,
        ]));
    }

    public static function note($r)
    {
        $r = (object) $r;
        $d = trim((string) ($r->description ?? ''));
        return $d !== '' ? $d : null;
    }

    /** «الاسم — الرقم» */
    public static function who($r)
    {
        $r = (object) $r;
        $name = trim((string) ($r->user_name ?? '')) ?: trim((string) ($r->name ?? ''));
        return trim(($name ?: 'عميل') . ' — ' . (Phone::normalize($r->user_phone ?? '') ?: ($r->user_phone ?? '')), ' —');
    }

    /** full notification body: who asked, what they asked for, and their own words */
    public static function body($r)
    {
        $parts = self::parts($r);
        $note = self::note($r);
        return self::who($r) . "\n" . ($parts ? implode(' · ', $parts) : 'من غير مواصفات') . ($note ? "\n«" . $note . '»' : '');
    }
}
