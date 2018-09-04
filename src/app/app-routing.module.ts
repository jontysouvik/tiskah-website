import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
// import { ItemsComponent } from './components/items/items.component';

const routes: Routes = [
  { path: '', redirectTo: 'shop', pathMatch: 'full' },
  { path: 'shop', component: HomeComponent },
  { path: 'admin', loadChildren: './components/admin/admin.module#AdminModule' },
  { path: 'user', loadChildren: './components/user/user.module#UserModule' },
  { path: 'products', loadChildren: './components/products/products.module#ProductsModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
