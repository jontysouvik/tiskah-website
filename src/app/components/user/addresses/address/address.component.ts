import { Component, OnInit } from '@angular/core';
import { Address } from '../../../../models/address';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../../../models/user';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  address: Address;
  activeRouteSubscription: Subscription;
  constructor(private userSvc: UserService, private router: Router, private activeRoute: ActivatedRoute) {
    this.address = new Address();
  }

  ngOnInit() {
    this.activeRouteSubscription = this.activeRoute.params.subscribe(params => {
      if (params.id.toString() !== '0') {
        for (let index = 0; index < this.userSvc.userDetails.addresses.length; index++) {
          const addressUser = this.userSvc.userDetails.addresses[index];
          if (addressUser.id.toString() === params.id.toString()) {
            console.log(addressUser, 'Address Component');
            this.address = addressUser;
          }
        }
      }
    });
  }
  onSubmit(form: NgForm) {
    if (form.valid) {
      if (!this.address.id) {
        this.address.id = new Date().getTime();
      }
      if (!this.address.country) {
        this.address.country = 'India';
      }
      if (!this.address.email) {
        this.address.email = this.userSvc.userDetails.email;
      }
      this.userSvc.saveAddress(this.address).then(() => {
        this.router.navigate(['/user', 'addresses']);
      });
    }
  }
}
