import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartItem } from '../../../models/cart-item';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  cartItems: CartItem[] = [];
  userSubscription: Subscription;
  totalCartValue = 0;
  isCartInValid = true;
  showRemoveOutofStockMessage = false;
  constructor(private userSvc: UserService, private router: Router, private productSvc: ProductService) { }

  ngOnInit() {
    this.cartItems = this.userSvc.userDetails.cart;
    if (this.cartItems.length) {
      this.checkIfInStock();
    }
    this.userSubscription = this.userSvc.userDataEventEmmiter.subscribe((res: User) => {
      this.cartItems = res.cart;
      this.checkIfInStock();
      this.updateCartValue();
    });
    this.updateCartValue();
  }
  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
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
            if (!cartItem.isEditable) {
              if (cartItem.orderQuantity > product.quantity) {
                cartItem.isOutOfStock = true;
              } else {
                cartItem.isOutOfStock = false;
              }
            }
          }
        });
      });
      this.updateCartValue();
      this.checkCartValidity();
    });
  }
  removeFromCart(item: CartItem) {
    this.userSvc.removeItemFromCart(item).then(() => {
      console.log('Successfully Remod');
      this.checkIfInStock();
      this.updateCartValue();
      this.checkCartValidity();
    });
  }
  checkout() {
    this.router.navigate(['/checkout']);
  }
  updateCartValue() {
    this.totalCartValue = 0;
    this.cartItems.forEach((item) => {
      this.totalCartValue = this.totalCartValue + (item.price * item.orderQuantity);
    });
  }
  checkQuantityandUpdateValue(item) {
    if (item.orderQuantity > 1) {
      this.productSvc.getProductById(item.productId).subscribe((res) => {
        console.log(res);
        if (res && res.length) {
          const product: any = res[0];
          if (item.orderQuantity >= product.quantity) {
            item.orderQuantity = 1;
            console.log('Stock Not available you can only order ' + product.quantity);
            item.isEditable = false;
            this.updateCartValue();
            this.checkCartValidity();
          } else {
            item.isEditable = false;
            this.updateCartValue();
            this.checkCartValidity();
            this.userSvc.updateCartItem(item).then(() => {
            });
          }
        }
      });
    } else {
      item.isEditable = false;
      this.updateCartValue();
      this.checkCartValidity();
      this.userSvc.updateCartItem(item).then(() => {
      });
    }
    item.isEditable = false;
    this.updateCartValue();
    this.checkCartValidity();
  }
  checkCartValidity() {
    let result = false;
    for (let index = 0; index < this.cartItems.length; index++) {
      const item: any = this.cartItems[index];
      if (item.isOutOfStock) {
        result = true;
        this.isCartInValid = true;
        this.showRemoveOutofStockMessage = true;
      }
    }
    if (result === false) {
      this.isCartInValid = false;
      this.showRemoveOutofStockMessage = false;
    }
  }
  moveToWishlist(item: CartItem) {
    this.userSvc.removeItemFromCart(item).then(() => {
      this.userSvc.addItemToWishList(item).then(() => {
      });
    });
  }
}
