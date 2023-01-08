<?php

namespace App\Http\Controllers;
use DB;
use App\Models\products;
use App\Models\categories;
use Illuminate\Http\Request;

class AddProducts extends Controller
{
    public function upload(){
        $filename = $_FILES["uploadFile"]["name"];
        $tempname = $_FILES["uploadFile"]["tmp_name"];
        $folder = "../public/images/".$filename;
        echo $folder;
            
        $supported_image = array('gif','jpg','jpeg','png');         
        $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
        if (in_array($ext, $supported_image)){
            return array($filename,$folder,$tempname,true);
        }
        return array($filename,$folder,$tempname,false);
    }

    
    public function add(Request $res ){
        // echo $res;
        if($res->title!='' and $res->desc!='' and $res->price!='' and $res->optionCat!='' and $res->uploadFile!='')
        {
            // **********IMAGE UPLOAD ****************
            $result = $this->upload();
            
            $filename = $result[0];
            $folder=$result[1];
            $tempname = $result[2];
            $flag = $result[3];
            // check file type 
            if ($flag){
                $product = new products();
                $product->product_name = $res->title;
                $product->description = $res->desc;
                $product->price = $res->price;
                $product->product_image = $filename;
                
                $catData = categories::where('category_name',$res->optionCat)->get();
                $id =  $catData[0]->id;
                
                $product->category_id = $id;
                if (move_uploaded_file($tempname, $folder)) {          
                    $product->save();
                    // join tables
                    $rows = DB::table('products')->join('category','products.category_id','=','category.id')
                    ->select('products.*','category.category_name')->get();
                    
                    return redirect('/products')->with(['product_added'=>$res->title.' product added successfully', 'folder'=>$folder,'rows'=>$rows]);
                } else {
                    echo "<h3>  Failed to upload image!</h3>";
                }
            }
            else{
                return redirect('/addProduct')->with('fileTypes','Only gif, jpg , jpeg, png file types are allowed');
            }       
        }
        else{
            return redirect('/addProduct')->with('empty','Fields are empty');
        }        
    }

   
    public function showRecord(){
        $rows = DB::table('products')->join('category','products.category_id','=','category.id')
                    ->select('products.*','category.category_name')->get();
        return view('/products')->with('rows',$rows);        
    }


    public function updateRecord(Request $res){
                
        unlink('./images/'.$res->old_image);
        $filename =  substr($res->productImage,12);
        $url = $res->ImageUrl;
        file_put_contents('./images/'.$filename, file_get_contents($url));
                
        if ($res->productName!='' and $res->description!='' and $res->price!='' and $res->productImage!=''
         and $res->category_name!='')
        {
            // echo $res->productName;
            $catData = categories::where('category_name',$res->category_name)->get();
            $id =  $catData[0]->category_id;
            $updateData = products::where('id',$res->productId)
                ->update(['product_name'=>$res->productName, 'description'=>$res->description,
                'price'=>$res->price,'product_image'=>$filename,'category_id'=>$id]);
            echo $updateData;          
        } 
        else{
                echo 'not ok';
        }        
    }

    public function deleteRecord(Request $res){
        echo $res->productId;
        unlink('./images/'.$res->productImage);
        $data = products::where('id',$res->productId)->delete();
        return $data;
    }
}
