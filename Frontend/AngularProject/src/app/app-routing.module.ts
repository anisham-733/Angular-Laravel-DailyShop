import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { CartComponent } from './cart/cart.component';
import { CategoryProductsComponent } from './category-products/category-products.component';
import { CheckoutComponent } from './checkout/checkout.component';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { MenComponent } from './men/men.component';
import { PaymentStatusComponent } from './payment-status/payment-status.component';
import { SingleProductComponent } from './single-product/single-product.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'singleProd/:id', component: SingleProductComponent },
  { path: 'cart/:customerId', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'account', component: AccountComponent },
  { path: 'products/:cat', component: CategoryProductsComponent },
  { path: 'checkout/:paymentId', component: PaymentStatusComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  HomeComponent,
  SingleProductComponent,
  CartComponent,
  CheckoutComponent,
  AccountComponent,
  HeaderComponent,
];
