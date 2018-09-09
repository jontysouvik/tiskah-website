import { Component, OnInit } from '@angular/core';
import { Address } from '../../../models/address';
import { Subscription } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-checkout-main',
  templateUrl: './checkout-main.component.html',
  styleUrls: ['./checkout-main.component.css']
})
export class CheckoutMainComponent implements OnInit {
  addresses: Address[] = [];
  userSubscription: Subscription;
  constructor(private userSvc: UserService) { }

  ngOnInit() {
    this.addresses = this.userSvc.userDetails.addresses
    this.selectDefaultAddress();
    this.userSubscription = this.userSvc.userDataEventEmmiter.subscribe((res: User) => {
      this.addresses = res.addresses;
      this.selectDefaultAddress();
    });
  }
  selectDefaultAddress() {
    for (let index = 0; index < this.addresses.length; index++) {
      const address: any = this.addresses[index];
      if (address.isDefault) {
        address.isSelected = true;
      }
    }
  }
  onAddressSelect(selectedAddress) {
    for (let index = 0; index < this.addresses.length; index++) {
      const address: any = this.addresses[index];
      if (selectedAddress.id === address.id) {
        address.isSelected = true;
      } else {
        address.isSelected = false; 
      }
    }
  }
}
