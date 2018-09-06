import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  userAuthSubscription: Subscription;
  userDataSubscription: Subscription;
  user: any;
  userFirstName = 'Tiskah Customer';
  carItemCount = 0;
  constructor(private authSvc: AuthService, private router: Router, private userSvc: UserService) {
  }

  ngOnInit() {
    this.userAuthSubscription = this.authSvc.userObservable.subscribe(
      (user) => {
        if (user) {
          // this.userDetails = user;
          console.log(user);
          this.user = user;
          if (user.displayName) {
            console.log(this.userSvc.userDetails);
            if (user.displayName.indexOf(' ') > -1) {
              this.userFirstName = user.displayName.split(' ')[0];
            } else {
              this.userFirstName = user.displayName;
            }
          } else {
            this.userFirstName = this.authSvc.tempUserFirstName;
          }
        } else {
          console.log('authState is Null');
          // this.userDetails = null;
          this.user = null;
        }
        console.log('event emmiter fired');
        // this.userChangeEvent.emit(this.userDetails);
      }
    );
    this.userDataSubscription = this.userSvc.userDataEventEmmiter.subscribe((res: User) => {
      console.log(res, 'From Menu');
      this.carItemCount = res.cart.length;
    })
  }
  ngOnDestroy(): void {
    this.userAuthSubscription.unsubscribe();
  }
  signOut() {
    this.authSvc.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
