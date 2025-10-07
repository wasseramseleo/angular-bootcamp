import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Order {
  constructor() {
    console.log('OrderService initialized');
  }

  // Placeholder
  getOrders() {
    console.log('Fetching orders...');
  }
}
