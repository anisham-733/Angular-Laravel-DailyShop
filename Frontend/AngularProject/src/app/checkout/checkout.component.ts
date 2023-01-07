import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(private router: Router, private spinner: NgxSpinnerService) {
    this.fetchCart(this.action);
  }

  ngOnInit(): void {
    this.invokeStripe();
    // console.log(this.payment);
  }
  total_pay: any = 0;
  flag: any = false;
  paymentHandler: any = null;
  products: any = [];
  total: any = 0;
  optionsRadios: any = '';
  cvc: any;
  expiryYear: any;
  expiryMonth: any;
  cardNumber: any;
  data: any;
  email: any;
  payment: any;
  valueRadio: any;
  customerId: any;
  action: any = 'cart';
  country: any;
  firstName: any;
  lastName: any;
  usersEmail: any;
  cno: any;
  address: any;
  apartment: any;
  city: any;
  state: any;
  postcode: any;
  notes: any;
  usersForm: any;
  status: any;

  createForm() {
    this.usersForm = new FormData();
    this.customerId = localStorage.getItem('customerId');
    this.usersForm.append('customer_id', this.customerId);
    this.usersForm.append('first_name', this.firstName);
    this.usersForm.append('last_name', this.lastName);
    this.usersForm.append('email_address', this.usersEmail);
    this.usersForm.append('contact_number', this.cno);
    this.usersForm.append('address', this.address);
    this.usersForm.append('apartment', this.apartment);
    this.usersForm.append('city', this.city);
    this.usersForm.append('state', this.state);
    this.usersForm.append('country', this.country);
    this.usersForm.append('zipcode', this.postcode);
    this.usersForm.append('notes', this.notes);
  }

  getPayValue(valueRadio: any) {
    this.valueRadio = valueRadio.target.value;
    if (this.valueRadio == 'cash') {
      this.total_pay = this.total + 55;
      localStorage.setItem('total_payment', this.total_pay);
      console.log(localStorage.getItem('total_payment'));

      this.createForm();
      axios
        .post('http://localhost:8000/api/shipping', this.usersForm)
        .then((res) => {
          console.log(res.data);
          let mailForm = new FormData();
          mailForm.append('id', this.customerId);
          mailForm.append('name', this.firstName + ' ' + this.lastName);
          console.log(this.firstName + this.lastName);
          axios
            .post('http://localhost:8000/api/sendMail', mailForm)
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
      this.router.navigateByUrl('/checkout/cash');
    }
  }
  initializePayment() {
    var currentTime = new Date();

    // returns the month (from 0 to 11)
    var month = currentTime.getMonth() + 1;
    var year = currentTime.getFullYear();

    if (
      this.cardNumber != undefined &&
      this.expiryMonth != undefined &&
      this.expiryYear != undefined &&
      this.cvc != undefined &&
      this.email != undefined
    ) {
      console.log('not empty');
      if (this.cardNumber.toString().length != 16) {
        alert('Card number must be valid');
      } else if (this.cvc.toString().length != 3) {
        alert('CVV must be 3 digits');
      } else if (this.expiryMonth < month || this.expiryMonth > 12) {
        alert('Expiry month must be valid and a future expiry month');
      } else if (
        this.expiryYear.toString().length != 4 ||
        this.expiryYear < year
      ) {
        alert(
          'Card expiry year must be valid in format YYYY and a future expiry date'
        );
      } else {
        let form = new FormData();
        form.append('email', this.email);
        form.append('amount', this.total + 55);
        form.append('cvv', this.cvc);
        form.append('expiryYear', this.expiryYear);
        form.append('expiryMonth', this.expiryMonth);
        form.append('cardNumber', this.cardNumber);
        this.spinner.show();
        axios
          .post('http://localhost:8000/api/payment', form)
          .then((res) => {
            this.customerId = localStorage.getItem('customerId');
            let form = new FormData();
            form.append('customerId', this.customerId);
            form.append('mode', 'card');
            this.total_pay = this.total + 55;
            this.status = 'pending';
            form.append('total_payment', this.total_pay);
            form.append('status', this.status);
            axios
              .post('http://localhost:8000/api/orders', form)
              .then((res) => {
                this.createForm();
                this.spinner.show();
                axios
                  .post('http://localhost:8000/api/shipping', this.usersForm)
                  .then((res) => {
                    let mailForm = new FormData();
                    mailForm.append('id', this.customerId);
                    mailForm.append(
                      'name',
                      this.firstName + ' ' + this.lastName
                    );
                    this.spinner.show();
                    axios
                      .post('http://localhost:8000/api/sendMail', mailForm)
                      .then((res) => {})
                      .catch((err) => {
                        console.log(err);
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((err) => {
                console.log(err);
                this.spinner.hide();
              });
            this.data = JSON.parse(res.data);
            window.location = this.data.next_action.redirect_to_url.url;

            this.spinner.hide();
            this.flag = true;
          })
          .catch((err) => {
            this.spinner.hide();
            console.log(err);
          });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'It is mandatory to fill all the fields',
      });
    }
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_sLUqHXtqXOkwSdPosC8ZikQ800snMatYMb',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull !');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }

  fetchCart(action: any) {
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
        this.products = res.data;
        this.total = 0;
        for (let i of this.products) {
          this.total = this.total + i.price * i.quantity;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  countrySelected(e: any) {
    this.country = e.target.value;
  }
  countries: any = [
    { name: 'USA' },
    { name: 'UK' },
    { name: 'UAE' },
    { name: 'Mexico' },
    { name: 'Israel' },
    { name: 'Egypt' },
    { name: 'Denmark' },
    { name: 'China' },
    { name: 'Brazil' },
    { name: 'Belgium' },
    { name: 'Afghanistan' },
    { name: 'Australia' },
    { name: 'India' },
  ];
}
