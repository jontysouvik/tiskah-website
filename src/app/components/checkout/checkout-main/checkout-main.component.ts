import { Component, OnInit } from '@angular/core';
import { Address } from '../../../models/address';
import { Subscription } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { CartItem } from '../../../models/cart-item';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { Order, PayemetType, OrderStatus } from '../../../models/order';

@Component({
  selector: 'app-checkout-main',
  templateUrl: './checkout-main.component.html',
  styleUrls: ['./checkout-main.component.css']
})
export class CheckoutMainComponent implements OnInit {
  addresses: Address[] = [];
  cartItems: CartItem[] = [];
  totalCartValue: number;
  isCartInValid = true;
  userSubscription: Subscription;
  paymentMethod: string;
  selectedAddress: Address;
  constructor(private userSvc: UserService, private productSvc: ProductService) { }

  ngOnInit() {
    this.addresses = this.userSvc.userDetails.addresses;
    this.cartItems = this.userSvc.userDetails.cart;
    this.selectDefaultAddress();
    if (this.cartItems.length) {
      this.checkIfInStock();
      this.updateCartValue();
    }
    this.userSubscription = this.userSvc.userDataEventEmmiter.subscribe((res: User) => {
      this.addresses = res.addresses;
      this.selectDefaultAddress();
      this.cartItems = res.cart;
      this.checkIfInStock();
      this.updateCartValue();
    });
  }
  checkIfInStock() {
    console.log('Check if in stock called');
    const idArray = [];
    if (!this.cartItems.length) {
      return;
    }
    this.cartItems.forEach(item => {
      idArray.push(item.productId);
    });
    this.productSvc.getProductsByIds(idArray).then((res: Product[]) => {
      console.log(res);
      this.cartItems.forEach((cartItem: any) => {
        res.forEach((product) => {
          if (cartItem.productId === product.id) {
            cartItem.price = product.isOnSale ? product.salePrice : product.price;
            if (cartItem.orderQuantity >= product.quantity) {
              cartItem.isOutOfStock = true;
            } else {
              cartItem.isOutOfStock = false;
            }
          }
        });
      });
      this.updateCartValue();
      this.checkCartValidity();
    });
  }
  checkCartValidity() {
    let result = false;
    for (let index = 0; index < this.cartItems.length; index++) {
      const item: any = this.cartItems[index];
      if (item.isOutOfStock) {
        result = true;
        this.isCartInValid = true;
      }
    }
    if (result === false) {
      this.isCartInValid = false;
    }
  }
  updateCartValue() {
    this.totalCartValue = 0;
    this.cartItems.forEach((item) => {
      this.totalCartValue = this.totalCartValue + (item.price * item.orderQuantity);
    });
  }
  selectDefaultAddress() {
    for (let index = 0; index < this.addresses.length; index++) {
      const address: any = this.addresses[index];
      if (address.isDefault) {
        address.isSelected = true;
        this.selectedAddress = address;
      }
    }
  }
  onAddressSelect(selectedAddress) {
    for (let index = 0; index < this.addresses.length; index++) {
      const address: any = this.addresses[index];
      if (selectedAddress.id === address.id) {
        address.isSelected = true;
        this.selectedAddress = address;
      } else {
        address.isSelected = false;
      }
    }
  }
  setPaymentMethod(type) {
    this.paymentMethod = type;
    console.log(this.paymentMethod);
  }
  placeOrder() {
    const order = new Order();
    order.billingAddress = this.selectedAddress;
    order.orderedItems = this.cartItems;
    order.paymentType = PayemetType.COD;
    order.orderStatus = OrderStatus.New;
    order.timeStamp = new Date().getTime();
    console.log(order);
  }
}
