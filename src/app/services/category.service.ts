import { Injectable} from '@angular/core';
import { Category } from '../models/category';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { DateTimeService } from './date-time.service';

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
  constructor(private afs: AngularFirestore, private dateTimeSvc: DateTimeService) {
    // this.categoriesChanged = new EventEmitter<any>();
    this.loadCategories();
  }
  saveCategory(category: Category) {
    if (!category.id) {
      const timeStamp = this.dateTimeSvc.getTimeString();
      category.id = timeStamp;
      category.timestamp = timeStamp;
    }
    return this.afs.collection(this.CONST_CATEGORIES_COLLECTION_NAME).doc(category.id).set(JSON.parse(JSON.stringify(category)));
  }
  loadCategories() {
    this.categoriesCollection = this.afs.collection(this.CONST_CATEGORIES_COLLECTION_NAME);
    this.categoriesObserable = this.categoriesCollection.valueChanges();
  }
  getCategory(id: string) {
    this.categoryDoc = this.afs.doc(this.CONST_CATEGORIES_COLLECTION_NAME + '/' + id);
    return this.categoryObserable = this.categoryDoc.valueChanges();
    // return this.categoryObserable.toPromise();
  }
  getAllCategories() {
    return this.afs.collection(this.CONST_CATEGORIES_COLLECTION_NAME).valueChanges();
  }
}
