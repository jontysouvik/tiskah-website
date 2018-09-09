import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RecoverEmailComponent } from './recover-email/recover-email.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
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
  declarations: [AuthComponent, SignUpComponent, SignInComponent, ResetPasswordComponent, RecoverEmailComponent, VerifyEmailComponent]
})
export class AuthModule { }
