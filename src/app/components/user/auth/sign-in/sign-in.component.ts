import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { UtilitiesService } from '../../../../services/utilities.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  email: string;
  password: string;
  constructor(private router: Router, private authSvc: AuthService, private utilSvc: UtilitiesService) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    console.log(form);
    this.authSvc.signinWithEmailAndPassword(form.value.email, form.value.password).then((res) => {
      console.log(res);
      this.onCancel();
    });
  }
  goToSignUp() {
    this.router.navigate(['/user', 'auth', 'signup']);
  }
  onCancel() {
    this.router.navigate(this.utilSvc.getLastRouteAsArray());
  }
}
