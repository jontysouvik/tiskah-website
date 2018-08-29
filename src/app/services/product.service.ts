import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';
import { DateTimeService } from './date-time.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private CONST_PRODUCTS_COLLECTION_NAME = environment.productsCollectionName;
  productsCollection: AngularFirestoreCollection<Product>;
  productDoc: AngularFirestoreDocument<Product>;
  productObserable: Observable<Product>;
  productsObserable: Observable<Product[]>;
  constructor(private dateTimeSvc: DateTimeService, private afs: AngularFirestore) {
    this.loadProducts();
   }
  saveProduct(product: Product) {
    if (!product.id) {
      const timeStamp = this.dateTimeSvc.getTimeString();
      product.id = timeStamp;
      product.timestamp = timeStamp;
    }
    return this.afs.collection(this.CONST_PRODUCTS_COLLECTION_NAME).doc(product.id).set(JSON.parse(JSON.stringify(product)));
  }
  loadProducts() {
    this.productsCollection = this.afs.collection(this.CONST_PRODUCTS_COLLECTION_NAME);
    this.productsObserable = this.productsCollection.valueChanges();
  }
  getProduct(id: string) {
    this.productDoc = this.afs.doc(this.CONST_PRODUCTS_COLLECTION_NAME + '/' + id);
    return this.productObserable = this.productDoc.valueChanges();
  }
}
