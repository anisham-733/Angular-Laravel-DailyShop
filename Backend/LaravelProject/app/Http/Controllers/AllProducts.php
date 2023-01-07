<?php

namespace App\Http\Controllers;
use DB;
use App\Models\products;
use Illuminate\Http\Request;

class AllProducts extends Controller
{
    //
    public function fetchall(Request $res){
        $catId = $res->catId;
        $products = products::where('category_id',$catId)->get();
        echo json_encode($products);

    }
}
