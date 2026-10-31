<?php

namespace App\Jobs;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendNotificationToUsers implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $contactus;

    public function __construct($contactus)
    {
        $this->contactus = $contactus;
    }

    public function handle()
    {
        // Get users who need to receive the notification
        $users = User::whereIn('role_id', [2, 3])  // Sales (2), Admin (3)
                     ->orWhere('account_type', 'Authorize') // Users with 'Authorize' account_type
                     ->get();

        // Prepare the notification
        // the full request: who asked (name + number) and everything they wrote; opens «Requests» in the CRM
        // (unit_id used to carry the request id, which opened an unrelated unit)
        $row = \Illuminate\Support\Facades\DB::table('contact_us')->where('id', $this->contactus->id)->first() ?: $this->contactus;
        $notification = [
            'title' => 'Special request #' . $this->contactus->id . ' (App)',
            'description' => \App\Support\RequestText::body($row) . ' (Requests)',
            'notification_type' => 'Broadcast',
        ];

        // Send notification to each user asynchronously
        foreach ($users as $user) {
            $user->pushNotification($notification);
        }
    }
}
