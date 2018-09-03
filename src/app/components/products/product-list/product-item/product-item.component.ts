import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../../models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input()
  product: Product;
  constructor() { }

  ngOnInit() {
  }
  onMouseEnter(product) {
    product.isMouseIn = true;
  }
  onMouseLeave(product) {
    product.isMouseIn = false;
  }
  calculateDiscount() {
    const discount = this.product.price - this.product.salePrice;
    const discountPercent = discount / this.product.price * 100;
    return '(' + discountPercent.toString() + '% Off)';
  }
}
