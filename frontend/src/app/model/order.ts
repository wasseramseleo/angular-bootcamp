export interface Order {
  id: number;
  customerName: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Canceled';
  amount: number;
  orderDate: string;
}
