<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// App share links opened by someone WITHOUT the app (with the app installed, the app opens them itself).
// Before: an error page when the unit was missing, and /filter always crashed. Now they open the «بكام» website.
Route::get('/unit', function (Request $request) {
    $unitId = (int) $request->query('id');
    if ($unitId && \App\Models\Unit::find($unitId)) {
        return redirect('/bekam/u/' . $unitId);
    }
    return redirect('/bekam/');
});
Route::get('/filter', function () {
    return redirect('/bekam/#units');
});
Route::get('/wishlist', function () {
    return redirect('/bekam/#favorites');
});


Route::get('/', function () {
  // «بكام» on its own sub-domain (e.g. bekam.tapegypt.com): links there open in the browser even when the TAP Egypt app is installed
  if (\App\Support\PublicUrl::isWebsiteHost(request()->getHost())) return redirect('/bekam/');

  return redirect()->route("units.index");
/*
$path = "/home/u454118250/domains/tapegypt.com/public_html";
      $files = File::directories($path);
       
     foreach($files as $key=>$file){
         $arr=explode("/",$file);
               echo $arr[sizeof($arr)-1];
echo "<br>";


     }*/
  //return redirect()->route("units.index");
 // $redis = Redis::connection();
   /* $start = microtime(true);
    $visits=Redis::incr("visits");
    $visits=DB::table("switches")->where("id",134300);
    //$visits->update(["state"=>1]);
    
    $time_elapsed_secs = microtime(true) - $start;
    
   return $visits->first()->state . "  the time consumed  " .$time_elapsed_secs;*/
   
  /*  $start = microtime(true);
    for($i=0;$i<1000000;$i++){
      Redis::set($i, json_encode(["name"=>"ahmed".$i,"phone"=>"01013917487","email"=>"email@yahoo.com","country"=>"egypt"]));

      //  $visits=DB::table("switches")->insert(["name"=>"ahmed","phone"=>"01013917487","email"=>"email@yahoo.com","country"=>"egypt"]);
    }
  //  $visits=Redis::get(6000);
    $time_elapsed_secs = microtime(true) - $start;

   return $visits . "  the time consumed  " .$time_elapsed_secs;

  //  return $db->first()->state . "  the time consumed  " .$time_elapsed_secs;
  */
});

Auth::routes();
Route::middleware(['admin'])->group(function () {
    Route::resource('/areas',"App\Http\Controllers\Area\AreasController");
    Route::resource('/developers',"App\Http\Controllers\Developer\DevelopersController");
    Route::resource('/leads',"App\Http\Controllers\LeadsController");
    Route::resource('/projects',"App\Http\Controllers\Project\ProjectsController");
    Route::resource('/services',"App\Http\Controllers\Service\ServicesController");
    Route::resource('/beds',"App\Http\Controllers\Bed\BedsController");
  Route::resource('/finishings',"App\Http\Controllers\Finishing\FinishingController");
  Route::resource('/levels',"App\Http\Controllers\Level\LevelsController");
  Route::resource('/paths',"App\Http\Controllers\Path\PathsController");
  Route::resource('/propertytypes',"App\Http\Controllers\PropertyType\PropertyTypesController");
  Route::resource('/notifications',"App\Http\Controllers\Notification\NotificationsController");
  Route::resource('/users',"App\Http\Controllers\Users\UserController");
  Route::get('offers',"App\Http\Controllers\Unit\UnitsController@GetOffersAdmin")->name("offers.index");

Route::post('offers/{id}',"App\Http\Controllers\Unit\UnitsController@UpdateOffer")->name("offers.update");
Route::delete('offers/{id}',"App\Http\Controllers\Unit\UnitsController@DeleteOffer")->name("offers.destroy");

Route::get('/search_units',"App\Http\Controllers\Unit\UnitsController@Search")->name("units.search");
Route::get('videos',"App\Http\Controllers\Unit\UnitsController@getvideos")->name("getvideos");
Route::post('videos',"App\Http\Controllers\Unit\UnitsController@storevideo")->name("videos.store");
Route::delete('videos/{id}',"App\Http\Controllers\Unit\UnitsController@deletevideo")->name("videos.destroy");
Route::post('/custom_notifications/{id}',"App\Http\Controllers\Notification\NotificationsController@CustomNotifications")->name("custom_notifications");

Route::post('/created-before', "App\Http\Controllers\Unit\UnitsController@destroyRangeDate")->name('units.destroyRangeDate');
});
Route::group(["middleware"=>'auth'], function () {

  
  
    Route::resource('/contactus',"App\Http\Controllers\ContactUs\ContactUsController");
    Route::get('/filter-units', "App\Http\Controllers\Unit\UnitsController@AdminfilterUnits")->name('filter.units');
    Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');





Route::get('/users/{id}/units',"App\Http\Controllers\Users\UserController@GetUserUnits")->name("users.units.index");

Route::resource('/units',"App\Http\Controllers\Unit\UnitsController");

Route::get('/get_pending_units',"App\Http\Controllers\Unit\UnitsController@GetPendingUnits")->name("get_pending_units");

Route::put('/units_update/{id}',"App\Http\Controllers\Unit\UnitsController@AdminUpdate")->name("units.update");


Route::get("/check_user_existance/{account_name}","App\Http\Controllers\Users\UserController@check_user_existance")->name("check_user_existance");
Route::get('/users_search',"App\Http\Controllers\Users\UserController@Search")->name("users.search");
Route::get('/edit_profile', [App\Http\Controllers\HomeController::class, 'EditProfile'])->name('edit_profile');

Route::get("logout","App\Http\Controllers\Auth\LoginController@logout")->name("logout");
Route::get('/books',"App\Http\Controllers\Book\BooksController@index")->name("books.index");

Route::put('/books/{id}',"App\Http\Controllers\Book\BooksController@update")->name("books.update");
Route::delete('/books/{id}',"App\Http\Controllers\Book\BooksController@update")->name("books.destroy");




});

