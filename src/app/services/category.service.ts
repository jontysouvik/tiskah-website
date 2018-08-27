import { Injectable, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { Category } from '../models/category';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, Subscription } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  CONST_CATEGORIES_COLLECTION_NAME = environment.categoriesCollectionName;
  selectedCatagory: Category;
  categoriesCollection: AngularFirestoreCollection<Category>;
  categoryDoc: AngularFirestoreDocument<Category>;
  categoryObserable: Observable<Category>;
  categoriesObserable: Observable<Category[]>;
  categoriesSubscription: Subscription;
  categories: Category[];
  // categoriesChanged: EventEmitter<any>;
  constructor(private afs: AngularFirestore) {
    // this.categoriesChanged = new EventEmitter<any>();
    this.loadCategories();
  }
  saveCategory(catagory: Category) {
    return this.afs.collection(this.CONST_CATEGORIES_COLLECTION_NAME).doc(catagory.id).set(JSON.parse(JSON.stringify(catagory)));
  }
  loadCategories() {
    console.log('Load Categories Called');
    this.categoriesCollection = this.afs.collection(this.CONST_CATEGORIES_COLLECTION_NAME);
    this.categoriesObserable = this.categoriesCollection.valueChanges();
    // this.categoriesSubscription = this.categoriesObserable.subscribe((res) => {
    //   this.categories = res;
    //   console.log(res, 'categoriesObserable subs fired');
    //   // this.categoriesChanged = new EventEmitter<Category[]>();
    //   // this.categoriesChanged.emit(this.categories);
    // });
  }
  getCategory(id: string) {
    this.categoryDoc = this.afs.doc(this.CONST_CATEGORIES_COLLECTION_NAME + '/' + id);
    return this.categoryObserable = this.categoryDoc.valueChanges();
    // return this.categoryObserable.toPromise();
  }
}
