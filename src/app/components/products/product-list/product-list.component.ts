import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../../../services/utilities.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  productsSubscription: Subscription;
  activeRouteSubscription: Subscription;
  userSubscription: Subscription;
  products: Product[];
  productFiters: any[] = [];
  selectedCategory = 0;
  constructor(private productSvc: ProductService, private activeRoute: ActivatedRoute, private utilSvc: UtilitiesService,
     private authSvc: AuthService) { }

  ngOnInit() {
    this.activeRouteSubscription = this.activeRoute.params.subscribe(params => {
      if (params.id !== '0') {
        this.selectedCategory = params.id;
      }
      this.productsSubscription = this.productSvc.getProductsByCategoryIdWithQuantity(this.selectedCategory.toString())
        .subscribe((res: Product[]) => {
          this.products = res;
          this.buidFilters();
        });
        this.userSubscription = this.authSvc.userObservable.subscribe((user) => {
          if (!user) {
            this.productsSubscription = this.productSvc.getProductsByCategoryIdWithQuantity(this.selectedCategory.toString())
            .subscribe((res: Product[]) => {
              this.products = res;
              this.buidFilters();
            });
          }
        });
    });
  }
  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
    if (this.activeRouteSubscription) {
      this.activeRouteSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
  loadMore() {
    const lastProductQuantity = this.products[this.products.length - 1].quantity;
    this.productsSubscription = this.productSvc.getProductsByCategoryIdWithQuantity(this.selectedCategory.toString(), lastProductQuantity)
      .subscribe((res: Product[]) => {
        // this.products = res;
        console.log(res.length);
        res.forEach((resItem) => {
          this.products.push(resItem);
        });
      });
  }
  buidFilters() {
    if (this.selectedCategory !== 0) {
      const startFilter = JSON.parse(this.products[0].filters);
      startFilter.forEach(element => {
        element.value = [];
      });
      for (let productIndex = 0; productIndex < this.products.length; productIndex++) {
        const product = this.products[productIndex];
        const productFilters = JSON.parse(product.filters);
        console.log(productFilters);
        startFilter.forEach(element => {
          productFilters.forEach(productFilter => {
            if (element.name === productFilter.name) {
              if (productFilter.value.indexOf(',') > -1) {
                const valuesArray = productFilter.value.split(',');
                valuesArray.forEach(valuesArrayElement => {
                  if (element.value.indexOf(valuesArrayElement) === -1) {
                    element.value.push(this.utilSvc.removeSpacesFromBothEnd(valuesArrayElement));
                  }
                });
              } else {
                if (element.value.indexOf(productFilter.value) === -1) {
                  element.value.push(this.utilSvc.removeSpacesFromBothEnd(productFilter.value));
                }
              }

            }
          });
        });
      }
      console.log(startFilter);
      this.productFiters = startFilter;
    }

  }
}
