import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
  imports: [
    CommonModule,
    AuthModule
  ],
  declarations: [UserComponent]
})
export class UserModule { }
