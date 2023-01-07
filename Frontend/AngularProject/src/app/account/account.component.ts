import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // localStorage.setItem('customerId', '0');
  }
  L_username: string = '';
  L_password: string = '';
  R_username: string = '';
  R_password: string = '';
  cartProducts: any = '';
  user: any = '';
  arr: any = [];
  register() {
    let form = new FormData();
    form.append('username', this.R_username);
    form.append('password', this.R_password);
    axios
      .post('http://localhost:8000/api/signup', form)
      .then((res) => {
        if (res.data['flag'] != 'empty') {
          if (res.data['flag'] == true) {
            this.arr = res.data['ids'];

            alert(res.data['user']);
            let user = res.data['user'].split(' ');
            this.user = user[0];
            localStorage.setItem('user', user[0]);

            let form2 = new FormData();
            form2.append('user', this.user);
            form2.append('ids', JSON.stringify(this.arr));
            console.log(this.user);
            console.log(this.arr);
            axios
              .post('http://localhost:8000/api/addIdCustomer', form2)
              .then((res) => {
                //retrieved customer Id

                localStorage.setItem('customerId', res.data[0].id);
                console.log(localStorage.getItem('customerId'));
                this.router.navigateByUrl('home').then((res) => {
                  // let formm = new FormData();
                  // let cId: any = localStorage.getItem('customerId');
                  // console.log(cId);
                  // form.append('cId', cId);
                  // axios
                  //   .post('http://localhost:8000/api/getCart', formm)
                  //   .then((res) => {
                  //     this.cartProducts = res.data;
                  //     console.log(this.cartProducts);
                  //     // let arr = [];
                  //     let i = 0;
                  //     // console.log(i);
                  //     let lengthP = this.cartProducts.length - 1;
                  //     while (lengthP >= 0) {
                  //       this.arr[i] = this.cartProducts[i].product_id;
                  //       i += 1;
                  //       lengthP -= 1;
                  //     }
                  //   })
                  //   .catch((err) => {
                  //     console.log(err);
                  //   });
                  // window.location.reload();
                });
              })

              .catch((err) => console.log(err));
            // this.router.navigateByUrl('checkout');
          } else {
            alert(res.data['user']);
          }
        } else {
          alert(res.data['user']);
        }
        this.R_password = '';
        this.R_username = '';
      })
      .catch((err) => {
        console.log(err);
      });
  }

  login() {
    let form = new FormData();
    form.append('username', this.L_username);
    form.append('password', this.L_password);
    form.append('action', 'login');

    axios
      .post('http://localhost:8000/api/login', form)
      .then((res) => {
        alert(res.data['user']);

        if (res.data['flag'] != 'empty') {
          if (res.data['flag'] == true) {
            localStorage.setItem('customerId', res.data['userId']);
            this.router.navigate(['/cart/' + res.data['userId']]);
          } else {
            alert(res.data['user']);
          }
        } else {
          alert(res.data['user']);
        }
        this.L_username = '';
        this.L_password = '';
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
// let formNew = new FormData();
//             formNew.append('ids', res.data['prodId']);
//             axios
//               .post('http://localhost:8000/api/getCartProducts', formNew)
//               .then((res) => {
//                 console.log(res.data);
//                 // this.router.navigate(['/cart']);
//               })
//               .catch((err) => {
//                 console.log(err);
//               });
