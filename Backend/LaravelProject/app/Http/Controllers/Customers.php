<?php

namespace App\Http\Controllers;
use DB;
use App\Models\users;
use App\Models\products;
use App\Models\shipping_details;
use Illuminate\Http\Request;

class Customers extends Controller
{
    //
    public function addProId(Request $res){
        $result = users::where('username',$res->user)->update(['product_ids'=>$res->ids]);
        if (json_encode($result) == 1){
            $customerId = users::where('username',$res->user)->select('id')->get();
            echo json_encode($customerId);
        }
    }
    
    public function getProd(Request $res){
        foreach(json_decode($res->ids) as $row){
            // echo $row." ";
            $cartProducts = DB::table('products')->where('products.id','=',$row)->get();
            $arr[$row] = $cartProducts;
        }     
        echo json_encode($arr);
    }

    public function saveShippingDetails(Request $res){
        // echo $res->country;
        $userDetails = new shipping_details();
        $userDetails->customer_id = $res->customer_id;
        $userDetails->first_name = $res->first_name;
        $userDetails->last_name = $res->last_name;
        $userDetails->email_address = $res->email_address;
        $userDetails->contact_number = $res->contact_number;
        $userDetails->address = $res->address;
        $userDetails->country = $res->country;
        $userDetails->apartment = $res->apartment;
        $userDetails->city = $res->city;
        $userDetails->state = $res->state;
        $userDetails->zip_code = $res->zipcode;
        $userDetails->notes = $res->notes;
        $userDetails->save();
    }

    public function getProduct(Request $res){
        $p = json_decode($res->product_id);
        $newArr = [];
        foreach($p as $row){
            $data = products::where('id','=',$row)->select('product_name','price','product_image')->get();
            $newArr[] = $data[0];
        }
        print_r(json_encode($newArr));
        
    }
}
