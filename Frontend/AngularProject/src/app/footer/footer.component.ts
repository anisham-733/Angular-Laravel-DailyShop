import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  navs: any = [
    { name: 'Home' },
    { name: 'Services' },
    { name: 'Products' },
    { name: 'About us' },
    { name: 'Contact' },
  ];
  bases: any = [
    { name: 'Delivery' },
    { name: 'Returns' },
    { name: 'Services' },
    { name: 'Discount' },
    { name: 'Special Offer' },
  ];
  sites: any = [
    { name: 'Site Map' },
    { name: 'Search' },
    { name: 'Advanced Search' },
    { name: 'Suppliers' },
    { name: 'FAQ' },
  ];
}
