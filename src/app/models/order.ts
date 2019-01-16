import { Address } from './address';
import { CartItem } from './cart-item';
export enum PayemetType {
  Prepaid,
  COD
}
export enum OrderStatus {
  New,
  ReadyToShip,
  Shipped,
  InTransit,
  OutForDelivery,
  Delivered,
  ReturnInitiated,
  ReturnReceived,
  RefundInitiated,
  RefundCompleated
}
export class Order {
  public id: string;
  public shippingAddress: Address;
  public billingAddress: Address;
  public orderedItems: CartItem[] = [];
  public orderDate: string;
  public timeStamp: number;
  public paymentType: PayemetType;
  public orderStatus: OrderStatus;
  public userId: string;
}
