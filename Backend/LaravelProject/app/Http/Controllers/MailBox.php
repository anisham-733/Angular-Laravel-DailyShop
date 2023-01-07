<?php

namespace App\Http\Controllers;
use App\Models\users;
use App\Models\orders;
use App\Models\products;
use App\Models\shipping_details;
use Illuminate\Http\Request;


class MailBox extends Controller
{
    //
    public function send(Request $res){
        // echo $res->id;
        $orderDetails = orders::where('customer_id','=',$res->id)->select('id','total_payment','payment_mode','product_ids')->get();
        // echo $orderDetails[0]->product_ids;
        $ids = json_decode($orderDetails[0]->product_ids);
        $prodDetails=[];
    
            foreach($ids as $id){
                $new = products::where('id','=',$id)->select('product_name','price')->get();
                $prodDetails[] = $new[0];
                // echo $prodDetails;
            } 
         
        $addressDetails = shipping_details::where('customer_id','=',$res->id)->select('address','city','zip_code','contact_number')->get();
        echo $addressDetails;

        $details = [
            'title' => 'Mail from Daily Shop.com',
            'body' => 'This is for testing email using smtp',
            'name'=> $res->name,
            'orderId'=>$orderDetails[0]->id,
            'total_payment'=>$orderDetails[0]->total_payment,
            'payment_mode'=>$orderDetails[0]->payment_mode,
            'productDetails'=>$prodDetails,
            'address'=>$addressDetails[0]->address,
            'city'=>$addressDetails[0]->city,
            'zipCode'=>$addressDetails[0]->zip_code,
            'cno'=>$addressDetails[0]->contact_number
        ];
        
       
        \Mail::to('anishamahajan732001@gmail.com')->send(new \App\Mail\MyTestMail($details,json_encode($prodDetails)));
        dd("Email is Sent.");
    }
}
