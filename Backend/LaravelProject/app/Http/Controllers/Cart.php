<?php

namespace App\Http\Controllers;
use DB;
use Illuminate\Http\Request;
use App\Models\cart1;
use App\Models\products;
class Cart extends Controller
{
    public function add(Request $res){
       
        $check = cart1::where('id',$res->productId)->get();
            if(count($check)==0){
                $data = new cart1();
                $data->id = $res->productId;
                $data->quantity = $res->quantity;
                $data->save();
                echo "Product added to Cart successfully";
            }
            else{
                echo "Product already exists in cart";
            }
    }

    public function getCart(Request $res){
        // echo $res->id;
        $arr1 = [];
        if($res->id == 0){
            $cart = DB::table('cart_products')->select('cart_products.id')->get();
            // echo $cart;
            foreach(json_decode($cart) as $row){
                $arr1[] = $row->id;            
            }
            $arr['id'] = $arr1;
            $anonymousUser = DB::table('customers')->where('id','=',0)
                ->update(['customers.product_ids'=>$arr['id']]);
        } 

            $arr5 = [];
            $cart = DB::table('cart_products')->select('cart_products.id')->get();
            if(count($cart)!=0){
                foreach(json_decode($cart) as $row){
                    $arr5[] = $row->id;            
                }
                $arr['id'] = $arr5;
                $anonymousUser = DB::table('customers')->where('customers.id','=',$res->id)
                ->update(['customers.product_ids'=>$arr['id']]);
            // ///////////////////////////////////////////////
            }

            $productIds = DB::table('customers')->where('id',$res->id)->select('product_ids')->get();
            $arr4 = [];
            foreach(json_decode($productIds[0]->product_ids) as $row){
                $checkData = DB::table('cart_products')->where('cart_products.id',$row)->get();
                if(count($checkData)==0 and $res->action=='cart'){
                // echo $row;
                $data = new cart1();
                $data->id = $row;
                $data->quantity = 1;
                $data->save();
                }
                $cartProducts = DB::table('products')->where('products.id','=',$row)
                ->join('cart_products','cart_products.id','=','products.id')
                ->select('products.*','cart_products.quantity')->get();

                $arr4[] = $cartProducts[0];  
            }     
            echo json_encode($arr4);
       
    }

    public function changeCart(Request $res){
        $rows = DB::table('cart_products')->where('cart_products.id',$res->productId)
        ->update(['cart_products.quantity'=>$res->quantity]);
        echo $rows;
    }
    public function deleteCart(Request $res){
        $rows = DB::table('cart_products')->where('cart_products.id',$res->productId)->delete();      
        echo $rows;
    }
    public function deleteAll(){
        $rows = DB::table('cart_products')->delete();
        echo $rows;
    }
}
