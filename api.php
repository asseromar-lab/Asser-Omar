<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\CommentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//use App\Http\Controllers\GenericController;

//Route::prefix('{model}')->group(function () {
//    Route::get('/', [GenericController::class, 'index']);         // Get all items for model
//    Route::post('/', [GenericController::class, 'store']);        // Create new item for model
//    Route::put('{id}', [GenericController::class, 'update']);     // Update item by ID
//    Route::delete('{id}', [GenericController::class, 'destroy']); // Delete item by ID
//});

Route::get('/error_message', function (){
    return json_encode(["error"=>"Not Authenticated"]);
})->name("error_message");

Route::group(["middleware"=>'auth:api'], function () {
    Route::post('/device_token',"App\Http\Controllers\Users\UserController@updateDeviceToken");
    
    Route::get('leads/reports',"App\Http\Controllers\LeadsController@statisticsByStageForMonth")->middleware('staff');
    Route::get('leads/{id}/actions',"App\Http\Controllers\LeadsController@leadActions")->middleware('staff');
    Route::get('/leads',"App\Http\Controllers\LeadsController@index")->middleware('staff');
    Route::get('/user-leads/{id}',"App\Http\Controllers\LeadsController@getUserLeads")->middleware('staff');
    Route::post('/filter-leads',"App\Http\Controllers\LeadsController@filterLeads")->middleware('staff');
    Route::post('/leads/{id}',"App\Http\Controllers\LeadsController@update")->middleware('staff');
    Route::post('/leads',"App\Http\Controllers\LeadsController@store")->middleware('staff');
    Route::delete('/leads/{id}',"App\Http\Controllers\LeadsController@destroy")->middleware('staff');
    Route::post('/leads-assign', "App\Http\Controllers\LeadsController@assignLeads")->middleware('staff');
    Route::get('/export-leads',"App\Http\Controllers\LeadsController@exportSheet")->middleware('staff');
    
    Route::get('/notifications',"App\Http\Controllers\Notification\NotificationsController@index");
    Route::post('/notifications',"App\Http\Controllers\Notification\NotificationsController@store");
    Route::post('/notifications/mark-all-seen',"App\Http\Controllers\Notification\NotificationsController@markAllAsSeen");
    Route::put('/notifications/{id}',"App\Http\Controllers\Notification\NotificationsController@update");

    Route::put('/update_auth_user',"App\Http\Controllers\Users\UserController@update_auth_user");
    Route::post('/units',"App\Http\Controllers\Unit\UnitsController@store");
    Route::post('/units/{id}',"App\Http\Controllers\Unit\UnitsController@update");
    
    Route::delete('/units/{id}',"App\Http\Controllers\Unit\UnitsController@destroy");
    Route::post('/units',"App\Http\Controllers\Unit\UnitsController@store");
    Route::post('/wishlist',"App\Http\Controllers\Wishlist\WishlistsController@store");
    Route::get('/wishlist',"App\Http\Controllers\Wishlist\WishlistsController@index");
    Route::get('/attach_visit/{id}',"App\Http\Controllers\Unit\UnitsController@attach_visit");
    Route::post('/rates',"App\Http\Controllers\Rate\RatesController@store");
    Route::get('/get_user_books',"App\Http\Controllers\Book\BooksController@GetUserBooks");
    Route::post('/books',"App\Http\Controllers\Book\BooksController@store");
    Route::get('/get_auth_user_units',"App\Http\Controllers\Unit\UnitsController@GetAuthUserUnits");
    Route::get('/search_my_units' , "App\Http\Controllers\Unit\UnitsController@SearchMyAds");
    Route::get('/search' , "App\Http\Controllers\Unit\UnitsController@search");
    Route::get('/user/developers',"App\Http\Controllers\Users\UserController@GetUserDevelopers");
    Route::get('/user/projects',"App\Http\Controllers\Users\UserController@GetUserProjects");
    Route::get('/GetRecommendedUnits',"App\Http\Controllers\Unit\UnitsController@GetRecommendedUnits");
    Route::get("/GetUserDetails","App\Http\Controllers\Users\UserController@GetUserDetails");
    Route::post('/contactus',"App\Http\Controllers\ContactUs\ContactUsController@store");
    Route::get('/contactus-search',"App\Http\Controllers\ContactUs\ContactUsController@search")->middleware('staff');
    Route::delete('/contactus/{id}',"App\Http\Controllers\ContactUs\ContactUsController@destroy")->middleware('staff');
    Route::post('/deleteAccount' , "App\Http\Controllers\Users\UserController@deleteAccound");
    Route::get('/units',"App\Http\Controllers\Unit\UnitsController@index");
    Route::post('/filter-units' , "App\Http\Controllers\Unit\UnitsController@AdminfilterUnits");
    
    Route::post('/projects/{id}',"App\Http\Controllers\Project\ProjectsController@update")->middleware('staff');
    Route::delete('/projects/{id}',"App\Http\Controllers\Project\ProjectsController@destroy")->middleware('staff');
    Route::post('/projects',"App\Http\Controllers\Project\ProjectsController@store")->middleware('staff');
    Route::post('/developers/{id}',"App\Http\Controllers\Developer\DevelopersController@update")->middleware('staff');
    Route::post('/developers',"App\Http\Controllers\Developer\DevelopersController@store")->middleware('staff');
    Route::delete('/developers/{id}',"App\Http\Controllers\Developer\DevelopersController@destroy")->middleware('staff');
    Route::get('/users',"App\Http\Controllers\Users\UserController@index");
    Route::get('/users-search',"App\Http\Controllers\Users\UserController@search")->middleware('staff');
    Route::get('/user-units/{id}',"App\Http\Controllers\Users\UserController@userUnits")->middleware('staff');
    Route::post('/users',"App\Http\Controllers\Users\UserController@store");
    Route::delete('/users/{id}',"App\Http\Controllers\Users\UserController@destroy");
    Route::post('/users/{id}',"App\Http\Controllers\Users\UserController@update");
    Route::get('/export-units',"App\Http\Controllers\Unit\UnitsController@exportSheet");
    
    Route::get('/teams', [TeamController::class, 'index'])->middleware('staff'); // جلب جميع الفرق
    Route::get('/teams/{id}', [TeamController::class, 'show'])->middleware('staff'); // عرض تفاصيل فريق معين
    Route::post('/teams', [TeamController::class, 'store'])->middleware('staff'); // إضافة فريق جديد
    Route::put('/teams/{id}', [TeamController::class, 'update'])->middleware('staff'); // تحديث بيانات فريق
    Route::delete('/teams/{id}', [TeamController::class, 'destroy'])->middleware('staff'); // حذف فريق

    Route::post('/teams/{teamId}/assign-user', [TeamController::class, 'assignUserToTeam'])->middleware('staff'); // تعيين مستخدم إلى فريق
    Route::get('/teams/{teamId}/members', [TeamController::class, 'getTeamMembers'])->middleware('staff'); // جلب أعضاء الفريق
    Route::delete('/teams/{teamId}/remove-user', [TeamController::class, 'removeUserFromTeam'])->middleware('staff'); // إزالة مستخدم من الفريق
    
    Route::get('/comments', [CommentController::class, 'index'])->middleware('staff'); // Get all comments
    Route::get('/comments/{id}', [CommentController::class, 'show'])->middleware('staff'); // Show a specific comment
    Route::post('/comments', [CommentController::class, 'store'])->middleware('staff'); // Create a new comment
    Route::put('/comments/{id}', [CommentController::class, 'update'])->middleware('staff'); // Update a comment
    Route::delete('/comments/{id}', [CommentController::class, 'destroy'])->middleware('staff'); // Delete a comment
    Route::get('/comments/lead/{lead_id}', [CommentController::class, 'getCommentsByLead'])->middleware('staff');
    
    Route::delete('/beds/{id}',"App\Http\Controllers\Bed\BedsController@destroy")->middleware('staff');
    Route::delete('/finishings/{id}',"App\Http\Controllers\Finishing\FinishingController@destroy")->middleware('staff');
    Route::delete('/levels/{id}',"App\Http\Controllers\Level\LevelsController@destroy")->middleware('staff');
    Route::delete('/paths/{id}',"App\Http\Controllers\Path\PathsController@destroy")->middleware('staff');
    Route::delete('/propertytypes/{id}',"App\Http\Controllers\PropertyType\PropertyTypesController@destroy")->middleware('staff');
    Route::delete('/services/{id}',"App\Http\Controllers\Service\ServicesController@destroy")->middleware('staff');
    Route::delete('/locations',"App\Http\Controllers\Area\AreasController@destroy")->middleware('staff');
    
    Route::post('/beds',"App\Http\Controllers\Bed\BedsController@store")->middleware('staff');
    Route::post('/finishings',"App\Http\Controllers\Finishing\FinishingController@store")->middleware('staff');
    Route::post('/levels',"App\Http\Controllers\Level\LevelsController@store")->middleware('staff');
    Route::post('/paths',"App\Http\Controllers\Path\PathsController@store")->middleware('staff');
    Route::post('/propertytypes',"App\Http\Controllers\PropertyType\PropertyTypesController@store")->middleware('staff');
    Route::post('/services',"App\Http\Controllers\Service\ServicesController@store")->middleware('staff');
    Route::post('/locations',"App\Http\Controllers\Area\AreasController@store")->middleware('staff');
    
    
    Route::post('/storeVideo' , "App\Http\Controllers\Unit\UnitsController@storevideo")->middleware('staff');

    // ---- dashboard CRM helpers (CRM fixes batch 2) ----
    Route::prefix('crm')->middleware('staff')->group(function () {
        Route::post('/leads/delete', "App\Http\Controllers\LeadsController@destroyMany");
        Route::get('/dup-requests', "App\Http\Controllers\DuplicateRequestController@index");
        Route::post('/dup-requests', "App\Http\Controllers\DuplicateRequestController@store");
        Route::post('/dup-requests/{id}/approve', "App\Http\Controllers\DuplicateRequestController@approve");
        Route::post('/dup-requests/{id}/reject', "App\Http\Controllers\DuplicateRequestController@reject");
        Route::get('/units-pick', "App\Http\Controllers\UnitCollectionController@pick");
        Route::get('/collections', "App\Http\Controllers\UnitCollectionController@mine");
        Route::get('/collections-leads', "App\Http\Controllers\UnitCollectionController@leads");
        Route::post('/collections', "App\Http\Controllers\UnitCollectionController@store");
        Route::post('/collections/{id}/sent', "App\Http\Controllers\UnitCollectionController@sent");
        Route::get('/routing', "App\Http\Controllers\LeadIntakeController@routing");
        Route::post('/routing', "App\Http\Controllers\LeadIntakeController@saveRouting");
        Route::get('/intake', "App\Http\Controllers\LeadIntakeController@intake");
        Route::post('/intake', "App\Http\Controllers\LeadIntakeController@saveIntake");
        Route::get('/units-stats', "App\Http\Controllers\CrmDashboardController@unitsStats");
        Route::get('/units/{id}/photos', "App\Http\Controllers\CrmDashboardController@photos");
        Route::post('/units/{id}/photos', "App\Http\Controllers\CrmDashboardController@addPhotos");
        Route::delete('/units/{id}/photos', "App\Http\Controllers\CrmDashboardController@deletePhoto");
        Route::post('/units/{id}/photos/order', "App\Http\Controllers\CrmDashboardController@orderPhotos");
        Route::get('/lists/{list}', "App\Http\Controllers\CrmDashboardController@listIndex");
        Route::post('/lists/{list}', "App\Http\Controllers\CrmDashboardController@listStore");
        Route::put('/lists/{list}/{id}', "App\Http\Controllers\CrmDashboardController@listUpdate");
        Route::delete('/lists/{list}/{id}', "App\Http\Controllers\CrmDashboardController@listDestroy");
        Route::get('/leads/{id}/tasks', "App\Http\Controllers\CrmDashboardController@tasks");
        Route::post('/leads/{id}/tasks', "App\Http\Controllers\CrmDashboardController@addTask");
        Route::put('/tasks/{id}', "App\Http\Controllers\CrmDashboardController@updateTask");
        Route::delete('/tasks/{id}', "App\Http\Controllers\CrmDashboardController@deleteTask");
        Route::get('/leads/check-phone', "App\Http\Controllers\CrmDashboardController@checkPhone");
        Route::get('/units-lookup', "App\Http\Controllers\CrmDashboardController@unitsLookup");
        Route::put('/units/{id}/availability', "App\Http\Controllers\CrmDashboardController@setAvailability");
        Route::put('/units/{id}/owner', "App\Http\Controllers\CrmDashboardController@setOwner");
        Route::get('/reports/sales', "App\Http\Controllers\CrmDashboardController@salesReport");
        Route::get('/reports/daily', "App\Http\Controllers\CrmDashboardController@dailyReport");
        Route::get('/reports/units', "App\Http\Controllers\CrmDashboardController@unitsReport");
        Route::get('/requests', "App\Http\Controllers\CrmDashboardController@requests");
        Route::get('/web-leads', "App\Http\Controllers\CrmDashboardController@webLeads");
        Route::post('/requests', "App\Http\Controllers\CrmDashboardController@storeRequest");
        Route::put('/requests/{id}', "App\Http\Controllers\CrmDashboardController@updateRequest");
        Route::delete('/requests/{id}', "App\Http\Controllers\CrmDashboardController@deleteRequest");
        // wallet + finance sheet link
        // Finance tab (people with access only)
        Route::get('/fin/me', "App\Http\Controllers\FinBookController@me");
        Route::get('/fin/lists', "App\Http\Controllers\FinBookController@lists");
        Route::get('/fin/dashboard', "App\Http\Controllers\FinBookController@dashboard");
        Route::get('/fin/deals', "App\Http\Controllers\FinBookController@deals");
        Route::post('/fin/deals', "App\Http\Controllers\FinBookController@storeDeal");
        Route::put('/fin/deals/{id}', "App\Http\Controllers\FinBookController@updateDeal");
        Route::get('/fin/book', "App\Http\Controllers\FinBookController@book");
        Route::post('/fin/book', "App\Http\Controllers\FinBookController@storeBook");
        Route::post('/fin/book/{id}/void', "App\Http\Controllers\FinBookController@voidBook");
        Route::get('/fin/payroll', "App\Http\Controllers\FinBookController@payroll");
        Route::put('/fin/payroll', "App\Http\Controllers\FinBookController@savePayroll");
        Route::post('/fin/payroll/{id}/pay', "App\Http\Controllers\FinBookController@payPayroll");
        Route::get('/fin/access', "App\Http\Controllers\FinBookController@access");
        Route::put('/fin/access', "App\Http\Controllers\FinBookController@saveAccess");
        Route::get('/fin/audit', "App\Http\Controllers\FinBookController@auditLog");
        Route::put('/fin/master', "App\Http\Controllers\FinBookController@setMaster");
        // sale contracts («وعد بالبيع»)
        Route::get('/contracts', "App\Http\Controllers\ContractController@index");
        Route::post('/contracts', "App\Http\Controllers\ContractController@save");
        Route::delete('/contracts/{id}', "App\Http\Controllers\ContractController@destroy");
        Route::get('/wallet', "App\Http\Controllers\FinanceController@wallet");
        Route::get('/wallet/team', "App\Http\Controllers\FinanceController@team");
        Route::get('/finance/settings', "App\Http\Controllers\FinanceController@settings");
        Route::post('/finance/token', "App\Http\Controllers\FinanceController@newToken");
        Route::get('/finance/names', "App\Http\Controllers\FinanceController@names");
        Route::put('/finance/names/{id}', "App\Http\Controllers\FinanceController@mapName");
        // whatsapp templates, phone reveal, calendar
        Route::get('/wa-templates', "App\Http\Controllers\CrmExtrasController@waTemplates");
        Route::post('/wa-templates', "App\Http\Controllers\CrmExtrasController@waStore");
        Route::put('/wa-templates/{id}', "App\Http\Controllers\CrmExtrasController@waUpdate");
        Route::delete('/wa-templates/{id}', "App\Http\Controllers\CrmExtrasController@waDelete");
        Route::post('/leads/{id}/wa-log', "App\Http\Controllers\CrmExtrasController@waLog");
        Route::get('/leads/{id}/phone', "App\Http\Controllers\CrmExtrasController@phone");
        Route::get('/phone-views', "App\Http\Controllers\CrmExtrasController@phoneViews");
        Route::get('/calendar-link', "App\Http\Controllers\CrmExtrasController@calendarLink");
        Route::post('/calendar-link', "App\Http\Controllers\CrmExtrasController@calendarReset");
        // AI assistant
        Route::get('/ai/status', "App\Http\Controllers\AiController@status");
        Route::post('/ai/chat', "App\Http\Controllers\AiController@chat");
        Route::get('/ai/settings', "App\Http\Controllers\AiController@settings");
        Route::post('/ai/settings', "App\Http\Controllers\AiController@saveSettings");
        Route::get('/ai/my-key', "App\Http\Controllers\AiController@myKey");
        Route::post('/ai/handoff', "App\Http\Controllers\AiController@handoff");
        Route::get('/legal/{id}/download', "App\Http\Controllers\AiController@legalDownload");
        Route::post('/ai/my-key', "App\Http\Controllers\AiController@saveMyKey");
    });

});

