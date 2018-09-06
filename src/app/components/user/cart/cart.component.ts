import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartItem } from '../../../models/cart-item';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  cartItems: CartItem[] = [];
  userSubscription: Subscription;
  constructor(private userSvc: UserService) { }

  ngOnInit() {
    this.cartItems = this.userSvc.userDetails.cart;
    this.userSubscription = this.userSvc.userDataEventEmmiter.subscribe((res: User) => {
      this.cartItems = res.cart;
    });
  }
  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
  removeFromCart(item: CartItem) {
    this.userSvc.removeItemFromCart(item).then(() => {
      console.log('Successfully Remod');
    });
  }
}
