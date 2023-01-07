import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MyServiceService } from './my-service.service';
import { HomeComponent } from './home/home.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProductsComponent } from './products/products.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AccountComponent } from './account/account.component';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MenComponent } from './men/men.component';
import { CategoryProductsComponent } from './category-products/category-products.component';
import { PaymentStatusComponent } from './payment-status/payment-status.component';
import { SuccessComponent } from './success/success.component';
import { SwiperModule } from 'swiper/angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

    HomeComponent,
    ProductsComponent,
    SingleProductComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    AccountComponent,
    MenComponent,

    CategoryProductsComponent,
    PaymentStatusComponent,
    SuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    FormsModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    SwiperModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
  ],
  providers: [MyServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