// TAP Finance sheet script (secret token, no login)
Route::middleware('throttle:30,1')->group(function () {
    Route::get('/finance/outbox', "App\Http\Controllers\FinanceController@outbox");
    // leads that arrive by themselves (any system with the secret link; Facebook / Instagram Lead Ads)
    Route::post('/inbound/lead', "App\Http\Controllers\LeadIntakeController@inbound");
    Route::get('/meta/leads', "App\Http\Controllers\LeadIntakeController@metaVerify");
    Route::post('/meta/leads', "App\Http\Controllers\LeadIntakeController@metaHook");
    Route::post('/finance/ack', "App\Http\Controllers\FinanceController@ack");
    Route::post('/finance/sync', "App\Http\Controllers\FinanceController@sync");
});
// personal follow-up calendar feed (secret per-user link)
Route::get('/cal/{token}.ics', "App\Http\Controllers\CrmExtrasController@feed")->middleware('throttle:60,1');

Route::get('/offers',"App\Http\Controllers\Offer\OffersController@index");
Route::post('/offers',"App\Http\Controllers\Offer\OffersController@store")->middleware(['auth:api', 'staff']);
Route::post('/offers/{id}',"App\Http\Controllers\Offer\OffersController@update")->middleware(['auth:api', 'staff']);
Route::delete('/offers/{id}',"App\Http\Controllers\Offer\OffersController@destroy")->middleware(['auth:api', 'staff']);

