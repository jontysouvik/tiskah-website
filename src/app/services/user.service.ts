import { Injectable, EventEmitter } from '@angular/core';
import { AuthService } from './auth.service';
import { Subscription, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { CartItem } from '../models/cart-item';
import { Address } from '../models/address';
import { DelayService } from './delay.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  authSubscription: Subscription;
  userSubscription: Subscription;
  userDocument: AngularFirestoreDocument<User>;
  userDataObserable: Observable<User>;
  userDataEventEmmiter: EventEmitter<User>;
  public CONST_USER_COLLECTION_NAME = environment.userCollectionName;
  public userDetails: User;
  constructor(private authSvc: AuthService, private afs: AngularFirestore, private delaySvc: DelayService) {
    this.userDetails = new User();
    this.userDataObserable = new Observable<User>();
    this.userDataEventEmmiter = new EventEmitter<User>();
    this.authSubscription = this.authSvc.userObservable.subscribe((user) => {
      if (user) {
        this.getUser(user);
      } else {
        this.userDetails = null;
        this.userDetails = new User();
        if (this.userSubscription) {
          this.userSubscription.unsubscribe();
        }
      }
    });
  }
  getUser(user) {
    console.log(this.CONST_USER_COLLECTION_NAME + '/' + user.uid, ' Get User');
    this.userDocument = this.afs.doc(this.CONST_USER_COLLECTION_NAME + '/' + user.uid);
    this.userDataObserable = this.userDocument.valueChanges();
    this.userSubscription = this.userDataObserable.subscribe((res: User) => {
      this.userDataEventEmmiter.emit(res);
      this.userDetails = res;
    });
  }
  addItemToCart(item: CartItem) {
    let isItemInCart = false;
    for (let index = 0; index < this.userDetails.cart.length; index++) {
      const cartItem = this.userDetails.cart[index];
      if (cartItem.productId === item.productId) {
        isItemInCart = true;
        break;
      }
    }
    if (isItemInCart) {
      return new Promise<any>((resolve, reject) => {
        resolve('Already in cart');
      });
    } else {
      this.userDetails.cart.push(item);
      return this.afs.collection(this.CONST_USER_COLLECTION_NAME).doc(this.userDetails.uid)
        .set(JSON.parse(JSON.stringify(this.userDetails)));
    }


  }
  addAddress(adress: Address) {
    if (!adress.id) {
      adress.id = new Date().getTime();
    }
    this.userDetails.addresses.push(adress);
    return this.afs.collection(this.CONST_USER_COLLECTION_NAME).doc(this.userDetails.uid).set(JSON.parse(JSON.stringify(this.userDetails)));
  }
  addItemToWishList(item: CartItem) {
    let isItemInWishList = false;
    for (let index = 0; index < this.userDetails.wishList.length; index++) {
      const wishListItem = this.userDetails.wishList[index];
      if (wishListItem.productId === item.productId) {
        isItemInWishList = true;
        break;
      }
    }
    if (isItemInWishList) {
      return new Promise<any>((resolve, reject) => {
        resolve('Already in Wishlist');
      });
    } else {
      this.userDetails.wishList.push(item);
      return this.afs.collection(this.CONST_USER_COLLECTION_NAME).doc(this.userDetails.uid)
        .set(JSON.parse(JSON.stringify(this.userDetails)));
    }
  }
  removeItemFromCart(item: CartItem) {
    for (let index = 0; index < this.userDetails.cart.length; index++) {
      const itemFromCart = this.userDetails.cart[index];
      if (itemFromCart.productId === item.productId) {
        this.userDetails.cart.splice(index, 1);
        break;
      }
    }
    return this.afs.collection(this.CONST_USER_COLLECTION_NAME).doc(this.userDetails.uid).set(JSON.parse(JSON.stringify(this.userDetails)));
  }
  removeItemFromWishList(item: CartItem) {
    for (let index = 0; index < this.userDetails.wishList.length; index++) {
      const itemFromCart = this.userDetails.wishList[index];
      if (itemFromCart.productId === item.productId) {
        this.userDetails.wishList.splice(index, 1);
        break;
      }
    }
    return this.afs.collection(this.CONST_USER_COLLECTION_NAME).doc(this.userDetails.uid).set(JSON.parse(JSON.stringify(this.userDetails)));
  }
  saveAddress(address: Address) {
    let addressFound = false;
    for (let index = 0; index < this.userDetails.addresses.length; index++) {
      const addressUser = this.userDetails.addresses[index];
      if (address.id === addressUser.id) {
        addressFound = true;
        if (this.userDetails.addresses[index].isDefault) {
          address.isDefault = true;
        }
        this.userDetails.addresses[index] = address;
      }

    }
    if (!addressFound) {
      this.userDetails.addresses.push(address);
    }
    if (this.userDetails.addresses.length === 1) {
      this.userDetails.addresses[0].isDefault = true;
    }
    return this.afs.collection(this.CONST_USER_COLLECTION_NAME).doc(this.userDetails.uid).set(JSON.parse(JSON.stringify(this.userDetails)));
  }
  makeAddressDefault(address: Address) {
    for (let index = 0; index < this.userDetails.addresses.length; index++) {
      const addressUser = this.userDetails.addresses[index];
      if (addressUser.id === address.id) {
        this.userDetails.addresses[index].isDefault = true;
      } else {
        this.userDetails.addresses[index].isDefault = false;
      }
    }
    return this.afs.collection(this.CONST_USER_COLLECTION_NAME).doc(this.userDetails.uid)
      .set(JSON.parse(JSON.stringify(this.userDetails)));
  }
  getAddressById(id: number) {
    return this.afs.doc(this.CONST_USER_COLLECTION_NAME + '/' + this.userDetails.uid).valueChanges();

  }
}
