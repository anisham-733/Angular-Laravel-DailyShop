import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Data, Router } from '@angular/router';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2';
import axios from 'axios';
import { formatCurrency } from '@angular/common';
@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.css'],
})
export class PaymentStatusComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('paymentId');
      this.paymentId = id;
      console.log(this.paymentId);
      this.customerId = localStorage.getItem('customerId');

      if (this.paymentId != 'cash') {
        this.getStatus();
      } else {
        let form = new FormData();
        form.append('customerId', this.customerId);
        form.append('mode', 'cash');
        this.total_pay = localStorage.getItem('total_payment');
        form.append('total_payment', this.total_pay);
        this.status = 'pending';
        form.append('status', this.status);
        axios
          .post('http://localhost:8000/api/orders', form)
          .then((res) => {
            let formConfirmation = new FormData();
            formConfirmation.append('id', this.customerId);
            axios
              .post('http://localhost:8000/api/ordersConfirm', formConfirmation)
              .then((res) => {
                let product_details = res.data['p'];
                let order_details = res.data['order'][0];
                this.product_details = product_details;
                this.orderId = order_details.id;
                this.orderPayment = order_details.total_payment;
                this.payMode = order_details.payment_mode;
                this.orderDate = order_details.order_date;
                this.address =
                  order_details.address + ' , ' + order_details.zip_code;
                this.name =
                  order_details.first_name + ' ' + order_details.last_name;
                console.log(product_details);
                console.log(order_details);
              })
              .catch((err) => {
                console.log(err);
              });
            // this.router.navigate(['home']);
          })
          .catch((err) => {
            console.log(err);
          });
        Swal.fire('SUCCESS', 'Your order is placed successfully', 'success');
      }
    });
  }
  name: any;
  address: any;
  orderId: any;
  orderDate: any;
  payMode: any;
  orderPayment: any;
  paymentId: any;
  paymentStatus: any;
  flag: any;
  product_details: any;
  total_pay: any = 0;
  customerId: any;
  status: any;
  getStatus() {
    let form = new FormData();
    form.append('id', this.paymentId);
    axios
      .post('http://localhost:8000/api/paymentStatus', form)
      .then((res) => {
        // Payment card sweetalert
        let status = JSON.parse(res.data).amount_received;
        if (status) {
          this.paymentStatus =
            'Payment of Rs. ' +
            JSON.parse(res.data).amount / 100 +
            ' done successfully';
          Swal.fire(
            'SUCCESS!',
            'Payment of Rs. ' +
              JSON.parse(res.data).amount / 100 +
              ' done successfully',
            'success'
          );
        } else {
          this.paymentStatus = 'Payment has not been succeeded';
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: 'Payment has not been succeeded',
            confirmButtonText: 'Proceed to Checkout Page again?',
            showDenyButton: true,
            denyButtonText: 'Cancel Payment',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.router.navigateByUrl('checkout');
            } else if (result.isDenied) {
              Swal.fire('Payment cancelled', '', 'info');
              this.router.navigateByUrl('home');
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