// «بكام» share links: preview card (title, price, first photo) for WhatsApp/Facebook, then forwards to the site
Route::get('bekam/u/{id}', [\App\Http\Controllers\WebShareController::class, 'unit'])->where('id', '[0-9]+');
Route::get('bekam/p/{id}', [\App\Http\Controllers\WebShareController::class, 'project'])->where('id', '[0-9]+');
// «بكام» search-engine pages (real addresses Google can index) + sitemap
Route::get('bekam/unit/{id}', [\App\Http\Controllers\WebSeoController::class, 'unit'])->where('id', '[0-9]+')->middleware('throttle:240,1,web-seo');
Route::get('bekam/project/{id}', [\App\Http\Controllers\WebSeoController::class, 'project'])->where('id', '[0-9]+')->middleware('throttle:240,1,web-seo');
Route::get('bekam/developer/{id}', [\App\Http\Controllers\WebSeoController::class, 'developer'])->where('id', '[0-9]+')->middleware('throttle:240,1,web-seo');
Route::get('bekam/c/{token}', [\App\Http\Controllers\WebSeoController::class, 'collection'])->where('token', '[A-Za-z0-9]{6,16}')->middleware('throttle:240,1,web-seo');
Route::get('bekam/sitemap.xml', [\App\Http\Controllers\WebSeoController::class, 'sitemap']);
Route::get('robots.txt', [\App\Http\Controllers\WebSeoController::class, 'robots']);
Route::get('bekam/og/c/{token}.jpg', [\App\Http\Controllers\WebShareController::class, 'collectionImage'])->where('token', '[A-Za-z0-9]{6,16}')->middleware('throttle:120,1,web-og');
Route::get('bekam/og/{kind}/{id}.jpg', [\App\Http\Controllers\WebShareController::class, 'image'])->where(['kind' => 'u|p', 'id' => '[0-9]+'])->middleware('throttle:120,1,web-og');
// The same «بكام» pages at the root of www.bekameg.com once the website lives there (BEKAM_SITE_ROOT=1 in .env)
if (\App\Support\PublicUrl::rootMode()) {
    Route::get('u/{id}', [\App\Http\Controllers\WebShareController::class, 'unit'])->where('id', '[0-9]+');
    Route::get('p/{id}', [\App\Http\Controllers\WebShareController::class, 'project'])->where('id', '[0-9]+');
    Route::get('unit/{id}', [\App\Http\Controllers\WebSeoController::class, 'unit'])->where('id', '[0-9]+')->middleware('throttle:240,1,web-seo');
    Route::get('project/{id}', [\App\Http\Controllers\WebSeoController::class, 'project'])->where('id', '[0-9]+')->middleware('throttle:240,1,web-seo');
    Route::get('developer/{id}', [\App\Http\Controllers\WebSeoController::class, 'developer'])->where('id', '[0-9]+')->middleware('throttle:240,1,web-seo');
    Route::get('c/{token}', [\App\Http\Controllers\WebSeoController::class, 'collection'])->where('token', '[A-Za-z0-9]{6,16}')->middleware('throttle:240,1,web-seo');
    Route::get('sitemap.xml', [\App\Http\Controllers\WebSeoController::class, 'sitemap']);
    Route::get('og/c/{token}.jpg', [\App\Http\Controllers\WebShareController::class, 'collectionImage'])->where('token', '[A-Za-z0-9]{6,16}')->middleware('throttle:120,1,web-og');
    Route::get('og/{kind}/{id}.jpg', [\App\Http\Controllers\WebShareController::class, 'image'])->where(['kind' => 'u|p', 'id' => '[0-9]+'])->middleware('throttle:120,1,web-og');
}
