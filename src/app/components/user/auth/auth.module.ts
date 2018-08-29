import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
const Auth_Routes: Routes = [
  {
      path: '', component: AuthComponent, children: [
        {  path: '', component: SignInComponent },
          { path: 'signup', component: SignUpComponent },
          { path: 'signin', component: SignInComponent}
      ]
  }

];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(Auth_Routes)
  ],
  declarations: [AuthComponent, SignUpComponent, SignInComponent]
})
export class AuthModule { }
