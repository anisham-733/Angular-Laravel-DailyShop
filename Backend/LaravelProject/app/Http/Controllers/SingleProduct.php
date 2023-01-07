<?php
namespace App\Http\Controllers;
use DB;
use App\Models\products;
use App\Models\categories;
use Illuminate\Http\Request;

class SingleProduct extends Controller
{
    public function fetch(Request $res){
        // echo $res->id;
        $product = products::where('id',$res->id)->get();
        $cat = categories::all();

        foreach($product as $row){
            foreach($cat as $row2){
                if($row['category_id'] == $row2['category_id']){
                    $row['category_name'] = $row2['category_name'];
                }
            }
        }

        // echo $product;
        // echo $product[0]->category_id;
        
        // $id = $product[0]->category_id;
        // echo gettype($id);
        // $product1 = DB::table('products')->where('products.product_id',$res->id)->join('category','category.category_id','=',(int)$id)
        // ->select('products.*','category.category_name')->get();
        echo json_encode($product);

    }
}
