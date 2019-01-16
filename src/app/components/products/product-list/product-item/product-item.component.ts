import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../../models/product';
import { UserService } from '../../../../services/user.service';
import { CartItem } from '../../../../models/cart-item';
import { AuthService } from '../../../../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input()
  product: any;
  authSubscription: Subscription;
  isLoggedin = false;
  constructor(private userSvc: UserService, private authSvc: AuthService, private router: Router) {
    this.authSubscription = this.authSvc.userObservable.subscribe((user) => {
      if (user) {
        this.isLoggedin = true;
      } else {
        this.isLoggedin = false;
      }
    });
  }

  ngOnInit() {
  }
  onMouseEnter(product) {
    product.isMouseIn = true;
  }
  onMouseLeave(product) {
    product.isMouseIn = false;
  }
  calculateDiscount() {
    const discount = this.product.price - this.product.salePrice;
    const discountPercent = discount / this.product.price * 100;
    return '(' + Math.round(discountPercent).toString() + '% Off)';
  }
  addToCart(product) {
    const cartItem = new CartItem();
    cartItem.productId = product.id;
    cartItem.productName = product.name;
    cartItem.thumbUrl = product.thumbnailUrl;
    cartItem.description = product.description;
    cartItem.price = product.isOnSale ? product.salePrice : product.price;
    cartItem.orderQuantity = 1;
    this.userSvc.addItemToCart(cartItem);
  }
  addToWishlist(product) {
    if (!this.isInWishList(product)) {
      const cartItem = new CartItem();
      cartItem.productId = product.id;
      cartItem.productName = product.name;
      cartItem.thumbUrl = product.thumbnailUrl;
      cartItem.description = product.description;
      cartItem.price = product.isOnSale ? product.salePrice : product.price;
      cartItem.orderQuantity = 1;
      this.userSvc.addItemToWishList(cartItem);
    }
  }
  isInCart(product) {
    product.inCart = false;
    if (!this.userSvc.userDetails.cart) {
      this.userSvc.userDetails.cart = [];
    }
    for (let index = 0; index < this.userSvc.userDetails.cart.length; index++) {
      const cartItem = this.userSvc.userDetails.cart[index];
      if (cartItem.productId === product.id) {
        product.inCart = true;
      }
    }
    return product.inCart;
  }
  isInWishList(product) {
    product.inWishList = false;
    if (!this.userSvc.userDetails.wishList) {
      this.userSvc.userDetails.wishList = [];
    }
    for (let index = 0; index < this.userSvc.userDetails.wishList.length; index++) {
      const cartItem = this.userSvc.userDetails.wishList[index];
      if (cartItem.productId === product.id) {
        product.inWishList = true;
      }
    }
    return product.inWishList;
  }
  goToProduct(product) {
    console.log(product);
    this.router.navigate(['/products', 'product', product.id]);
  }
}
