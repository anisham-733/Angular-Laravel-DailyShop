import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Data, Router } from '@angular/router';
import axios from 'axios';
@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css'],
})
export class CategoryProductsComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let catName = params.get('cat');
      this.catName = catName;
      this.fetchAll();
    });
  }
  catName: any = '';
  products: any = [];
  filteredData: any = [];
  fetchAll() {
    axios
      .get('http://localhost:8000/api/allProducts')
      .then((res) => {
        this.products = res.data;
        this.handleProduct();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  addProductToCart(e: any) {
    let productId = e;
    let quantity = '1';
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
  handleProduct() {
    this.filteredData = [];
    this.products.map((x: any) => {
      if (x.category_name == this.catName) {
        // console.log(x);
        this.filteredData.push(x);
      }
    });
  }
}
