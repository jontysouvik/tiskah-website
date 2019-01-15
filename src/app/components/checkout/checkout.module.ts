import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CheckoutMainComponent } from './checkout-main/checkout-main.component';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutStatusComponent } from './checkout-status/checkout-status.component';
const Checkout_Routes: Routes = [
  {
    path: '', component: CheckoutComponent, children: [
      { path: 'main', component: CheckoutMainComponent },
      { path: 'status', component: CheckoutStatusComponent },
      { path: '', pathMatch: 'full', redirectTo: 'main' }

    ]
  }

];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(Checkout_Routes)
  ],
  declarations: [CheckoutComponent, CheckoutMainComponent, CheckoutStatusComponent]
})
export class CheckoutModule { }
