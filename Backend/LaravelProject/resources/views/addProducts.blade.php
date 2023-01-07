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
   
    if (session()->has('fileTypes'))
    {     
    echo "<script>alert('".session()->get('fileTypes')."')</script>";
    }
    ?>
 
    <div class="container-fluid">
        <div class="row bg-success justify-content-center
                    align-items-center" style="height:80px">
                <div class="col-sm-5"></div>
                <div class="col-sm-5 display-1 h2">
                    <h1>Add Products</h1>
                </div>     
        </div>
        <form  action = 'addPro' method = 'POST' class="form-horizontal form-group-lg"  enctype="multipart/form-data">     
                @csrf
            <label class="control-label col-xs-2" name="title">Product name</label> 
            <div class="col-xs-4">
            <input name = "title" class="form-control input-lg" type="text">
            </div>    
            <label class="control-label col-xs-1 " name="desc">Product description</label> 
            <div class="control-label col-xs-4">
            <input name = "desc" class="form-control input-lg" type="text">
            </div>   
            <label class="control-label col-xs-2" name="price">Product price</label> 
            <div class="col-xs-4">
            <input name = "price" class="form-control input-lg" type="text">
            </div> 
            <label class = "control-label col-xs-1" name="cat">Category</label>
            <div class="control-label col-xs-4">
            <select name="optionCat" class="form-control input-lg" >
                <option name ="choose" selected disabled>Choose</option>
                @foreach ($rows as $row)
                <option name = "cat_value">{{$row->category_name}}</option>
                @endforeach
            </select>
            </div>
           
            <label class="form-label control-label col-xs-2" for="customFile">Upload Product image</label>
            <div class="col-xs-4">
            <input name = "uploadFile" type="file" class="form-control input-lg" id="customFile" />
            </form>
            <br>
            
            <div class="col-xs-4">
            <input type="submit" name = "btn"  class="btn btn-primary" value= "Add Product">
            </div>      