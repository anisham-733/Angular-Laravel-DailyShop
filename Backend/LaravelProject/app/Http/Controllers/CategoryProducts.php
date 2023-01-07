<?php

namespace App\Http\Controllers;
use DB;
use App\Models\products;
use App\Models\categories;
use Illuminate\Http\Request;

class CategoryProducts extends Controller
{
    public function men(){        
        $catData = categories::where('category_name','Men')->get();
        $id =  $catData[0]->id;        
        $data = products::where('category_id',$id)->get();
        echo json_encode($data); 
    }
    public function allCat(){
        $rows = DB::table('products')->join('category','products.category_id','=','category.id')
        ->select('products.*','category.category_name')->get();
        echo json_encode($rows);
    }
}
