<!DOCTYPE html>
<html>
<head>
    <title>ItsolutionStuff.com</title>
</head>
<body>
    <h4>Dear {{$details['name']}},</h4> 
    <h3>Your <b>ORDER "DLSHCOMUI789{{$details['orderId']}}"</b> has been successfully confirmed.</h3>
    <h4>Your total Payable amount is Rs. <b> {{$details['total_payment']}}</b>.
    <br>Mode of Payment - {{$details['payment_mode']}}</h4>
    <h4>Your order will be delivered at address - {{$details['address']}} , {{$details['zipCode']}} within the next 7-9 days. </h4>
    <h4>Your Customer Care number is 1234567865. Feel free to contact here anytime whenever you need help regarding your order.</h4>

    <h4>Thank you for shopping with us !!</h4>
    <h4><span style="color: rgb(0, 123, 255);">Regards</span>
        <br>
        <b>Daily Shop</b>
    </h4>

</body>
</html>