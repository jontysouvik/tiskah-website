import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  userAuthSubscription: Subscription;
  user: any;
  userFirstName = 'Tiskah Customer';
  constructor(private authSvc: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.userAuthSubscription = this.authSvc.userObservable.subscribe(
      (user) => {
        if (user) {
          // this.userDetails = user;
          console.log(user);
          this.user = user;
          if (user.displayName) {
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
