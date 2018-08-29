import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  productsSubscription: Subscription;
  products: Product[];
  constructor(private router: Router, private productSvc: ProductService) { }

  ngOnInit() {
    this.productsSubscription = this.productSvc.productsObserable.subscribe((res) => {
      this.products = res;
    });
  }
  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }
  onAddClick() {
    this.router.navigate(['/admin', 'products', '0']);
  }
  onEdit(product: Product) {
    this.router.navigate(['/admin', 'products', product.id]);
  }
}
