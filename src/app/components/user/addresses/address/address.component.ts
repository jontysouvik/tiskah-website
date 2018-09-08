import { Component, OnInit } from '@angular/core';
import { Address } from '../../../../models/address';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  address: Address;
  constructor(private userSvc: UserService, private router: Router) {
    this.address = new Address();
  }

  ngOnInit() {
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
