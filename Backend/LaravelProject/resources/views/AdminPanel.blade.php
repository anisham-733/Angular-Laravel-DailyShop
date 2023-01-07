<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Dashboard</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.0.0-alpha.1/axios.min.js"></script>
</head>
<body>
    <?php
    if (session()->has('empty'))
    {     
    echo "<script>alert('".session()->get('empty')."')</script>";
    }
    if (session()->has('loggedIn'))
    {     
    echo "<script>alert('".session()->get('loggedIn')."')</script>";
    }
    ?>
 
    <div class="container-fluid">
        <div class="row bg-success justify-content-center
                    align-items-center" style="height:80px">
                <div class="col-sm-5"></div>
                <div class="col-sm-5 display-1 h2">
                    <h1>DASHBOARD</h1>
                </div>     
        </div>
      
        <form action = 'login' method = 'POST' class="form-horizontal form-group-lg">
            @csrf
          <div class="col-lg-4 col-lg-offset-4" >
            <input type="email" class = "form-control"  name="username" class="form-control input-lg" 
             placeholder="Enter email-address" value = ''>
          </div> 
      
          <div class="col-lg-4 col-lg-offset-4" >
            <input type="password" class = "form-control" name="password" class="form-control input-lg"
             placeholder="Enter password" value="">
          </div> 
      <br>
          <div class="form-group">
            <div class="col-sm-offset-3 col-xs-5">
              <div class="text-center mr-2">
              <input type="submit" class = "btn btn-primary" name="Login" value="Login"/>
              
              </div>
            </div>
          </div>
        </form>
    </div>
       
</body>
</html>