import { Address } from './address';
import { CartItem } from './cart-item';
export const PayemetType = [
  {
    name: 'COD',
    value: 1
  },
  {
    name: 'Prepaid',
    value: 2
  }];
export const OrderStatus = [
  {
    name: 'New',
    value: 1
  }, {
    name: 'ReadyToShip',
    value: 2
  }, {
    name: 'Shipped',
    value: 3
  }, {
    name: 'InTransit',
    value: 4
  }, {
    name: 'OutForDelivery',
    value: 5
  }, {
    name: 'Delivered',
    value: 6
  }, {
    name: 'ReturnInitiated',
    value: 7
  }, {
    name: 'ReturnReceived',
    value: 8
  }, {
    name: 'RefundInitiated',
    value: 9
  }, {
    name: 'RefundCompleated',
    value: 10
  }];
export class Order {
  public id: string;
  public shippingAddress: Address;
  public billingAddress: Address;
  public orderedItems: CartItem[] = [];
  public orderDate: string;
  public timeStamp: number;
  public paymentType: number;
  public orderStatus: number;
  public userId: string;
}
