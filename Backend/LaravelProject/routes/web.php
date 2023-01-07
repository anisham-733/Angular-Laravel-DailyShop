<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Register;
use App\Http\Controllers\Login;
use App\Http\Controllers\AddProducts;
use App\Http\Controllers\AddCategories;
use App\Http\Controllers\checkLogin;
use App\Http\Controllers\AdminLogin;
use App\Http\Controllers\getCategory;
use App\Http\Controllers\Customers;

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
// Route::get('/',[checkLogin::class,'check']);
// Route::get('/', function() {
//     return view('AdminPanel');
// });
Route::get('/adminLogin',[AdminLogin::class,'login']);
Route::post('/login',[Login::class,'login']);
Route::get('/products',[AddProducts::class,'showRecord']);
// Route::get('/addProduct', [getCategory::class,'getCat']);
Route::get('/addProduct',[getCategory::class,'getCat']);
Route::get('/addCategory', function() {
    return view('addCategories');
});

Route::post('/addPro',[AddProducts::class,'add']);
Route::post('/addCat',[AddCategories::class,'add']);
Route::post('/addIdCustomer',[Customers::class,'addProId']);

Route::post('/signup',[Register::class,'signup']);
Route::post('/getCartProducts',[Customers::class,'getProd']);
Route::post('/getCart',[Cart::class,'getCart']);

Route::group(['prefix' => 'admin'], function () {
    Voyager::routes();
});


