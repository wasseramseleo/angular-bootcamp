import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor() {
    console.log('OrderService initialized');
  }

  // Placeholder
  getOrders() {
    console.log('Fetching orders...');
  }
}
