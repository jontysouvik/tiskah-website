import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productsSubscription: Subscription;
  products: Product[];
  selectedCategory = 0;
  constructor(private productSvc: ProductService) { }

  ngOnInit() {
    this.productsSubscription = this.productSvc.getProductsByCategoryIdWithQuantity('0').subscribe((res: Product[]) => {
      this.products = res;
    })
  }
  loadMore() {
    const lastProductQuantity = this.products[this.products.length - 1].quantity;
    this.productsSubscription = this.productSvc.getProductsByCategoryIdWithQuantity(this.selectedCategory.toString(), lastProductQuantity).subscribe((res: Product[]) => {
      // this.products = res;
      console.log(res.length);
      res.forEach((resItem) => {
        this.products.push(resItem);
      });
    })
  }
}
