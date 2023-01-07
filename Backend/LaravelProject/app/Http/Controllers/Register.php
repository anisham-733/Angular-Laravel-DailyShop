<?php

namespace App\Http\Controllers;
use DB;
use App\Models\users;
use Illuminate\Http\Request;

class Register extends Controller
{
    public function signup(Request $res) {
        if($res->username!='' and $res->password!=''){
            $arr = [];
            $checkData = users::where('username', $res->username)->get();
            if (count($checkData) == 0) {
                $prodIds = DB::table('cart_products')->select('cart_products.id')->get();
                // Session::put("user", $res->username);
                $data = new users();
                $data->username = $res->username;
                $data->password = $res->password;
                
                // echo json_encode($prodIds);
                // print_r(json_decode($prodIds));
               
                // foreach(json_encode($prodIds[0]->array_product_id) as $row){
                    // $data->product_ids[$row]= $prodIds[$row]->product_id;
                    // echo $row;
                // }
                $data->save();
                // $arr = [];
                $arr['user'] = $res->username." successfully registered";
                $arr['flag'] = true; 
                $arr1 = [];
                foreach(json_decode($prodIds) as $row){    
                    $arr1[] = $row->id;
                }
                $anonyDel = DB::table('customers')->where('customers.id','=',0)->update(['customers.product_ids'=> '0']);

                $arr['ids'] = $arr1;

            }
            else {
                $arr['user'] = $res->username." user already exists";
                $arr['flag']=false;
            }
        }
        else{
            $arr['user'] = "Fields are empty";
            $arr['flag'] = 'empty';           
        }
        return json_encode($arr);
        }

        public function login(Request $res) {
            if ($res->username != '' and $res->password != '') {
                $arr = [];
                $checkUser = users::where(['username'=>$res->username, 'password'=>$res->password])->get();             
                
                if(count($checkUser)!=0) 
                {
                    $arr['user'] = $res->username." logged in successfully";
                    $arr['flag'] = true;
                    $arr['userId'] = $checkUser[0]->id;
                    // $arr['prodId'] = $checkUser[0]->product_ids;
                }
                else{
                    $arr['user'] =  "Login credentials not successfull";
                    $arr['flag'] = false;
                }
            }
            else{
                $arr['user'] = 'Fields are empty';
                $arr['flag'] = 'empty';
            }
            return json_encode($arr);
        }
    }
    

