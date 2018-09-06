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
        this.authSubscription.unsubscribe();
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
      console.log(res, 'From User service');
      // this.userDataEventEmmiter = new EventEmitter<User>();
      this.userDataEventEmmiter.emit(res);
      this.userDetails = res;
    });
  }
  addItemToCart(item: CartItem) {
    this.userDetails.cart.push(item);
    return this.afs.collection(this.CONST_USER_COLLECTION_NAME).doc(this.userDetails.uid).set(JSON.parse(JSON.stringify(this.userDetails)));
  }
  addAddress(adress: Address) {
    if (!adress.id) {
      adress.id = new Date().getTime();
    }
    this.userDetails.addresses.push(adress);
    return this.afs.collection(this.CONST_USER_COLLECTION_NAME).doc(this.userDetails.uid).set(JSON.parse(JSON.stringify(this.userDetails)));
  }
  addItemToWishList(item: CartItem) {
    this.userDetails.wishList.push(item);
    return this.afs.collection(this.CONST_USER_COLLECTION_NAME).doc(this.userDetails.uid).set(JSON.parse(JSON.stringify(this.userDetails)));
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
}
