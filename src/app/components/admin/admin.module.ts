import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const Admin_Routes: Routes = [
  {
      path: '', component: AdminComponent, children: [
        {  path: '', component: DashboardComponent },
          { path: 'dashboard', component: DashboardComponent }

      ]
  }

];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(Admin_Routes)
  ],
  declarations: [AdminComponent, DashboardComponent]
})
export class AdminModule { }
