import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { Global } from 'src/app/global';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {

  myOrders: Order[] = [];
  globalVariable = Global; error;
  showOrders = false;
  constructor(private orderService: OrderService, private router: Router,
              public toastController: ToastController) { }

  ngOnInit() {
    if (this.globalVariable.loggedIn) {
    console.log('bla bla in my-orders');
    this.getOrderByUserId();
  } else {
    this.presentToast('Please login first to view your orders.');
    this.router.navigateByUrl(`/tabs/login`);
  }
  }
  async presentToast(toastMessage) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 2000
    });
    toast.present();
  }

  async getOrderByUserId() {
    // this.myOrders = null;
    this.showOrders = false;
    if (this.globalVariable.loggedIn) {
      console.log('here ' + this.globalVariable.loggedInUser.id);
      this.myOrders = await this.orderService.getOrderByUserId(4);
      console.log(this.myOrders);
      if (this.myOrders.length > 0) {
        this.showOrders = true;
      } else {
        this.error = 'Something bad happened in getOrderByUserId';
      }
    }

  }

}
