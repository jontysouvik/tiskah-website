import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private router: Router, private authSvc: AuthService) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    console.log(form);
    this.authSvc.signUpUserWithEmailAndPassword(form.value.email, form.value.password).then((res) => {
      console.log(res);
      this.authSvc.updateUserProfile(form.value.name).then(() => {
        this.authSvc.sendVerificationEmail().then((emailres) => {
          console.log(emailres, 'After sending email');
          this.router.navigate(['/']);
        });
      });

    });
  }
  goToSignIn() {
    this.router.navigate(['/user', 'auth', 'signin']);
  }
}
