import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout-status',
  templateUrl: './checkout-status.component.html',
  styleUrls: ['./checkout-status.component.css']
})
export class CheckoutStatusComponent implements OnInit {
  status: string;
  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      if (params.statusname.toString() === 'success') {
        this.status = 'success';
      } else {
        this.status = 'fail';
      }
    });
  }

}