Route::get('/contactus',"App\Http\Controllers\ContactUs\ContactUsController@index")->middleware(['auth:api', 'staff']);

Route::post('/projects/crm',"App\Http\Controllers\Users\UserController@updateCrm")->middleware(['auth:api', 'staff']);
Route::get('/get_units_videos',"App\Http\Controllers\Unit\UnitsController@get_units_videos");

Route::post('/GetSortedUnits',"App\Http\Controllers\Unit\UnitsController@GetSortedUnits");
Route::post('/GetRatedUnits',"App\Http\Controllers\Unit\UnitsController@GetRatedUnits");
Route::post('/GetPricedUnits',"App\Http\Controllers\Unit\UnitsController@GetPricedUnits");

Route::get("/GetTodaysOffers","App\Http\Controllers\Unit\UnitsController@GetTodaysOffers");

Route::get('/get_services',"App\Http\Controllers\Unit\UnitsController@GetServices");




Route::get('/developers',"App\Http\Controllers\Developer\DevelopersController@index");
Route::get('/developers_search',"App\Http\Controllers\Developer\DevelopersController@search");

Route::get('/get_projects_unit/{id}',"App\Http\Controllers\Project\ProjectsController@GetProjectUnits");
Route::get('/projects',"App\Http\Controllers\Project\ProjectsController@index");

