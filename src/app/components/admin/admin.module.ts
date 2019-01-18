import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './categories/category/category.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { RunTasksComponent } from './run-tasks/run-tasks.component';
import { OrdersComponent } from './orders/orders.component';

const Admin_Routes: Routes = [
  {
      path: '', component: AdminComponent, children: [
        {  path: '', component: DashboardComponent },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'categories', component: CategoriesComponent},
          { path: 'categories/:id', component: CategoryComponent},
          { path: 'products', component: ProductsComponent},
          { path: 'products/:id', component: ProductComponent},
          { path: 'taskrunner', component: RunTasksComponent },
          { path: 'orders', component: OrdersComponent }

      ]
  }

];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(Admin_Routes)
  ],
  declarations: [AdminComponent, DashboardComponent, CategoriesComponent, CategoryComponent,
     ProductsComponent, ProductComponent, RunTasksComponent, OrdersComponent]
})
export class AdminModule { }
