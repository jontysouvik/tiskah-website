import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private orderSvc: OrderService) { }

  ngOnInit() {
    this.orderSvc.getOrdersforAdmin().subscribe((orders: Order[]) => {
      console.log(orders);
    });
  }

}