Route::get('/projects_search',"App\Http\Controllers\Project\ProjectsController@search");
Route::get('/projects_search_without_developer',"App\Http\Controllers\Project\ProjectsController@SearchWithoutProject");



Route::get('/get_developer_projects/{id}',"App\Http\Controllers\Developer\DevelopersController@GetDeveloperProjects");
Route::get('/get_developer_units/{id}',"App\Http\Controllers\Developer\DevelopersController@GetDeveloperUnits");

Route::get('/get_all_developers',"App\Http\Controllers\Developer\DevelopersController@GetAllDevelopers");

Route::get('/get_all_projects',"App\Http\Controllers\Project\ProjectsController@GetAllProjects");




Route::get('/units/{id}',"App\Http\Controllers\Unit\UnitsController@show");
Route::post('/filter_units',"App\Http\Controllers\Unit\UnitsController@FilterUnits");

Route::post('/filter',"App\Http\Controllers\Unit\UnitsController@filter");

Route::post('/Register',"App\Http\Controllers\Auth\RegisterController@Register")->middleware('throttle:5,10,app-register');
Route::post('/login',"App\Http\Controllers\Auth\LoginController@ApiLogin")->middleware('throttle:10,1,app-login');
Route::get("/check_user_existance/{account_name}","App\Http\Controllers\Users\UserController@check_user_existance")->name("check_user_existance")->middleware('throttle:20,1,app-exists');


