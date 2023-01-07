import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Data, Router } from '@angular/router';
import axios from 'axios';
import { count } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('customerId');
      this.userId = id;
      console.log(params.get('customerId'));
    });

    this.fetchCart(this.action);
    // let headerObj = new HeaderComponent();
    // headerObj.fetchCart();
    // console.log('ok');
  }
  action: any = 'cart';
  userId: any;
  changedQuantity: any = 1;
  cartProducts: any = [];
  productId: any = '';
  updatedPrice = '';
  total: any = 0;
  user: any = '';
  customerId: any = 0;
  fetchCart(action: any) {
    // if (localStorage.getItem('customerId') != '0') {
    this.customerId = localStorage.getItem('customerId');
    console.log(this.customerId);
    this.action = action;
    let formSendCustomerId = new FormData();
    formSendCustomerId.append('id', this.customerId);
    console.log(this.customerId);

    formSendCustomerId.append('action', this.action);
    axios
      .post('http://localhost:8000/api/getCart', formSendCustomerId)
      .then((res) => {
        // console.log(res.data);
        this.cartProducts = res.data;
        // console.log(JSON.stringify(res.data));
        console.log(this.cartProducts);

        let arr = [];
        let i = 0;
        // console.log(i);
        let lengthP = this.cartProducts.length - 1;

        while (lengthP >= 0) {
          arr[i] = this.cartProducts[i].product_id;
          i += 1;
          lengthP -= 1;
        }

        // let form = new FormData();
        // form.append('products', arr);

        // console.log(i);
        // console.log(arr);

        // for (let i of this.cartProducts) {
        //   arr[i] = res.data[i].product_id;
        //   console.log(arr[i]);
        // }
        // arr = res.data.product_id;
        // arr[1] = res.data[1].product_id;
        // console.log(arr);

        this.total = 0;
        for (let i of this.cartProducts) {
          this.total = this.total + i.price * i.quantity;
        }
      })
      .catch((err) => console.log(err));
  }

  updateCart() {
    this.action = 'cart';
    this.fetchCart(this.action);
    // axios
    //   .get('http://localhost:8000/api/updateCart')
    //   .then((res) => {
    //     this.updatedPrice = res.data;
    // for (let i of this.updatedPrice) {

    //   console.log(quantity);
    // // }
    // for (let i of this.cartProducts) {
    //   for (let j of this.updatedPrice) {
    //     let { quantity }: any = j;
    //     i.quantity = quantity;
    //   }
    // }
    // console.log(this.cartProducts);
  }
  changeQuantity(e: any, id: any) {
    this.changedQuantity = parseInt(e.target.value);

    if (this.changedQuantity >= 1) {
      this.productId = id;
      let form = new FormData();
      form.append('productId', this.productId);
      form.append('quantity', this.changedQuantity);

      axios
        .post('http://localhost:8000/api/changeCartQuantity', form)
        .then((res) => {
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert('Quantity of a product must be 1 or greater');
    }
  }

  deleteCartPro(e: any) {
    this.productId = e;
    let form = new FormData();
    form.append('productId', this.productId);
    axios
      .post('http://localhost:8000/api/deleteCart', form)
      .then((res) => {
        this.action = 'delete';
        this.fetchCart(this.action);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  goToCheckout() {
    this.router.navigateByUrl('/checkout');
  }
}
