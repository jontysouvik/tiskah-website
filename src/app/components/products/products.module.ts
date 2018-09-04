import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductItemComponent } from './product-list/product-item/product-item.component';
const Products_Routes: Routes = [
  {
      path: '', component: ProductsComponent, children: [
        {  path: '', pathMatch: 'full', component: ProductDashboardComponent },
          { path: 'dashboard', component: ProductDashboardComponent },
          { path: 'categories', component: ProductDashboardComponent},
          { path: 'categories/:id', component: ProductListComponent},
          { path: 'categories/:id/:name', component: ProductListComponent},
          { path: 'product/:id', component: ProductComponent}//,
          //{ path: '**', redirectTo: 'categories' }

      ]
  }

];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(Products_Routes)
  ],
  declarations: [ProductsComponent, ProductComponent, ProductDashboardComponent, ProductListComponent, ProductItemComponent]
})
export class ProductsModule { }
