<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Lead;
use App\Models\Action;
use App\Models\Channel;
use App\Models\Stage;
use App\Models\Statu;
use App\Models\Project;
use App\Models\Area;
use App\Models\User;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

class LeadsController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // admin: all · team leader: his team · everyone else: own leads
        $leads = \App\Support\LeadScope::apply(Lead::query(), $user)->with('project.developer')->with('user')->orderBy('updated_at', 'desc')->orderBy('id', 'desc')->paginate(6);
        $usersToAssign = (\App\Support\LeadScope::isAdmin($user) || \App\Support\LeadScope::isLeader($user)) ? \App\Support\LeadScope::assignable($user) : [];

        $lists = [
            'channels' => Channel::all(),
            'stages' => Stage::all(),
            'status' => Statu::all(),
            'projects' => Project::all(),
            'cities' => Area::all(),
            'usersToAssign' => $usersToAssign,
        ];

        return response()->json([
            'leads' => \App\Support\PhoneMask::apply($leads, $user),
            'lists' => $lists,
        ]);
    }

    public function show($id)
    {
        $lead = Lead::findOrFail($id);
        return response()->json($lead);
    }
    public function store(Request $request)
    {
        $user = Auth::user();
        // Same number in any format (01..., +20..., +2001...) counts as a duplicate — applied automatically
        foreach (['client_number', 'client_sec_number'] as $f) {
            if ($request->filled($f)) $request[$f] = \App\Support\Phone::normalize($request->input($f));
        }
        $existingLead = Lead::findDuplicate([$request->client_number, $request->client_sec_number]);
        self::normalizeMulti($request);

        // Client already in the CRM (for everyone, admins included): nothing is added and the owner is not shown.
        // The screen offers "Request Assign"; an admin decides (Requests → Duplicates).
        if ($existingLead) {
            return response()->json(['duplicate' => true, 'message' => 'This client is already in the CRM'], 200);
        }

        // Send notification
        $notification = [];
        if ($existingLead) {
            // Mark the lead as a duplicate
            $request['isduplicate'] = true;
    
            // Set user_id for the duplicate lead
            if ($user->role->id === 2 && $user->team_id) {
                $request['user_id'] = $user->team->leader_id;
            } else {
                $request['user_id'] = 2; // Admin ID
            }
    
            // Action description for duplicate lead
            $actionDescription = $user->first_name . ' ' . $user->last_name . ' Added Duplicate Lead: ' . $existingLead->client_name . ' | Client Number: ' . $existingLead->client_number;
        } else {
            // If no duplicate, set the user_id to the current user's ID (if not already provided)
            if (empty($request['user_id'])) {
                $request['user_id'] = $user->id;
            }
            
            // Action description for a new lead
            $actionDescription = $user->first_name . ' ' . $user->last_name . ' Added New Lead: ' . $request->client_name;
        }
    
        // Create the new lead
        $lead = Lead::create($request->except(['deal']));
        Lead::recordStage($lead->id, $lead->stage, $user->id);
        \App\Support\Finance::onStageChange($lead, null, $lead->stage, $request->input('deal'), $user->id);
    
        // Handle notification
        if ($request['isduplicate']) {
            $notification = [
                'title' => 'Duplicate lead',
                'description' => $user->first_name . ' ' . $user->last_name . ' Added Duplicate lead #' . $lead->id . ' ' . $lead->client_name,
                'lead_id' => $lead->id,
                'notification_type' => 'Broadcast'
            ];
        } elseif (!empty($request['user_id'] && $request['user_id'] != $user->id)) {
            $assignedUser = User::findOrFail($request['user_id']);
            $notification = [
                'title' => 'Assigned lead',
                'description' => 'Assigned lead #' . $lead->id . ' ' . $lead->client_name . ' To ' . $assignedUser->first_name . ' ' . $assignedUser->last_name,
                'lead_id' => $lead->id,
                'notification_type' => 'Broadcast'
            ];
            $actionDescription = $user->first_name . ' ' . $user->last_name . ' Added New Lead: ' . $request->client_name . ' And Assigned Lead To ' . $assignedUser->first_name . ' ' . $assignedUser->last_name;
            
            $assignedUser->pushNotification($notification);
        }else{
            $notification = [
                'title' => 'New lead #'.$lead->id,
                'description' => 'New lead #' . $lead->id . ' ' . $lead->client_name . ' To ' . $lead->user->first_name . ' ' . $lead->user->last_name,
                'lead_id' => $lead->id,
                'notification_type' => 'Broadcast'
            ];
        }
    
        // Send notifications based on user role
        if ($notification) {
            if ($lead->user->isSales()) {
                if ($lead->user->team) {
                    $teamleader = User::find($lead->user->team->leader_id);
                    $teamleader->pushNotification($notification);
                }
            }
            $admins = User::where('account_type', 'Admin')->get();

            foreach ($admins as $admin) {
                // Send push notification to each admin
                $admin->pushNotification($notification);
            }
        }
        
        // Log the action, whether it's a new lead or a duplicate
        Action::create([
            'user_id' => Auth::id(),
            'action_type' => 'create lead',
            'details' => $actionDescription,
            'lead_id' => $lead->id
        ]);
        
        
    
        $out = $lead->toArray();
        if ($existingLead) {
            // shown on the screen right away: "this client already exists"
            $owner = User::find($existingLead->user_id);
            $out['duplicate_of'] = [
                'id' => $existingLead->id, 'client_name' => $existingLead->client_name, 'stage' => $existingLead->stage,
                'salesman' => $owner ? trim($owner->first_name . ' ' . $owner->last_name) : null,
                'created_at' => (string) $existingLead->created_at,
            ];
        }
        return response()->json(\App\Support\PhoneMask::apply($out, $user), 201);
    }

    


    public function update(Request $request, $id)
    {
        $user = Auth::user();
        $lead = Lead::findOrFail($id);
        if ($this->canManageLead($user, $lead)){
            // Get the original lead data before the update
            $originalLead = $lead->replicate(); // Create a copy of the model with original values
        
            self::normalizeMulti($request);
            $data = $request->except(['id', 'created_at', 'updated_at', 'isduplicate', 'user', 'project', 'is_lead_show', 'is_lead_edit', 'is_filter_opens', 'deal', 'phone_masked']);
            foreach (['client_number', 'client_sec_number'] as $f) {
                if (array_key_exists($f, $data) && \App\Support\PhoneMask::isMasked($data[$f])) { unset($data[$f]); continue; }
                if (array_key_exists($f, $data) && $data[$f] !== null && $data[$f] !== '') $data[$f] = \App\Support\Phone::normalize($data[$f]);
            }
            // Number changed to one that already exists on another lead -> it becomes a duplicate
            $numbersChanged = (isset($data['client_number']) && $data['client_number'] != $lead->client_number)
                || (isset($data['client_sec_number']) && $data['client_sec_number'] != $lead->client_sec_number);
            if ($numbersChanged && !$lead->isduplicate
                && Lead::findDuplicate([$data['client_number'] ?? $lead->client_number, $data['client_sec_number'] ?? $lead->client_sec_number], $lead->id)) {
                $data['isduplicate'] = true;
            }
            // A team leader can only move a lead inside his team
            if ($user->isTeamLeader() && !empty($data['user_id']) && $data['user_id'] != $lead->user_id
                && !$this->inLeaderTeam($user, User::find($data['user_id']))) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }

            // A team leader cannot reassign a duplicate lead
            if ($user->isTeamLeader() && $lead->isduplicate && !empty($data['user_id']) && $data['user_id'] != $lead->user_id) {
                return response()->json(['message' => 'Team leaders cannot reassign duplicate leads'], 403);
            }

            // Update the lead with the request data
            $lead->update($data);
            if ($originalLead->stage !== $lead->stage) {
                Lead::recordStage($lead->id, $lead->stage, $user->id);
                \App\Support\Finance::onStageChange($lead, $originalLead->stage, $lead->stage, $request->input('deal'), $user->id);
            }
            
            // Find the lead again with its related data (if necessary)
            $lead = Lead::with('project')->with('user')->findOrFail($id);
        
            // Initialize an array to hold changes
            $changes = [];
        
            // Compare original values with updated values
            foreach ($lead->getAttributes() as $attribute => $newValue) {
                $originalValue = $originalLead->$attribute;
                
                // Skip `created_at` and `updated_at` from the changes
                if (in_array($attribute, ['created_at', 'updated_at' , 'id','user_id'])) {
                    continue;
                }
                
                
                
                // If the value has changed, record the change
                if ($originalValue != $newValue) {
                    $changes[] = [
                        'field' => $attribute,
                        'original' => $originalValue,
                        'new' => $newValue
                    ];
                }
            }
        
            // Prepare a string of changes for logging
            $changeDetails = '';
            foreach ($changes as $change) {
                $changeDetails .= $change['field'] . ': ' . $change['original'] . ' -> ' . $change['new'] . '; ';
            }
            
            // If there are no changes, log that there were no changes
            if (empty($changes)) {
                \Log::debug('No changes detected.');
            }
            
            // Log the action with the changes (a pure reassignment is logged below as "assign lead")
            if (!empty($changes) || $originalLead->user_id == $lead->user_id) Action::create([
                'user_id' => Auth::id(),
                'action_type' => 'update lead',
                'details' => $user->first_name . ' ' .$user->last_name . ' Updated Lead: ' . $lead->client_name . ' | Changes: ' . $changeDetails,
                'lead_id' => $lead->id
            ]);
            
            $message = $user->first_name . ' ' .$user->last_name . ' Update Lead: ' . $lead->client_name;
            $notification = [
                'title' => 'CRM',
                'description' => $message , 
                'lead_id' => $lead->id,
                'notification_type' => 'Broadcast'
            
            ];
            $admins = User::where('account_type', 'Admin')->get();

            // 1. Check if the user_id was changed (i.e., the lead was reassigned to a new user)
            if ($originalLead->user_id != $lead->user_id) {
                // history: who moved the lead, from whom, to whom
                $fromU = User::find($originalLead->user_id);
                Action::create([
                    'user_id' => $user->id, 'lead_id' => $lead->id, 'action_type' => 'assign lead',
                    'details' => trim($user->first_name . ' ' . $user->last_name) . ' moved Lead: ' . $lead->client_name
                        . ' from ' . ($fromU ? trim($fromU->first_name . ' ' . $fromU->last_name) : '—')
                        . ' to ' . ($lead->user ? trim($lead->user->first_name . ' ' . $lead->user->last_name) : '#' . $lead->user_id)
                        . ($originalLead->isduplicate ? ' (duplicate lead)' : ''),
                ]);
                // Notify the admin that the lead has been reassigned
                $notification['title'] = 'Assigned Lead ';
                $notification['description'] = $message . ' and reassigned the lead #' . $lead->id .' to ' . $lead->user->first_name . ' ' . $lead->user->last_name;
                
                $lead->user->pushNotification($notification);
                
                foreach ($admins as $admin) {
                    // Send push notification to each admin
                    $admin->pushNotification($notification);
                }
                
                
                // Notify the team leader if exists
                if ($user->team) {
                    $teamleader = User::find($user->team->leader_id);
                    if ($teamleader) {
                        $teamleader->pushNotification($notification);
                    }
                }
            }
            
            // 2. If the stage has changed to one of the specified stages, log that as well
            if ($originalLead->stage !== $lead->stage && in_array($lead->stage, ['Done Meeting/Showing', 'Reservation', 'Done deal' , 'Follow Up'])) {
                // Stage change notification
                $notification['title'] = $lead->stage;
                $notification['description'] = $lead->stage . ' #' . $lead->id .' ' . $lead->client_name . ' with ' . $lead->user->first_name . ' ' . $lead->user->last_name;
                
                $lead->user->pushNotification($notification);
                
                
                foreach ($admins as $admin) {
                    // Send push notification to each admin
                    $admin->pushNotification($notification);
                }
                
                
                // Notify the team leader if exists
                if ($user->team && $user->team->leader_id != $user->id ) {
                    $teamleader = User::find($user->team->leader_id);
                    if ($teamleader) {
                        $teamleader->pushNotification($notification);
                    }
                }
            }
            
        
            return response()->json(\App\Support\PhoneMask::apply($lead, $user));
        }else {
            // في حالة عدم وجود صلاحية
            return response()->json(['message' => 'Unauthorized'], 403);
        }
    }


    /** DELETE /leads/{id} — admins only; a full copy is kept in leads_deleted */
    public function destroy($id)
    {
        $lead = Lead::findOrFail($id);
        $user = Auth::user();
        if (!\App\Support\LeadScope::isAdmin($user)) {
            return response()->json(['message' => 'Only admins can delete leads'], 403);
        }
        try {
            self::archiveAndDelete($lead, $user);
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::error('lead delete #' . $id . ': ' . $e->getMessage());
            return response()->json(['message' => 'Could not delete: ' . \Illuminate\Support\Str::limit($e->getMessage(), 180)], 500);
        }
        return response()->json(['message' => 'Lead deleted']);
    }

    /** POST /crm/leads/delete {ids[]} — admins: delete many at once */
    public function destroyMany(Request $request)
    {
        $user = Auth::user();
        if (!\App\Support\LeadScope::isAdmin($user)) return response()->json(['message' => 'Only admins can delete leads'], 403);
        $ids = array_slice(array_values(array_unique(array_filter(array_map('intval', (array) $request->input('ids', []))))), 0, 500);
        if (!$ids) return response()->json(['message' => 'No leads picked'], 422);
        $n = 0;
        $err = null;
        foreach (Lead::whereIn('id', $ids)->get() as $lead) {
            try { self::archiveAndDelete($lead, $user); $n++; }
            catch (\Throwable $e) { $err = $e->getMessage(); \Illuminate\Support\Facades\Log::error('lead delete #' . $lead->id . ': ' . $err); }
        }
        if (!$n && $err) return response()->json(['message' => 'Could not delete: ' . \Illuminate\Support\Str::limit($err, 180)], 500);
        return response()->json(['deleted' => $n, 'failed' => count($ids) - $n]);
    }

    private static function archiveAndDelete(Lead $lead, $user)
    {
        try { \App\Support\CrmSchema::ensure(); } catch (\Throwable $e) {}
        try {
            DB::table('leads_deleted')->insert(['lead_id' => $lead->id, 'data' => json_encode($lead->getAttributes(), JSON_UNESCAPED_UNICODE), 'deleted_by' => $user->id, 'deleted_at' => now()]);
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::warning('lead archive: ' . $e->getMessage());
        }
        try {
            Action::create(['user_id' => $user->id, 'action_type' => 'delete lead', 'details' => $user->first_name . ' ' . $user->last_name . ' Deleted Lead: ' . $lead->client_name, 'lead_id' => null]);
        } catch (\Throwable $e) { \Illuminate\Support\Facades\Log::warning('lead delete action: ' . $e->getMessage()); }
        try {
            DB::table('lead_dup_requests')->where('lead_id', $lead->id)->where('status', 'pending')->update(['status' => 'rejected', 'decided_by' => $user->id, 'decided_at' => now(), 'updated_at' => now()]);
        } catch (\Throwable $e) {}
        // Release every row that points at this lead (any table with an FK to leads),
        // so a RESTRICT constraint on the server can never block the delete.
        try {
            $refs = DB::select("SELECT k.TABLE_NAME t, k.COLUMN_NAME c, col.IS_NULLABLE n FROM information_schema.KEY_COLUMN_USAGE k JOIN information_schema.COLUMNS col ON col.TABLE_SCHEMA=k.TABLE_SCHEMA AND col.TABLE_NAME=k.TABLE_NAME AND col.COLUMN_NAME=k.COLUMN_NAME WHERE k.TABLE_SCHEMA=DATABASE() AND k.REFERENCED_TABLE_NAME='leads' AND k.TABLE_NAME<>'leads'");
            foreach ($refs as $r) {
                try {
                    if ($r->n === 'YES') DB::table($r->t)->where($r->c, $lead->id)->update([$r->c => null]);
                    else DB::table($r->t)->where($r->c, $lead->id)->delete();
                } catch (\Throwable $e) { \Illuminate\Support\Facades\Log::warning("lead delete ref {$r->t}.{$r->c}: " . $e->getMessage()); }
            }
        } catch (\Throwable $e) {}
        DB::table('leads')->where('id', $lead->id)->delete();
    }

    public function exportSheet(Request $request)
    {
        $user = User::find(Auth::id());
    
        if (\App\Support\LeadScope::isAdmin($user)) {
            // every lead in the system, with its last comment — one query for the comments instead of one per lead
            @set_time_limit(120);
            $lastRows = DB::table('comments as c')
                ->join(DB::raw('(SELECT lead_id, MAX(id) AS mid, COUNT(*) AS n FROM comments GROUP BY lead_id) lc'), 'lc.mid', '=', 'c.id')
                ->leftJoin('users as cu', 'cu.id', '=', 'c.user_id')
                ->get(['c.lead_id', 'c.comment', 'c.created_at', 'lc.n', 'cu.first_name', 'cu.last_name'])->keyBy('lead_id');
            $last = $lastRows->map(function ($r) { return $r->comment; });
            $projNames = DB::table('projects')->pluck('name', 'id');
            $hasCol = function ($c) { return \App\Support\CrmSchema::has('leads', $c); };
            $leads = Lead::with(['project:id,name', 'user:id,first_name,last_name,phone'])->orderBy('created_at', 'desc')->get();
            $filteredLeads = $leads->map(function ($lead) use ($last, $lastRows, $projNames, $hasCol) {
                return [
                    'id' => $lead->id,
                    'client_name' => $lead->client_name,
                    'client_email' => $lead->client_email,
                    'client_number' => $lead->client_number,
                    'client_sec_number' => $lead->client_sec_number,
                    'username' => $lead->user ? $lead->user->first_name . ' ' . $lead->user->last_name : null,
                    'area' => $lead->area,
                    'stage' => $lead->stage,
                    'project_name' => $lead->project ? $lead->project->name : null,
                    'channel' => $lead->channel,
                    'status' => $lead->status,
                    'lead_type' => $lead->lead_type ?? null,
                    'next_followUp_date' => $lead->next_followUp_date,
                    'unit_link' => $lead->unit_link,
                    'isduplicate' => $lead->isduplicate ? 'duplicate' : '',
                    'created_at' => (string) $lead->created_at,
                    'updated_at' => (string) $lead->updated_at,
                    'last_comment_message' => $last[$lead->id] ?? null,
                    // every other detail of the lead
                    'salesman_phone' => $lead->user ? ($lead->user->phone ?? null) : null,
                    'action_type' => $lead->action_type,
                    'client_type' => $hasCol('client_type') ? $lead->client_type : null,
                    'source_form' => $hasCol('web_form') ? $lead->web_form : null,
                    'all_projects' => (function () use ($lead, $projNames) {
                        $ids = $lead->project_ids ? json_decode(is_string($lead->project_ids) ? $lead->project_ids : json_encode($lead->project_ids), true) : [];
                        $ids = is_array($ids) ? $ids : [];
                        if ($lead->project_id) array_unshift($ids, $lead->project_id);
                        return implode(', ', array_values(array_unique(array_filter(array_map(function ($id) use ($projNames) { return $projNames[$id] ?? null; }, $ids)))));
                    })(),
                    'unit_ids' => $hasCol('unit_ids') && $lead->unit_ids ? implode(', ', (array) (json_decode(is_string($lead->unit_ids) ? $lead->unit_ids : json_encode($lead->unit_ids), true) ?: [])) : null,
                    'comments_count' => isset($lastRows[$lead->id]) ? (int) $lastRows[$lead->id]->n : 0,
                    'last_comment_at' => isset($lastRows[$lead->id]) ? (string) $lastRows[$lead->id]->created_at : null,
                    'last_comment_by' => isset($lastRows[$lead->id]) ? trim($lastRows[$lead->id]->first_name . ' ' . $lastRows[$lead->id]->last_name) : null,
                    'first_notified_at' => $lead->first_notified_at ? (string) $lead->first_notified_at : null,
                ];
            });
            try { Action::create(['user_id' => $user->id, 'action_type' => 'export leads', 'details' => trim($user->first_name . ' ' . $user->last_name) . ' exported ' . $filteredLeads->count() . ' leads']); } catch (\Throwable $e) {}
            return response()->json($filteredLeads->values(), 200);
        }

        return response()->json([], 403);
    }
    
    public function getUserLeads(Request $request, $id)
    {
        $user = Auth::user();
        $currentUser = User::find($id);
        $usersToAssign = [];
        
        if (!$currentUser) {
            return response()->json(['message' => 'Not found'], 404);
        }
        if (\App\Support\LeadScope::canSeeUser($user, $currentUser)) {
            $leads = Lead::where('user_id', $currentUser->id)->with('user')->with('project.developer')->orderBy('updated_at', 'desc')->paginate(6);
        }else{
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        
        
        if (\App\Support\LeadScope::isAdmin($user) || \App\Support\LeadScope::isLeader($user)) {
            $usersToAssign = \App\Support\LeadScope::assignable($user);
        }
            
        $lists = [
            'channels' => Channel::all(),
            'stages' => Stage::all(),
            'status' => Statu::all(),
            'projects' => Project::all(),
            'cities' => Area::all(),
            'usersToAssign' => $usersToAssign,
        ];

        return response()->json([
            'leads' => \App\Support\PhoneMask::apply($leads, $user),
            'lists' => $lists,
            'user' => $currentUser,
        ]);
    }
    
    public function assignLeads(Request $request)
    {
        $user = Auth::user();
        
        // Validate the incoming request
        $request->validate([
            'lead_ids' => 'required|array',
            'lead_ids.*' => 'exists:leads,id', // Ensure all lead IDs are valid
            'user_id' => 'required|exists:users,id',
        ]);
    
        // Find the user to assign the leads to
        $userToAssign = User::findOrFail($request->user_id);
        if (!in_array($userToAssign->account_type, \App\Support\LeadScope::ACTIVE, true)) return response()->json(['message' => 'This person is not an active Sales / Authorize / Admin account'], 422);
        
        // Fetch the leads based on the IDs provided in the request
        $leads = Lead::whereIn('id', $request->lead_ids)->with('project.developer')->with('user')->get();
        
        foreach ($leads as $lead) {
            if ($lead->user_id == $userToAssign->id) {
                continue;
            }
            // Check if the current user has permission to assign the lead
            if (!$this->canManageLead($user, $lead) || ($user->isTeamLeader() && !$this->inLeaderTeam($user, $userToAssign))) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
            if ($user->isTeamLeader() && $lead->isduplicate) {
                return response()->json(['message' => 'Team leaders cannot reassign duplicate leads (#' . $lead->id . ')'], 403);
            }
    
            // Capture the old user who had the lead
            $oldUser = $lead->user;
    
            // Assign the lead to the new user
            $lead->user_id = $userToAssign->id;
            $lead->save();
            $lead->load('user');
            // Log the action of assigning the lead
            Action::create([
                'user_id' => $user->id,
                'action_type' => 'assign lead',
                'details' => $user->first_name . ' ' . $user->last_name . ' assigned Lead: ' . $lead->client_name . ' from ' . $oldUser->first_name . ' ' . $oldUser->last_name . ' to ' . $userToAssign->first_name . ' ' . $userToAssign->last_name,
                'lead_id' => $lead->id
            ]);
    
            // Send a notification to the user being assigned the lead
            $notification = [
                'title' => 'Assigned lead',
                'description' => 'Assigned lead #' . $lead->id . ' ' . $lead->client_name . ' To ' . $userToAssign->first_name . ' ' . $userToAssign->last_name,
                'lead_id' => $lead->id,
                'notification_type' => 'Broadcast'
            ];
            
            
            
            if ($notification) {
                if ($userToAssign->isSales()) {
                    if ($userToAssign->team) {
                        $teamleader = User::find($userToAssign->team->leader_id);
                        $teamleader->pushNotification($notification);
                    }
                }
                // Push the notification to the user
                $userToAssign->pushNotification($notification);
            }
        }
        
        // Return a success response
        return response()->json(['leads' => \App\Support\PhoneMask::apply($leads, $user)], 200);
    }



    

    /**
     * Done deal / Reservation / Done Meeting/Showing: every lead that ever reached the stage
     * (a client who buys again and moves to another stage is still counted).
     */
    protected function milestoneCounts($scopeQuery)
    {
        if (!\App\Support\CrmSchema::has('lead_stage_history')) return [];
        $ids = (clone $scopeQuery)->select('leads.id');
        $hist = \Illuminate\Support\Facades\DB::table('lead_stage_history')
            ->whereIn('stage', Lead::MILESTONE_STAGES)->whereIn('lead_id', $ids)
            ->groupBy('stage')->selectRaw('stage, COUNT(DISTINCT lead_id) as c')->pluck('c', 'stage')->toArray();
        $out = [];
        foreach (Lead::MILESTONE_STAGES as $st) {
            // leads currently in the stage are counted even if they have no history row yet
            $now = (clone $scopeQuery)->where('stage', $st)
                ->whereNotIn('leads.id', function ($s) use ($st) { $s->select('lead_id')->from('lead_stage_history')->where('stage', $st); })
                ->count();
            $out[$st] = (int) ($hist[$st] ?? 0) + $now;
        }
        return $out;
    }

    /** project_ids / unit_ids arrive as arrays; project_id stays the first project (old app keeps working). */
    protected static function normalizeMulti(Request $request)
    {
        foreach (['project_ids', 'unit_ids'] as $f) {
            if (!$request->has($f)) continue;
            $v = $request->input($f);
            if (is_string($v)) $v = json_decode($v, true) ?: array_filter(explode(',', $v));
            $v = array_values(array_unique(array_filter(array_map('intval', (array) $v))));
            if (!\App\Support\CrmSchema::has('leads', $f)) { $request->request->remove($f); continue; }
            $request->merge([$f => $v ?: null]);
        }
        if ($request->has('project_ids') && $request->input('project_ids')) {
            $request->merge(['project_id' => $request->input('project_ids')[0]]);
        } elseif ($request->filled('project_id') && !$request->has('project_ids') && \App\Support\CrmSchema::has('leads', 'project_ids')) {
            // app / old forms send one project
        }
        foreach (['client_type' => ['Client', 'Broker'], 'lead_type' => ['Primary', 'Resale', 'Rent']] as $f => $ok) {
            if ($request->has($f) && $request->input($f) !== null && !in_array($request->input($f), $ok, true)) $request->merge([$f => null]);
            if ($request->has($f) && !\App\Support\CrmSchema::has('leads', $f)) $request->request->remove($f);
        }
    }

    /** Admin, the lead's owner, or the team leader of the owner's team. */
    protected function canManageLead($user, $lead)
    {
        if (\App\Support\LeadScope::isAdmin($user) || $user->id === $lead->user_id) return true;
        if (\App\Support\LeadScope::isLeader($user)) {
            return in_array((int) $lead->user_id, \App\Support\LeadScope::userIds($user), true);
        }
        return false;
    }

    /** True when $member is the leader himself or in the team he leads / belongs to. */
    protected function inLeaderTeam($leader, $member)
    {
        if (!$member) return false;
        return \App\Support\LeadScope::canSeeUser($leader, $member);
    }

    public function statistics()
    {
        return response()->json([
            'total_leads' => Lead::count(),
            'duplicated_leads' => Lead::where('isduplicate', true)->count(),
            'leads_by_channel' => Lead::selectRaw('channel, COUNT(*) as count')->groupBy('channel')->get(),
            'leads_by_status' => Lead::selectRaw('stage, COUNT(*) as count')->groupBy('stage')->get(),
        ]);
    }

    public function leadActions($id)
    {
        $lead = Lead::find((int) $id);
        $ids = \App\Support\LeadScope::userIds(Auth::user());
        if ($lead && $ids !== null && !in_array((int) $lead->user_id, $ids, true)) {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        $actions = Action::where('lead_id', $id)->with(['user' => function ($query) {
            $query->select('id', 'first_name', 'last_name'); // specify the columns you need
        }])->orderBy('created_at', 'desc')->paginate(6);
        return response()->json($actions);
    }
    
    
    
    public function filterLeads(Request $request)
    {
        $user = auth()->user(); // جلب المستخدم الحالي
        $filters = $request->only([
            'id',
            'client_email',
            'client_name',
            'client_number',
            'client_sec_number',
            'project_id',
            'action_type',
            'channel',
            'area',
            'stage',
            'status',
            'next_followUp_date',
            'isduplicate',
            'user_id',
            'created_at',
            'is_delayed',
            'client_type',
            'lead_type',
        ]);

        $query = Lead::query();

        // Who sees what: admin all · team leader his team · everyone else own leads
        \App\Support\LeadScope::apply($query, $user);
        // إذا كان المستخدم "Admin" فلا يوجد أي فلترة على الدور، يرى كل شيء

        // Filters (fixed): exact match for list values — "Interested" no longer matches "not interested",
        // ID is exact, names/emails are partial, phones match either number.
        foreach ($filters as $key => $value) {
            if (is_null($value) || $value === '') continue;
            if (in_array($key, ['client_email', 'client_name', 'action_type'])) {
                $query->where($key, 'LIKE', "%$value%");
            } elseif ($key === 'stage') {
                // the leads page shows the CURRENT stage (decision Asser, 29 Oct 2026): pressing «Deals» lists only leads in Done deal now.
                // "ever reached" counts stay in the Reports page.
                $query->where('stage', $value);
            } elseif ($key === 'project_id') {
                // the lead's main project or any of its extra projects
                $query->where(function ($w) use ($value) {
                    $w->where('project_id', $value);
                    if (\App\Support\CrmSchema::has('leads', 'project_ids')) {
                        $w->orWhere('project_ids', 'like', '%"' . (int) $value . '"%')->orWhere('project_ids', 'like', '%[' . (int) $value . ',%')
                          ->orWhere('project_ids', 'like', '%,' . (int) $value . ',%')->orWhere('project_ids', 'like', '%,' . (int) $value . ']%')
                          ->orWhere('project_ids', '[' . (int) $value . ']');
                    }
                });
            } elseif (in_array($key, ['channel', 'area', 'status', 'id', 'user_id', 'client_type', 'lead_type'])) {
                $query->where($key, $value);
            } elseif ($key === 'client_number' || $key === 'client_sec_number') {
                $query->where(function ($q) use ($value) {
                    $q->where('client_number', 'LIKE', "%$value%")
                      ->orWhere('client_sec_number', 'LIKE', "%$value%");
                });
            } elseif ($key === 'isduplicate') {
                $query->where('isduplicate', (bool) $value);
            } elseif ($key === 'is_delayed') {
                if ($value) $query->delayed();
            } elseif ($key === 'next_followUp_date') {
                $query->whereDate('next_followUp_date', $value);
            }
        }

        // Old leads: still open but nothing happened for N days (no edit, no comment)
        $staleDays = (int) $request->input('stale_days', 0);
        if ($staleDays > 0) {
            $since = now()->subDays($staleDays);
            $query->whereNotIn('stage', \App\Models\Lead::CLOSED_STAGES)->where('updated_at', '<', $since)
                ->whereNotExists(function ($w) use ($since) {
                    $w->select(\DB::raw(1))->from('comments')->whereColumn('comments.lead_id', 'leads.id')->where('comments.created_at', '>=', $since);
                });
        }

        // Search box: one text matches ID, name, phones or email
        $q = trim((string) $request->input('q', ''));
        // Arabic / Persian digits typed on a phone keyboard -> 0-9
        $q = strtr($q, ['٠'=>'0','١'=>'1','٢'=>'2','٣'=>'3','٤'=>'4','٥'=>'5','٦'=>'6','٧'=>'7','٨'=>'8','٩'=>'9','۰'=>'0','۱'=>'1','۲'=>'2','۳'=>'3','۴'=>'4','۵'=>'5','۶'=>'6','۷'=>'7','۸'=>'8','۹'=>'9']);
        if ($q !== '') {
            $digits = preg_replace('/\D+/', '', $q);
            $query->where(function ($w) use ($q, $digits) {
                $w->where('client_name', 'LIKE', "%$q%")->orWhere('client_email', 'LIKE', "%$q%");
                if ($digits !== '') {
                    $tail = strlen($digits) > 9 ? substr($digits, -9) : $digits; // ignore +20 / 0 prefixes
                    $w->orWhere('client_number', 'LIKE', "%$tail%")->orWhere('client_sec_number', 'LIKE', "%$tail%")
                      ->orWhereRaw("REPLACE(REPLACE(client_number,' ',''),'-','') LIKE ?", ["%$tail%"])
                      ->orWhereRaw("REPLACE(REPLACE(IFNULL(client_sec_number,''),' ',''),'-','') LIKE ?", ["%$tail%"]);
                    if (ctype_digit($q)) $w->orWhere('id', (int) $q);
                }
            });
        }

        // Timestamp range: whole days in Cairo time, 12:00 AM → 11:59:59 PM
        if (!empty($filters['created_at']) && is_array($filters['created_at']) && count($filters['created_at']) == 2) {
            $dates = $filters['created_at'];
            $startDate = \Carbon\Carbon::parse(substr((string) $dates[0], 0, 10), config('app.timezone'))->startOfDay();
            $endDate = \Carbon\Carbon::parse(substr((string) $dates[1], 0, 10), config('app.timezone'))->endOfDay();
            if ($endDate->lt($startDate)) { [$startDate, $endDate] = [$endDate->copy()->startOfDay(), $startDate->copy()->endOfDay()]; }
            $query->whereBetween('created_at', [$startDate, $endDate]);
        }

        $reports = $this->calculateStatistics((clone $query)->get(['id', 'stage']), $request->input('user_id'), clone $query);
        $query->with('user')->with('project.developer');
        
        
        // Paginate the filtered leads for the response
        $paginatedLeads = $query->orderBy('updated_at', 'desc')->paginate(6);
        // Return the results along with the statistics
        return response()->json([
            'leads' => \App\Support\PhoneMask::apply($paginatedLeads, $user),
            'statistics' => $reports,
        ]);
    }
    
    protected function calculateStatistics($leads , $id = null, $scopeQuery = null)
    {
        if($id){
            $user = User::findOrFail($id); 
        }else{
            $user = auth()->user(); 
        }
        
        // Total leads the person can see (for the percentages)
        $totalLeads = $id ? Lead::where('user_id', $user->id)->count() : \App\Support\LeadScope::apply(Lead::query(), $user)->count();

        $filteredTotal = $leads->count();
        // Group leads by stage
        $leads = $leads->groupBy('stage');
        // Calculate the total number of leads at the system (not filtered leads)
        $leadData = $leads->mapWithKeys(function ($group, $stage) {
            return [$stage => $group->count()];
        });
        // counters = current stage, so the number on a counter = the leads you get when you press it
        
        
        // Get all stages from the Stage model
        $stages = Stage::all();
    
        // Initialize an array to store statistics
        $statistics = [];
        $count=0;
        // Calculate the percentage for each stage
        foreach ($stages as $stage) {
            // Get the total number of leads for the current stage
            $stageTotal = $leadData[$stage->name] ?? 0;
            $percentage = 0;
    
            // Calculate the percentage if the total number of leads is greater than 0
            if ($totalLeads > 0) {
                $percentage = ($stageTotal / $totalLeads) * 100;
            }
            
            $count = $count + $stageTotal;
    
            // Add the calculated data to the statistics array
            $statistics[] = [
                'stage' => $stage->name,
                'total' => $stageTotal,
                'percentage' => number_format($percentage, 2), // Format the percentage to 2 decimal places
            ];
        }
        
        array_unshift($statistics, [
                'stage' => 'Total Leads',
                'total' => $filteredTotal,
                'percentage' => '100', // Format the percentage to 2 decimal places
            ]);

        
        return $statistics;
    }


    
    public function statisticsByStageForMonth(Request $request)
    {
        // Get the authenticated user
        $user = auth()->user();
    
        // Initialize the query to fetch leads
        $leadsQuery = Lead::query();
    
        // Get the requested user ID from the request, if any
        $requestedUserId = $request->get('id');
    
        \App\Support\LeadScope::apply($leadsQuery, $user);
        if ($requestedUserId) {
            if (!\App\Support\LeadScope::canSeeUser($user, User::find($requestedUserId))) {
                return response()->json(['error' => 'You are not authorized to view this user\'s statistics.'], 403);
            }
            $leadsQuery->where('user_id', $requestedUserId);
        }


        // Fetch leads grouped by stage, with a count of leads per stage
        $leads = $leadsQuery->groupBy('stage')
                            ->selectRaw('stage, COUNT(*) as total')
                            ->get();
    
        // Calculate the total number of leads
        $totalLeads = $leads->sum('total');
    
        // Convert the results to an associative array with stage as the key and total count as the value
        $leadData = $leads->keyBy('stage')->map(fn($item) => $item->total)->toArray();
    
        // Get all stages from the Stage model
        $stages = Stage::all();
    
        // Initialize an array to store statistics
        $statistics = [];
        $statistics[] = [
                'stage' => 'Total Leads',
                'total' => $totalLeads,
                'percentage' => '100', // Format the percentage to 2 decimal places
            ];
        //Calculate the percentage for each stage
        foreach ($stages as $stage) {
            // Get the total number of leads for the current stage
            $stageTotal = $leadData[$stage->name] ?? 0;
            $percentage = 0;
    
            // Calculate the percentage if the total number of leads is greater than 0
            if ($totalLeads > 0) {
                $percentage = ($stageTotal / $totalLeads) * 100;
            }
    
            // Add the calculated data to the statistics array
            $statistics[] = [
                'stage' => $stage->name,
                'total' => $stageTotal,
                'percentage' => number_format($percentage, 2), // Format the percentage to 2 decimal places
            ];
        }
    
        // Return the statistics as JSON
        return response()->json($statistics);
    }



}
