import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Data, Router } from '@angular/router';
import axios from 'axios';
import { CartComponent } from '../cart/cart.component';
import { HeaderComponent } from '../header/header.component';
import { MyServiceService } from '../my-service.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css'],
})
export class SingleProductComponent implements OnInit {
  public productId: any;
  product: any = [];
  relatedProds: any = [];
  quantity: any = 1;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private myService: MyServiceService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.productId = id;
      this.fetch();
    });
  }
  changeQuantity(e: any, id: any) {
    this.quantity = parseInt(e.target.value);
    if (this.quantity < 1) {
      alert('Product quantity must be 1 or greater');
    }
  }

  addProductToCart(e: any) {
    let headerObj = new HeaderComponent(this.router, this.myService);

    let productId = e;
    console.log(productId);
    let form = new FormData();
    form.append('productId', productId);
    form.append('quantity', this.quantity);
    this.myService.setValue(this.myService.quantity + 1);
    console.log(this.myService.quantity);
    axios
      .post('http://localhost:8000/api/addToCart', form)
      .then((res) => {
        // headerObj.fetchCart();
        alert(res.data);
      })

      .catch((err) => {});
  }
  fetch() {
    let form = new FormData();
    form.append('id', this.productId);
    axios
      .post('http://localhost:8000/api/SingleProduct', form)
      .then((res) => {
        this.product = res.data;
        this.fetchRelated();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  fetchRelated() {
    let form = new FormData();
    form.append('catId', this.product[0].category_id);
    axios
      .post('http://localhost:8000/api/FetchRelated', form)
      .then((res) => {
        this.relatedProds = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  bigImage: any = [
    {
      item: '../../assets/img/view-slider/medium/polo-shirt-1.png',
      lens: '../../assets/img/view-slider/large/polo-shirt-1.png',
      srcc: '../../assets/img/view-slider/thumbnail/polo-shirt-1.png',
    },
  ];
  prod: any = [
    { value: '1', item: 2 },
    { value: '2', item: 3 },
    { value: '3', item: 4 },
    { value: '4', item: 5 },
    { value: '5', item: 6 },
  ];
  classes: any = [
    { item: 'fa fa-star-o' },
    { item: 'fa fa-star-o' },
    { item: 'fa fa-star-o' },
    { item: 'fa fa-star-o' },
    { item: 'fa fa-star-o' },
  ];
}
