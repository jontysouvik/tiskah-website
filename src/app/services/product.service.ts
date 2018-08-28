import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  CONST_PRODUCTS_COLLECTION_NAME = environment.productsCollectionName;
  constructor() { }
  saveProduct(product: Product) {
    console.log(product);
  }
}
