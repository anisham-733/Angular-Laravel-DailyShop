import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(private router: Router) {
    this.MenProducts();
    axios
      .get('http://localhost:8000/api/Categories')
      .then((res) => {
        this.products = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  products: any = [];
  filteredData: any = [];
  MenPros: any = [];
  ngOnInit(): void {}

  handleProduct(e: any) {
    this.filteredData = [];
    this.products.map((x: any) => {
      if (x.category_name == e) {
        // console.log(x);
        this.filteredData.push(x);
      }
    });
  }

  MenProducts() {
    axios
      .get('http://localhost:8000/api/CategoryMen')
      .then((res) => {
        this.MenPros = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  selected(e: any) {
    this.router.navigateByUrl('/singleProd/' + e);
    // this.router.navigate(['contact'], {relativeTo: this.route})
    // this.router.navigate(['../', {id:selectedId}], {relativeTo:this.route});
    // this.router.navigateByUrl('/dept/'+nextId);
  }
  addProductToCart(e: any) {
    console.log(e);
    let productId = e;
    let quantity = '1';
    console.log(productId);
    let form = new FormData();
    form.append('productId', productId);
    form.append('quantity', quantity);
    axios
      .post('http://localhost:8000/api/addToCart', form)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {});
  }
}
