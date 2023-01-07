<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Register;
use App\Http\Controllers\CategoryProducts;
use App\Http\Controllers\SingleProduct;
use App\Http\Controllers\AllProducts;
use App\Http\Controllers\Cart;
use App\Http\Controllers\Payment;
use App\Http\Controllers\Search;
use App\Http\Controllers\AddProducts;
use App\Http\Controllers\Customers;
use App\Http\Controllers\MailBox;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('signup',[Register::class,'signup']);
Route::post('login',[Register::class,'login']);
Route::get('CategoryMen',[CategoryProducts::class,'men']);
Route::get('Categories',[CategoryProducts::class,'allCat']);
Route::post('SingleProduct',[SingleProduct::class,'fetch']);
Route::post('FetchRelated',[AllProducts::class,'fetchall']);
Route::post('addToCart',[Cart::class,'add']);
Route::post('getCart',[Cart::class,'getCart']);
Route::get('deleteAllCart',[Cart::class,'deleteAll']);

Route::post('changeCartQuantity',[Cart::class,'changeCart']);
Route::post('deleteCart',[Cart::class,'deleteCart']);
Route::post('payment',[Payment::class,'pay']);
Route::post('paymentStatus',[Payment::class,'getStatus']);
Route::post('/orders',[Payment::class,'place']);
Route::post('/ordersConfirm',[Payment::class,'confirm']);
Route::post('getSearchResult',[Search::class,'search']);
Route::post('getId',[Search::class,'getId']);
Route::post('/shipping',[Customers::class,'saveShippingDetails']);

Route::get('allProducts',[CategoryProducts::class,'allCat']);
Route::post('/deleteData',[AddProducts::class,'deleteRecord']);
Route::post('/update',[AddProducts::class,'updateRecord']);
Route::post('/addIdCustomer',[Customers::class,'addProId']);
Route::post('/getCartProducts',[Customers::class,'getProd']);

Route::post('/view',[Customers::class,'getProduct']);
Route::post('/edit',[Payment::class,'editOrderStatus']);
Route::post('/sendMail',[MailBox::class,'send']);

