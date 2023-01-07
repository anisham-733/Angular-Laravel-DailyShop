import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

// install Swiper modules
SwiperCore.use([Pagination]);
// import Swiper core and required modules
import SwiperCore, { Pagination } from 'swiper';
import { SwiperOptions } from 'swiper';
import {
  SwiperComponent,
  SwiperModule,
  SwiperSlideDirective,
} from 'swiper/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log(localStorage.getItem('customerId'));
  }

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    loop: false,
  };
  slides: any = [
    {
      item: '../../assets/img/slider/menColl.jpg',
      off: 'Save upto 75%off',
      collection: 'Men"s Collection',
    },
    {
      item: '../../assets/img/slider/watchColl.jpg',
      off: 'Save Up to 40% Off',
      collection: 'Wristwatch Collection',
    },
    {
      item: '../../assets/img/slider/jeansColl.jpg',
      off: 'Save Up to 50% Off',
      collection: 'Jeans Collection',
    },
    {
      item: '../../assets/img/slider/shoes.jpg',
      off: 'Save Up to 75% Off',
      collection: 'Exclusive Shoes',
    },
    {
      item: '../../assets/img/slider/bestColl.jpg',
      off: 'Save Up to 75% Off',
      collection: 'Best Collection',
    },
  ];

  promos: any = [
    {
      item: '../../assets/img/promo-banner-3.jpg',
      sale: 'Sale Off',
      cat: 'On shoes',
    },
    {
      item: '../../assets/img/promo-banner-4.jpg',
      sale: '25% Off',
      cat: 'For Bags',
    },
    {
      item: '../../assets/img/promo-banner-5.jpg',
      sale: 'Sale Off',
      cat: 'For Kids',
    },
  ];
  testimonial: any = [
    {
      image: '../../assets/img/testimonial-img-2.jpg',
      name1: 'Allison',
      url: 'Dribble.com',
      post: 'Designer',
    },
    {
      image: '../../assets/img/testimonial-img-1.jpg',
      name1: 'KEVIN MEYER',
      post: 'CEO',
      url: 'Dribble.com',
    },
    {
      image: '../../assets/img/testimonial-img-3.jpg',
      name1: 'Luner',
      url: 'Kinatic Solution',
      post: 'CEO',
    },
  ];

  blogs: any = [
    { image: '../../assets/img/blogss.jpg' },
    { image: '../../assets/img/blogss.jpg' },
    { image: '../../assets/img/blogss.jpg' },
  ];
  clients: any = [
    {
      image: '../../assets/img/client-brand-java.png',
      alt: 'java img',
    },
    {
      image: '../../assets/img/client-brand-jquery.png',
      alt: 'jquery img',
    },
    {
      image: '../../assets/img/client-brand-wordpress.png',
      alt: 'wordPress img',
    },
    {
      image: '../../assets/img/client-brand-java.png',
      alt: 'java img',
    },
    {
      image: '../../assets/img/client-brand-joomla.png',
      alt: 'joomla img',
    },
    {
      image: '../../assets/img/client-brand-java.png',
      alt: 'java img',
    },
    {
      image: '../../assets/img/client-brand-joomla.png',
      alt: 'joomla img',
    },
    {
      image: '../../assets/img/client-brand-html5.png',
      alt: 'html5 img',
    },
    {
      image: '../../assets/img/client-brand-jquery.png',
      alt: 'jquery img',
    },
    {
      image: '../../assets/img/client-brand-java.png',
      alt: 'java img',
    },
  ];

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

  onSlideChange() {
    console.log('slide change');
  }
}
