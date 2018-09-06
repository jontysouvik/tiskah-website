import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
// import { AuthModule } from './auth/auth.module';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { AddressesComponent } from './addresses/addresses.component';
import { AddressComponent } from './addresses/address/address.component';
import { FormsModule } from '@angular/forms';
const User_Routes: Routes = [
  {
    path: '', component: UserComponent, children: [
      { path: '', component: ProfileComponent, pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent },
      { path: 'cart', component: CartComponent},
      { path: 'auth', loadChildren: './auth/auth.module#AuthModule' }
    ]
  }

];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(User_Routes)
  ],
  declarations: [UserComponent, CartComponent, ProfileComponent, AddressesComponent, AddressComponent]
})
export class UserModule { }
