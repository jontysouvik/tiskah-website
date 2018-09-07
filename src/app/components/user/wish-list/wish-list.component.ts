import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { CartItem } from '../../../models/cart-item';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit, OnDestroy {

  wishListItems: CartItem[];
  userSubscription: Subscription;
  constructor(private productSvc: ProductService, private userSvc: UserService) { }

  ngOnInit() {
    this.wishListItems = this.userSvc.userDetails.wishList;
    if (this.wishListItems.length) {
      this.checkIfInStock();
    }
    this.userSubscription = this.userSvc.userDataEventEmmiter.subscribe((res: User) => {
      this.wishListItems = res.wishList;
      this.checkIfInStock();
    });
  }
  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }

  }
  checkIfInStock() {
    console.log('Check if in stock called');
    const idArray = [];
    if (!this.wishListItems.length) {
      return;
    }
    this.wishListItems.forEach(item => {
      idArray.push(item.productId);
    });
    this.productSvc.getProductsByIds(idArray).then((res: Product[]) => {
      console.log(res);
      this.wishListItems.forEach((cartItem: any) => {
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
    });
  }
  removeFromWishList(item) {
    this.userSvc.removeItemFromWishList(item).then(() => {
      console.log('Successfully Remod');
      this.checkIfInStock();
    });
  }
  moveToCart(item) {
    this.userSvc.removeItemFromWishList(item).then(() => {
      this.userSvc.addItemToCart(item).then(() => {
        // this.checkIfInStock();
      });
    });
  }
}



