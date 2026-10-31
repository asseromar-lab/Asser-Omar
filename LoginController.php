<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client as GuzzleHttpClient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Laravel\Passport\Client as LaravelClient;
class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = "/users";

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function ApiLogin(Request  $request)
    {
        
    $client = LaravelClient::where('password_client', 1)->first();
    $http = new GuzzleHttpClient();
    $password=$request->password;

    try {
    // SECURITY (v55): the old Facebook / Gmail branches handed out a login for ANY email without checking
    // the social token at all (account takeover). No current app uses them.
    if ($request->filled("facebook_token") || $request->filled("gmail_token")) {
        return json_encode(["error" => "Social login is no longer supported. Log in with your password."]);
    }

    $response = $http->post('https://tapegypt.com/oauth/token', [
        'form_params' => [
            'grant_type' => 'password',
            'client_id' => $client->id,
            'client_secret' => $client->secret,
            'username' => $request->email,
            'password' => $request->password,
            'scope' => '',
        ],
    ]);
    
    
     $user=User::where("email",$request->email)->orWhere("phone",$request->email)->first();
     // the team CRM (dashboard) only lets the company team in: Admin / Authorize / Sales
     $fromCrm = $request->boolean('crm') || preg_match('#^https?://dashboard\.tapegypt\.com#i', (string) $request->headers->get('origin', $request->headers->get('referer', '')));
     if ($fromCrm && (!$user || !\App\Http\Middleware\StaffMiddleware::isStaff($user))) {
         return json_encode(["error" => "الحساب ده مش من فريق العمل. الدخول هنا لموظفين الشركة بس."]);
     }
     /*$user->token=json_decode($response->getBody()->getContents(),true);
    return json_encode($user);
    */
    return json_encode(["token"=>json_decode($response->getBody()->getContents())->access_token,"id"=>$user->id,"user_name"=>$user->first_name. " ".$user->last_name,"email"=>$user->email , "account_type"=>$user->account_type , 'crm_role' => $user->role->name],true);

    } catch (\Throwable $th) {
       return json_encode(["error"=>"Invalid email or password"]);
    
    }
        
    }
}
