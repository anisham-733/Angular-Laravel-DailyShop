import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import axios from 'axios';
import { MyServiceService } from '../my-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private MyServiceService: MyServiceService
  ) {}

  ngOnInit(): void {
    // this.customerId = 0;
    // if (localStorage.getItem('customerId') != '0') {

    // // console.log(this.cartRoute);
    localStorage.setItem('customerId', '0');
    if (!localStorage.getItem('customerId')) {
      this.customerId = localStorage.getItem('customerId');
      // console.log(this.customerId);

      this.cartRoute = 'cart/' + this.customerId;
      // console.log(this.customerId);
    } else {
      localStorage.setItem('customerId', '0');
      this.customerId = 0;
      this.cartRoute = 'cart/' + this.customerId;
      // console.log(this.customerId);
    }
    console.log(this.customerId);
    if (!this.customerId) {
      axios
        .get('http://localhost:8000/api/deleteAllCart')
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // this.customerId = localStorage.setItem('customerId', '0');
    // this.cartRoute = 'cart/' + this.customerId;

    // this.fetchCart();
  }
  customerId: any = 0;
  cartRoute: any = '';
  myControl = new FormControl('');
  total: any = 0;
  cart: any = [];
  count: any = 0;
  productId: any = '';
  Value: any = '';
  searchResult: any = '';
  searchCount: any = 0;
  selectedValue1: string = '';
  splitValue: any = '';
  productName: string = '';
  catName: string = '';
  selectedProductId: any;
  fetchCart() {
    console.log(this.count);
    this.count = 0;
    // this.count = this.MyServiceService.setValue(
    // this.MyServiceService.getValue()
    // );
    let form2 = new FormData();
    form2.append('id', this.customerId);
    axios
      .post('http://localhost:8000/api/getCart', form2)
      .then((res) => {
        console.log(res.data);
        this.cart = res.data;
        this.total = 0;

        for (let i of this.cart) {
          this.count += 1;
          // this.MyServiceService.quantity += 1;

          // this.count =
          this.total = this.total + i.price * i.quantity;
        }
        console.log(this.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  selectedValue() {
    this.selectedValue1 = this.Value;
    this.splitValue = this.selectedValue1.split(' ');
    if (this.splitValue.length == 4) {
      this.productName = this.splitValue[0] + ' ' + this.splitValue[1];
      this.catName = this.splitValue[3];
    } else {
      this.productName = this.splitValue[0];
      this.catName = this.splitValue[2];
    }

    let form = new FormData();
    form.append('name', this.productName);
    form.append('category', this.catName);
    axios
      .post('http://localhost:8000/api/getId', form)
      .then((res) => {
        this.selectedProductId = res.data[0].product_id;
        this.router.navigateByUrl('/singleProd/' + this.selectedProductId);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  searchValue() {
    let form = new FormData();
    form.append('value', this.Value);
    axios
      .post('http://localhost:8000/api/getSearchResult', form)
      .then((res) => {
        this.searchCount = res.data.length;
        if (res.data.length != 0) {
          this.searchResult = res.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // fetchCart() {
  //   axios
  //     .get('http://localhost:8000/api/getCart')
  //     .then((res) => {
  //       this.cart = res.data;
  //       this.total = 0;
  //       this.count = this.MyServiceService.setValue(
  //         this.MyServiceService.getValue()
  //       );

  //       for (let i of this.cart) {
  //         this.count += 1;
  //         this.MyServiceService.quantity += 1;

  //         // this.count =
  //         this.total = this.total + i.price * i.quantity;
  //       }
  //     })
  //     .catch((err) => {});

  deleteCartPro(e: any) {
    this.productId = e;

    let form = new FormData();
    form.append('productId', this.productId);
    axios
      .post('http://localhost:8000/api/deleteCart', form)
      .then((res) => {
        // this.fetchCart();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  goToCheckout() {
    this.router.navigateByUrl('/checkout');
  }

  items: any = [
    { general: 'Trousers' },
    { general: 'Jeans' },
    { general: 'Shirts' },
    { general: 'Standard' },
    { general: 'Formal' },
    { general: 'Sports' },
    { general: 'Casual' },
  ];
  womenItems: any = [
    { wIt: 'Shoes' },
    { wIt: 'Sarees' },
    { wIt: 'Formal' },
    { wIt: 'Sports' },
    { wIt: 'Casual' },
    { wIt: 'Tops' },
    { wIt: 'Dresses' },
  ];
  itemss: any = [
    {
      name: 'Ring',
    },
    {
      name: 'Earrings',
    },
    {
      name: 'Nail',
    },
    {
      name: 'Sunglases',
    },
    {
      name: 'Wallets & Belts',
    },
    {
      name: 'Travel Bags',
    },
    {
      name: 'Travel Bags',
    },
    {
      name: 'Single Bags',
    },
    {
      name: 'Hand Bags',
    },
    {
      name: 'Skin Care',
    },
    {
      name: 'Perfumes',
    },
    {
      name: 'Hair Care',
    },
    {
      name: 'Make Up',
    },
    {
      name: 'Tops',
    },
    {
      name: 'Jackets',
    },
    {
      name: 'SKirts',
    },
    {
      name: 'Polo T-Shirts',
    },
  ];

  kids: any = [
    { name: 'Trousers' },
    { name: 'Jeans' },
    { name: 'Shirts' },
    { name: 'T-Shirts' },
    { name: 'Standard' },
    { name: 'Formal' },
    { name: 'Sports' },
  ];
  more: any = [
    { item: 'Loafers' },
    { item: 'Sandals' },
    { item: 'Sleep Wear' },
  ];
  digital: any = [
    { name: 'Mobile' },
    { name: 'Accesories' },
    { name: 'Camera' },
    { name: 'Tablet' },
    { name: 'Laptop' },
  ];
}
