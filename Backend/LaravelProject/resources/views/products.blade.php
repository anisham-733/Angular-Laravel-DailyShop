<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" >
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Dashboard</title>
    <style>
        td,th{
            vertical-align: middle;
        }
    </style>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.0.0-alpha.1/axios.min.js"></script>
    
</head>
<body>
    <?php
    session_start();
    if (session()->has('empty'))
    {     
    echo "<script>alert('".session()->get('empty')."')</script>";
    }
    if (session()->has('loggedIn'))
    {     
    echo "<script>alert('".session()->get('loggedIn')."')</script>";
    }
    if (session()->has('cat_added'))
    {     
    echo "<script>alert('".session()->get('cat_added')."')</script>";
    }
    if (session()->has('product_added'))
    {     
    echo "<script>alert('".session()->get('product_added')."')</script>";
    }

    if (session()->has('folder'))
    {     
    echo "<script>alert('".session()->get('folder')."')</script>";
    }
    ?>
    
    <div class="container-fluid">
        <div class="row bg-success justify-content-center
                    align-items-center" style="height:80px">
                <div class="col-sm-5"></div>
                <div class="col-sm-5 display-1 h2">
                    <h1>Products <?php echo(Session::get('user'));?></h1>
                </div>  
                <div class="col-sm-15 display-1 h5">
                    <button type="button" style="float: right; margin-right: 1rem;"
                    onclick = "logOut()">
                    <img src = "{{asset('images/logout.png')}}" alt="" width="50px" height="50px" > 
                    </button>
                    </div>   
        </div>
        
        <button type="button" class="btn btn-primary" name = "add" 
        onclick = "window.location='{{ url('/addProduct') }}'" style="float: right">Add Product</button>
        
        <button type="button" class="btn btn-primary" name = "add" 
        onclick = "window.location='{{ url('/addCategory') }}'" style="float: right">Add Category</button>

        <br>
        <div class="table-responsive-md">
        <table class="table table-striped" cellpadding="5px" cellspacing="5px" >
            <tr>
                <th scope="col">Product ID</th>
                <th>Product name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Product image</th>
                <th>Category name</th>
            </tr>
            @foreach($rows as $row)
            <tr>
                <td>{{$row->product_id}}</td>
                <td>{{$row->product_name}}</td>
                <td number = "1" style="white-space: wrap;">{{$row->description}}</td>
                <td>{{$row->price}}</td>
                <td><img src = "./images/<?php echo $row->product_image; ?>" width="100px" height="150px"></td>
                <td>{{$row->category_name}}</td>
                <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target ="#myModal" 
                    onclick = 'edit(`<?php echo json_encode($row);?>`)'>Edit</button></td>
                <td><button type="button" class="btn btn-primary"
                     onclick='delete1(`<?php echo json_encode($row);?>`)'>Delete</button></td>
            </tr>
            @endforeach
        </table>
        <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog modal-lg">
                {{-- modal content --}}
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Edit your Product</h4>
                    </div>
                    <div class="modal-body">
                        <form enctype="multipart/form-data">
                            @csrf
                        <input id = "productId" name="prouctId" class="form-control input-lg" value="" type="text" disabled>
                        <input id="productName" name="productName"  class="form-control input-lg" value="" type="text" >
                        <input id="Description" name="Description" class="form-control input-lg" value="" type="text" >
                        <input id = "price" name="price" class="form-control input-lg" value="" type="text">
                        <input id ="uploadFile" name = "uploadFile"
                         accept="image/jpeg, image/png, image/jpg" onchange="showFile()" type="file"
                          class="form-control input-lg"/>
                        <select id = "optionCat" name="optionCat" class="form-control input-lg" >
                            <option name ="choose" selected disabled>Choose</option>
                            <option name = "cat_value">Men</option>
                            <option name = "cat_value">Women</option>
                            <option name = "cat_value">Kids</option>
                            <option name = "cat_value">Sports</option>
                            <option name = "cat_value">Digital</option>
                            <option name = "cat_value">Furniture</option>
                            <option name = "cat_value">Electronics</option>
                            <option name = "cat_value">Others</option>
                        
                        </select>
                        </form>
                    </div>
                    <form enctype="multipart/form-data">
                        @csrf;
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" onclick = "update()">Save</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal" >Close</button>
                    </div>
                    </form>
                
                </div>
                </div>
            </div>
        </div>
        <script>
            fileUrl='';
            old_image='';


            function showFile(){
                var file = document.querySelector('#uploadFile').files[0];
                var reader = new FileReader();
                reader.onload = function (event) {
                    fileUrl = reader.result;
                }
                reader.readAsDataURL(file);
            }


            function edit(row){                
                var selected_row = JSON.parse(row);
                var product_id = selected_row.product_id;
                var product_name = selected_row.product_name;
                var description = selected_row.description;
                var price = selected_row.price;
                var product_image = selected_row.product_image;
                old_image = selected_row.product_image;
                
                var category_name = selected_row.category_name;
                console.log(category_name);
                document.getElementById('productId').value = product_id;
                document.getElementById('productName').value = product_name;
                document.getElementById('Description').value = description;
                document.getElementById('price').value = price;
                product_image = document.getElementById('uploadFile');

                document.getElementById('optionCat').value = category_name;

            }
            function delete1(row){
                
                let form = new FormData();
                var selected_row = JSON.parse(row);
                console.log(selected_row);
                let product_id = selected_row.product_id;
                let product_image = selected_row.product_image;              
                form.append('productId',product_id);
                form.append('productImage',product_image);
              
                axios
               .post('/api/deleteData', form,{
                headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
               })
               .then((res) => {
                    alert("Deleted  successfully");
                    location.reload();
              })
              .catch((err) => {
                console.log(err);
              });
            }


            function update(){
                let form = new FormData();
                let product_id  = document.getElementById('productId').value;
                let product_name = document.getElementById('productName').value;
                let description = document.getElementById('Description').value;
                let price = document.getElementById('price').value;
                let product_img = document.getElementById('uploadFile').value;
                let category_name = document.getElementById('optionCat').value;
                // console.log(this.fileUrl);
                form.append('productId',product_id);
                form.append('productName', product_name);
                form.append('description', description);
                form.append('price',price);
                form.append('productImage',product_img);
                form.append('ImageUrl',this.fileUrl);
                form.append('category_name',category_name);
                form.append('old_image',this.old_image);

                axios
               .post('/api/update', form)
               .then((res) => {
                    alert("Updated successfully");
                    location.reload();
              })
              .catch((err) => {
                    alert('Error encountered Try again and complete all the fields');
              });
            }

            function logOut(){
                <?php
                
                // unset($_SESSION['user']);
                Session::flush('user');
                // $val = Session::get('user');
                // echo $val;

                ?>
                window.location.href = '/adminLogin';


            }
            
        </script>
        </div>
    </div>


      