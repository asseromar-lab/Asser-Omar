<?php

namespace App\Http\Controllers\ContactUs;
use App\Jobs\SendNotificationToUsers;
use App\Http\Controllers\Controller;
use App\Models\ContactUs;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Developer;
use App\Models\Project;
use App\Models\Room;
use App\Models\Service;
use App\Models\Unit;
use Carbon\Carbon;

class ContactUsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        
        try {
            
    
            // Retrieve paginated records
            $contactus = ContactUs::whereNull('deleted_at')->orderBy('created_at', 'desc')->orderBy('id', 'desc')->paginate(8);
            $contactus = json_decode($contactus->toJson(),true);
            // Return the paginated results as a JSON response
            if (str_contains(url()->current(), 'api')){
                $returned_obj = [];
                $returned_obj["requests"] = $contactus;
                return json_encode(["data" => $returned_obj], JSON_UNESCAPED_UNICODE);
            }
            return view('contactus.index', compact('contactus'));
        
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   $data = $request->all();
        
        $data["user_id"] = Auth::id();
        try {
            $contactus=new ContactUs();
            
            $contactus = ContactUs::create($data);
            
            if ($data["project_id"] != null) {
                $contactus->project_name = Project::find($data["project_id"])->name;

                $contactus->developer_name = Developer::find(Project::find($data["project_id"])->developer_id)->name;

                
            } else {
                $contactus->project_name = null;

                $contactus->developer_name = null;
            }
            
            
              $contactus->user_name= trim(Auth::user()->first_name . ' ' . Auth::user()->last_name);
              $contactus->user_email=Auth::user()->email;
              $contactus->user_phone=Auth::user()->phone;
              $contactus->location=$data["location"];
              $contactus->size=$data["size"];
              $contactus->bedrooms=$data["bedrooms"];
              $contactus->bathrooms=$data["bathrooms"];
              $contactus->category=$data["category"];
              $contactus->price=$data["price"];
              $contactus->level=$data["level"];
              $contactus->down_payment=$data["down_payment"];
              $contactus->quarter_installment=$data["quarter_installment"];
              $contactus->delivery_date=$data["delivery_date"];
              $contactus->finishing=$data["finishing"];
              $contactus->city=$data["city"];
              $contactus->land=$data["land"];
            
            
            
            
        
            $contactus->save();
            
            
            /*$users = User::whereIn('role_id', [2, 3])  // 2 = Sales, 3 = Admin
                 ->orWhere('account_type', 'Authorize')  // Include users with account_type 'Authorize'
                 ->get();
                 
            $notification = [
                    'title' => 'New Request',
                    'description' => 'New buyer request added: #' . $contactus->id,
                    'unit_id' => $contactus->id,
                    'notification_type' => 'Broadcast'
            ];
            
            foreach ($users as $user) {
                $user->pushNotification($notification); // Assuming pushNotification method sends the notification
            }*/
            SendNotificationToUsers::dispatch($contactus);

            return json_encode(["data"=>["contactus"=>$contactus],"code"=>200],JSON_UNESCAPED_UNICODE);
        }
        
         catch (\Throwable $th) {
            return json_encode(["error"=>$th->getMessage()]);
        }
       
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }
    
    public function search(Request $request)
    {
        // Validate the search keyword to make sure it's not empty
        $request->validate([
            'keyword' => 'required|string|min:1',
        ]);
    
        // The keyword from the request
        $keyword = $request->input('keyword');
    
        // Perform the query and search for the keyword in multiple columns
        $results = ContactUs::query()
        ->where('project_name', 'like', '%' . $keyword . '%')
        ->orWhere('type', 'like', '%' . $keyword . '%')
        ->orWhere('location', 'like', '%' . $keyword . '%')
        ->orWhere('category', 'like', '%' . $keyword . '%')
        ->orWhere('size', 'like', '%' . $keyword . '%')
        ->orWhere('city', 'like', '%' . $keyword . '%')
        ->orWhere('user_name', 'like', '%' . $keyword . '%')
        ->orWhere('user_email', 'like', '%' . $keyword . '%')
        ->orWhere('user_phone', 'like', '%' . $keyword . '%')
        ->orWhere('price', 'like', '%' . $keyword . '%')   // Example for price field
        ->orWhere('bedrooms', 'like', '%' . $keyword . '%') // Example for bedrooms field
        ->orWhere('bathrooms', 'like', '%' . $keyword . '%') // Example for bathrooms field
        ->orWhere('down_payment', 'like', '%' . $keyword . '%') // Example for down_payment field
        ->orWhere('quarter_installment', 'like', '%' . $keyword . '%') // Example for quarter_installment field
        ->orWhere('delivery_date', 'like', '%' . $keyword . '%')  // Example for delivery_date field
        ->orWhere('finishing', 'like', '%' . $keyword . '%') // Example for finishing field
        ->orWhere('land', 'like', '%' . $keyword . '%')  // Example for land field
        ->paginate(8);
    
        // Return the results as a JSON response
                $returned_obj = [];
                $returned_obj["requests"] = $results;
                return json_encode(["data" => $returned_obj], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Admins only, and kept (soft delete) so it can be restored
        $me = Auth::user();
        if (!($me && ((int) $me->role_id === 3 || $me->account_type === 'Admin'))) {
            return response()->json(['message' => 'Admins only'], 403);
        }
        \Illuminate\Support\Facades\DB::table('contact_us')->where('id', (int) $id)->update(['deleted_at' => now()]);
        if (str_contains(url()->current(), 'api')) { 
           return json_encode(["data" => 'Request is Deleted Successfully'], JSON_UNESCAPED_UNICODE);
        }
        return redirect()->back()->withErrors(["ContactUs Has Deleted Successfully"]);


    }
}
