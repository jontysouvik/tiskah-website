import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private router: Router, private authSvc: AuthService, private userSvc: UserService) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    console.log(form);
    let fName = '';
    if (form.value.name.indexOf(' ') > -1) {
      fName = form.value.name.split(' ')[0];
    } else {
      fName = form.value.name;
    }
    this.authSvc.tempUserFirstName = fName;
    this.authSvc.signUpUserWithEmailAndPassword(form.value.email, form.value.password).then((res) => {
      console.log(res);
      this.authSvc.updateUserProfile(form.value.name).then(() => {
        const newUser = new User();
        newUser.fullName = form.value.name;
        newUser.uid = res.user.uid;
        newUser.email = res.user.email;
        this.authSvc.addNewUserData(newUser).then((newUserRes) => {
          console.log(newUserRes, 'After newUserRes');
          this.userSvc.getUser(res.user);
          this.authSvc.sendVerificationEmail().then((emailres) => {
            console.log(emailres, 'After sending email');
            this.router.navigate(['/']);
          });
        });

      });

    });
  }
  goToSignIn() {
    this.router.navigate(['/user', 'auth', 'signin']);
  }
}
