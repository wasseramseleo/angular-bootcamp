export interface Order {
  id: number;
  customerName: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  amount: number;
  orderDate: string;
}
