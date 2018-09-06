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
  constructor(private userSvc: UserService, private router: Router, private productSvc: ProductService) { }

  ngOnInit() {
    this.cartItems = this.userSvc.userDetails.cart;
    this.userSubscription = this.userSvc.userDataEventEmmiter.subscribe((res: User) => {
      this.cartItems = res.cart;
      this.updateCartValue();
    });
    this.updateCartValue();
  }
  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
  removeFromCart(item: CartItem) {
    this.userSvc.removeItemFromCart(item).then(() => {
      console.log('Successfully Remod');
      this.updateCartValue();
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
          if (item.orderQuantity > product.quantity) {
            item.orderQuantity = 1;
            console.log('Stock Not available you can only order ' + product.quantity);
          }
        }
        item.isEditable = false;
        this.updateCartValue();
      });
    }
    this.updateCartValue();
  }
}
