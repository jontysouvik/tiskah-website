import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  productsSubscription: Subscription;
  products: Product[] = [];
  categoriesSubscription: Subscription;
  categories: Category[];
  selectedCategoryId = 0;
  hideLoadMoreButton = false;
  constructor(private router: Router, private productSvc: ProductService, private categorySvc: CategoryService) { }

  ngOnInit() {
    this.loadCategories();
    this.loadLast10Products();
  }
  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
    this.categoriesSubscription.unsubscribe();
  }
  onAddClick() {
    this.router.navigate(['/admin', 'products', '0']);
  }
  onEdit(product: Product) {
    this.router.navigate(['/admin', 'products', product.id]);
  }
  getProductById(id: string) {
    console.log(id);
    this.productsSubscription = this.productSvc.getProductById(id).subscribe((res: Product[]) => {
      this.products = res;
    });
  }
  handelSearchKeyUp(value) {
    if (!value) {
      this.loadLast10Products();
    }
  }
  loadLast10Products() {
    this.productsSubscription = this.productSvc.loadLast10Products().subscribe((res: Product[]) => {
      this.products = res;
      if (res.length) {
        this.hideLoadMoreButton = false;
      } else {
        this.hideLoadMoreButton = true;
      }
    });
  }
  loadCategories() {
    this.categoriesSubscription = this.categorySvc.getAllCategories().subscribe((res: Category[]) => {
      this.categories = res;
    })
  }
  getProductsByCategory(categoryId: number) {
    if (categoryId !== this.selectedCategoryId) {
      this.selectedCategoryId = categoryId;
      console.log(this.selectedCategoryId);
      if (categoryId === 0) {
        this.loadLast10Products();
      } else {
        this.productSvc.getProductsByCategoryId(categoryId.toString()).subscribe((res: Product[]) => {
          this.products = res;
          if (res.length) {
            this.hideLoadMoreButton = false;
          } else {
            this.hideLoadMoreButton = true;
          }
        });
      }
    }
  }
  loadMore() {
    const lastProductId = this.products[this.products.length - 1].id;
    if (this.selectedCategoryId === 0) {
      this.productSvc.getProductsByCategoryId(this.selectedCategoryId.toString(), lastProductId).subscribe((res: Product[]) => {
        // this.products = res;
        if (res.length) {
          res.forEach(r => {
            this.products.push(r);
          });
          this.hideLoadMoreButton = false;
        } else {
          this.hideLoadMoreButton = true;
        }
      });
    } else {
      this.productSvc.getProductsByCategoryId(this.selectedCategoryId.toString(), lastProductId).subscribe((res: Product[]) => {
        if (res.length) {
          res.forEach(r => {
            this.products.push(r);
          });
          this.hideLoadMoreButton = false;
        } else {
          this.hideLoadMoreButton = true;
        }
      });
    }
  }
}
