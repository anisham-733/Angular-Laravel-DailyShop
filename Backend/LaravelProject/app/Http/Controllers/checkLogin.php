<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class checkLogin extends Controller
{
    //
    public function check() {
        
        // session_start();
        // $val = Session::get('user');
    
        // echo $val;
        if (isset($_SESSION['user']))
        {
            echo 'ok';
            return redirect('/products');
        }
        else {
            echo 'not ok';
            return redirect('/adminLogin');
        }
    }
}
