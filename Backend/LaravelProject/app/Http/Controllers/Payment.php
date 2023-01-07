<?php

namespace App\Http\Controllers;
use DB;
use App\Models\users;
use App\Models\orders;
use App\Models\products;
use App\Models\shipping_details;
use Stripe\Stripe;

use Illuminate\Http\Request;
use Ixudra\Curl\Facades\Curl;

class Payment extends Controller
{
    public function pay(Request $res){       
      $secret_key = 'sk_test_51LQn0JSAzJ4jx2lhNDU9nxeBPkpF12i55S0r4EztppLjHuln0V9IhUTPWVLkg2firgRs2jYZnLXkztcMqgG63WOa00viPRV3AN';
      
      $token = Curl::to('https://api.stripe.com/v1/tokens')
      ->withBearer($secret_key)
      ->withData( array(
        'card[number]'=>$res->cardNumber,
        'card[exp_month]'=>$res->expiryMonth,
        'card[exp_year]'=>$res->expiryYear,
        'card[cvc]'=>$res->cvc))
        ->post();
      $token1 = json_decode($token)->id;
    //   echo json_encode($token);

      $response_confirm = Curl::to('https://api.stripe.com/v1/payment_intents')
        ->withBearer($secret_key)
        ->withData( array(
          'amount'=>$res->amount*100,
          'currency'=>'inr',
          'payment_method_types[]'=>'card'
        ) )
        ->post();
        $create_id = json_decode($response_confirm)->id;
        
        $confirm = Curl::to('https://api.stripe.com/v1/payment_intents/'.$create_id.'/confirm')
        ->withBearer($secret_key)
        ->withData( array(
        'payment_method_data' => [
            'type' => 'card',
            'card' => [
            'token' => $token1
                ]
            ],
        'return_url' => 'http://localhost:4200/checkout/'.$create_id
        )
    )
    ->post();
    echo json_encode($confirm);
    }
    public function getStatus(Request $res){
        $secret_key = 'sk_test_51LQn0JSAzJ4jx2lhNDU9nxeBPkpF12i55S0r4EztppLjHuln0V9IhUTPWVLkg2firgRs2jYZnLXkztcMqgG63WOa00viPRV3AN';
        $status = Curl::to('https://api.stripe.com/v1/payment_intents/'.$res->id)
        ->withBearer($secret_key)->post();
        echo json_encode($status);
    }
    public function place(Request $res){
      // echo $res->customerId;
      // echo $res->mode;
      $retrieve = users::where('id','=',$res->customerId)->get();
      
      $order = new orders();
      $order->customer_id = $retrieve[0]->id;
      $order->product_ids = $retrieve[0]->product_ids;
      $order->payment_mode = $res->mode;
      $order->total_payment = $res->total_payment;
      $order->status = $res->status;
      $order->save();
      $delAfterOrder = users::where('id','=',$res->customerId)->update(['product_ids'=>'[]']);
      echo 'ok';

    }
    public function editOrderStatus(Request $res){
      $updateStatus = orders::where('id','=',$res->orderId)
      ->update(['status'=>$res->status]);
      echo $updateStatus;

    }
    public function confirm(Request $res){
      $intId = (int)$res->id;
      $orderDet = DB::table('orders')->where('orders.customer_id','=',$intId)
                ->join('shipping_details','shipping_details.customer_id','=','orders.customer_id')
                ->select('orders.*','shipping_details.*')->get();
                
      $arr['order'] = $orderDet;
      $ids = $orderDet[0]->product_ids;
      // // echo $ids;
      foreach(json_decode($ids) as $id){
        $new = products::where('id','=',$id)->select('product_name','description','price','product_image')->get();
        $p[] = $new;
      }
      $arr['p'] = $p;
      echo json_encode($arr);
    }
}
