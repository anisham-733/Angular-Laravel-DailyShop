import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MyServiceService {
  quantity = 0;
  constructor() {}
  getValue() {
    return this.quantity;
  }
  setValue(q: any) {
    this.quantity = q;
    return this.quantity;
  }
}
