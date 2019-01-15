import { Component, OnInit } from '@angular/core';
import { Address } from '../../../models/address';
import { UserService } from '../../../services/user.service';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {
  addresses: Address[] = [];
  userSubscription: Subscription;
  constructor(private userSvc: UserService, private router: Router) { }

  ngOnInit() {
    this.addresses = this.userSvc.userDetails.addresses;
    this.userSubscription = this.userSvc.userDataEventEmmiter.subscribe((res: User) => {
      this.addresses = res.addresses;
    });
  }
  makeDefault(address: Address) {
    this.userSvc.makeAddressDefault(address).then(() => {

    });
  }
  onEdit(address: Address) {
    this.router.navigate(['/user', 'address', address.id.toString()]);
  }
}
