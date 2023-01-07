import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from './header/header.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AngularProject';

  onActivate(e: any) {
    console.log(localStorage.getItem('customerId'));

    // localStorage.setItem('customerId', '0');
    // let headerObj = new HeaderComponent(e);
  }
}
// }
