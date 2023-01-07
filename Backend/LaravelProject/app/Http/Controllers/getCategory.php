<?php

namespace App\Http\Controllers;
use DB;
use App\Models\categories;
use Illuminate\Http\Request;

class getCategory extends Controller
{
   public function getCat(){
    $rows = DB::table('category')->select('category.category_name')->get();
    return view('addProducts')->with('rows',$rows);
   }

}

