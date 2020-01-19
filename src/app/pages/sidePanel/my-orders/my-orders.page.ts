import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { Global } from 'src/app/global';
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {

  myOrders: Order[];
  globalVariable = Global; error;
  showOrders = false;
  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

  async getOrderByUserId() {
    // this.myOrders = null;
    this.showOrders = false;
    if (this.globalVariable.loggedIn) {
    this.myOrders = await this.orderService.getOrderByUserId(this.globalVariable.loggedInUser.id);
    if (this.myOrders.length > 0) {
      this.showOrders = true;
    } else {
      this.error = 'Something bad happened in getOrderByUserId';
    }
  }

  }

}
