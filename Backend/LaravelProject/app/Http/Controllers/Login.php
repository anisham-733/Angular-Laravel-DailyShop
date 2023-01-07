<?php

namespace App\Http\Controllers;
use DB;
use Session;
use App\Models\admin;
use Illuminate\Http\Request;

class Login extends Controller
{
    public function login(Request $res) {
        session_start();
        Session::put('user',$res->username);
        if($res->username!='' and $res->password!=''){            
            $checkUser = admin::where(['username'=>$res->username, 'password'=>$res->password])->get();             
                if(count($checkUser)!=0) 
                {
                    return redirect('/products')->with('loggedIn', $res->username.' successfully logged in');
                }
                else{
                    return redirect('/adminLogin')->with('loggedIn', $res->username.' Login credentials not successfull');
                }
            }
            else{
                return redirect('/adminLogin')->with('empty','Fields are empty');
            }

        }
    }

