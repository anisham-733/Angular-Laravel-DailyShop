<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminLogin extends Controller
{
    //
    public function login(){
        return view('AdminPanel');
    }
}
