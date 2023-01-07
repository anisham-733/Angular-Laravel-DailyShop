<?php

namespace App\Http\Controllers;
use DB;
use App\Models\categories;
use Illuminate\Http\Request;

class AddCategories extends Controller
{
    public function add(Request $res) {
        if($res->title!=''){
            $checkCat = categories::where('category_name',$res->title)->get();
            if(count($checkCat)==0){
                $category = new categories();
                $category->category_name = $res->title;
                $category->save();
                return redirect('/products')->with('cat_added',$res->title.'category added successfully');
            }
            else{
                return redirect('/addCategory')->with('exists','Category '.$res->title.' already exists');
            }
        }
        else{
            return redirect('/addCategory')->with('empty','Field is empty');

        }
    }
}
  

