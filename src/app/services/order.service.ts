import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Order } from '../models/order';
import { DateTimeService } from './date-time.service';
import { UserService } from './user.service';
import { Product } from '../models/product';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  CONST_ORDERS_COLLECTION_NAME = environment.ordersCollectionName;
  CONST_PRODUCTS_COLLECTION_NAME = environment.productsCollectionName;
  constructor(private afs: AngularFirestore, private dateTimeSvc: DateTimeService, private userSvc: UserService) { }
  saveOrder(order: Order) {
    if (!order.id) {
      const timeStamp = this.dateTimeSvc.getTimeString();
      order.id = timeStamp + this.userSvc.userDetails.uid;
      order.timeStamp = new Date().getTime();
    }
    const productCollection = this.afs.collection(this.CONST_PRODUCTS_COLLECTION_NAME);
    for (let index = 0; index < order.orderedItems.length; index++) {
      const element = order.orderedItems[index];
      const productSubs = productCollection.doc(element.productId).valueChanges().subscribe((product: Product) => {
        console.log(product);
        productSubs.unsubscribe();
        product.quantity = product.quantity -  element.orderQuantity;
        productCollection.doc(element.productId).set(JSON.parse(JSON.stringify(product))).then(() => {
          console.log('Quantity Updated');
        });
      });


    }
    return this.afs.collection(this.CONST_ORDERS_COLLECTION_NAME).doc(order.id).set(JSON.parse(JSON.stringify(order)));
  }
  getOrdersforAdmin() {
    return this.afs.collection(this.CONST_ORDERS_COLLECTION_NAME).valueChanges();
  }
}
