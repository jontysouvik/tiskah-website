import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
// import { AuthModule } from './auth/auth.module';
import { Routes, RouterModule } from '@angular/router';
import { AdressesComponent } from './adresses/adresses.component';
const User_Routes: Routes = [
  {
    path: '', component: UserComponent, children: [
      { path: '', component: AdressesComponent },
      { path: 'auth', loadChildren: './auth/auth.module#AuthModule' }
    ]
  }

];
@NgModule({
  imports: [
    CommonModule,
    // AuthModule,
    RouterModule.forChild(User_Routes)
  ],
  declarations: [UserComponent, AdressesComponent]
})
export class UserModule { }
