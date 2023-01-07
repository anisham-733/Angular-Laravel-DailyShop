<?php

namespace App\Http\Controllers;
use DB;
use App\Models\products;
use App\Models\categories;
use Illuminate\Http\Request;

class Search extends Controller
{
    public function search(Request $res){
        $result = DB::table('products')->where('products.product_name','like',$res->value.'%')->join('category','products.category_id','=','category.category_id')
        ->select('products.*','category.category_name')->get();
        echo json_encode($result);
    }
    public function getId(Request $res){
        // echo $res->name;
        $catId = categories::where('category_name',$res->category)->get();
        $result = products::where(['category_id'=>$catId[0]->category_id,'product_name'=>$res->name])->select('product_id')->get();
        echo json_encode($result);
    }
}