Route::get('/beds',"App\Http\Controllers\Bed\BedsController@index");
Route::get('/finishings',"App\Http\Controllers\Finishing\FinishingController@index");
Route::get('/levels',"App\Http\Controllers\Level\LevelsController@index");
Route::get('/paths',"App\Http\Controllers\Path\PathsController@index");
Route::get('/propertytypes',"App\Http\Controllers\PropertyType\PropertyTypesController@index");
Route::get('/services',"App\Http\Controllers\Service\ServicesController@index");
Route::get('/locations',"App\Http\Controllers\Area\AreasController@getAreas");
Route::get('/areas',"App\Http\Controllers\Area\AreasController@getAppAreas");


Route::post('/set_reset_password_code',"App\Http\Controllers\Users\UserController@SetResetPasswordCode");
Route::post('/reset_password',"App\Http\Controllers\Users\UserController@ResetPassword")->middleware('throttle:5,10,app-reset');

// ---- «بكام» website: public read-only API + public lead form (v1.2) ----
Route::prefix('web')->group(function () {
    Route::get('/home', "App\Http\Controllers\WebController@home")->middleware('throttle:120,1,web-gethome');
    // the website address for links (CRM "open on Bekam" / share buttons follow BEKAM_PUBLIC_URL)
    Route::get('/site', function () { return response()->json(['url' => \App\Support\PublicUrl::base(request()) . '/bekam/']); })->middleware('throttle:60,1,web-site');
    Route::get('/units', "App\Http\Controllers\WebController@units")->middleware('throttle:120,1,web-getunits');
    Route::get('/units/{id}', "App\Http\Controllers\WebController@unit")->middleware('throttle:120,1,web-getunits-id');
    Route::post('/leads', "App\Http\Controllers\WebController@lead")->middleware('throttle:5,10,web-postleads');
    Route::get('/collections/{token}', "App\Http\Controllers\UnitCollectionController@show")->middleware('throttle:120,1,web-coll');
    Route::post('/units/{id}/offer', "App\Http\Controllers\UnitOfferController@store")->where('id', '[0-9]+')->middleware('throttle:20,10,web-offer');
    Route::get('/developers', "App\Http\Controllers\WebCatalogController@developers")->middleware('throttle:120,1,web-getdevelopers');
    Route::get('/developers/{id}', "App\Http\Controllers\WebCatalogController@developer")->middleware('throttle:120,1,web-getdevelopers-id');
    Route::get('/projects', "App\Http\Controllers\WebCatalogController@projects")->middleware('throttle:120,1,web-getprojects');
    Route::get('/projects/{id}', "App\Http\Controllers\WebCatalogController@project")->middleware('throttle:120,1,web-getprojects-id');
    Route::get('/projects-compare', "App\Http\Controllers\WebCatalogController@compareProjects")->middleware('throttle:60,1,web-projcompare');
    Route::get('/offers', "App\Http\Controllers\WebCatalogController@offers")->middleware('throttle:120,1,web-getoffers');
    Route::get('/units/{id}/pdf-photo/{n}', "App\Http\Controllers\WebCatalogController@pdfPhoto")->middleware('throttle:240,1,web-pdfphoto');
    Route::post('/requests', "App\Http\Controllers\WebAccountController@specialRequest")->middleware('throttle:5,10,web-postrequests');
    Route::get('/listing-options', "App\Http\Controllers\WebListingController@options")->middleware('throttle:60,1,web-getlisting-options');
    Route::post('/my-units', "App\Http\Controllers\WebListingController@store")->middleware(['auth:api', 'throttle:10,60,web-postmy-units']);
    Route::post('/auth/login', "App\Http\Controllers\WebAuthController@login")->middleware('throttle:10,10,web-postauth-login');
    Route::post('/auth/register', "App\Http\Controllers\WebAuthController@register")->middleware('throttle:5,60,web-postauth-register');
    Route::post('/password/forgot', "App\Http\Controllers\PasswordResetController@forgot")->middleware('throttle:3,10,web-pw-forgot');
    Route::post('/password/reset', "App\Http\Controllers\PasswordResetController@reset")->middleware('throttle:10,10,web-pw-reset');
    Route::group(['middleware' => ['auth:api', 'throttle:120,1,web-auth']], function () {
        Route::get('/me', "App\Http\Controllers\WebAuthController@me");
        Route::post('/favorites/sync', "App\Http\Controllers\WebAuthController@syncFavorites");
        Route::post('/favorites/{unit}', "App\Http\Controllers\WebAuthController@toggleFavorite");
        Route::post('/auth/logout', "App\Http\Controllers\WebAuthController@logout");
        Route::get('/my-units', "App\Http\Controllers\WebListingController@mine");
        Route::delete('/my-units/{id}', "App\Http\Controllers\WebListingController@destroy");
        Route::get('/my-units/{id}', "App\Http\Controllers\WebListingController@show");
        Route::post('/my-units/{id}', "App\Http\Controllers\WebListingController@update")->middleware('throttle:20,60,web-postmy-units-id');
        Route::post('/units/{id}/rate', "App\Http\Controllers\WebCatalogController@rate");
        Route::post('/units/{id}/visit', "App\Http\Controllers\WebCatalogController@visit");
        Route::put('/profile', "App\Http\Controllers\WebAccountController@updateProfile");
        Route::post('/profile/password', "App\Http\Controllers\WebAccountController@changePassword")->middleware('throttle:10,10,web-postprofile-password');
        Route::delete('/profile', "App\Http\Controllers\WebAccountController@deleteAccount")->middleware('throttle:5,10,web-deleteprofile');
        Route::post('/units/{id}/contact', "App\Http\Controllers\WebCatalogController@contact")->middleware('throttle:30,60,web-contact');
        Route::post('/units/{id}/pdf', "App\Http\Controllers\WebCatalogController@pdfInfo")->middleware('throttle:40,60,web-pdf');
        Route::get('/alerts', "App\Http\Controllers\WebAlertsController@index");
        Route::post('/alerts', "App\Http\Controllers\WebAlertsController@store")->middleware('throttle:30,60,web-postalerts');
        Route::delete('/alerts/{id}', "App\Http\Controllers\WebAlertsController@destroy");
        Route::post('/projects/{id}/location', "App\Http\Controllers\WebCatalogController@setLocation")->middleware('throttle:60,1,web-projloc');
        Route::get('/notifications', "App\Http\Controllers\WebAccountController@notifications");
        Route::post('/notifications/seen', "App\Http\Controllers\WebAccountController@notificationsSeen");
    });
});
