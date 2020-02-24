import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { Global } from 'src/app/global';
import { ToastController } from '@ionic/angular';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { filter, pairwise, startWith, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit, OnDestroy {

  myOrders: Order[] = [];
  public destroyed = new Subject<any>();
  globalVariable = Global; error;
  showOrders = false;
  constructor(private orderService: OrderService, private router: Router,
              public toastController: ToastController) { }

  ngOnInit() {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      pairwise(),
      filter((events: RouterEvent[]) => events[0].url === events[1].url),
      startWith('Initial call'),
      takeUntil(this.destroyed)
    ).subscribe(() => {
      this.getOrderByUserId();
    });
    if (this.globalVariable.loggedIn) {
    console.log('bla bla in my-orders');
    this.getOrderByUserId();
  } else {
    this.presentToast('Please login first to view your orders.');
    this.router.navigateByUrl(`/tabs/login`);
  }
  }
  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
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
      console.log('here with id - ' + this.globalVariable.loggedInUser.id);
      this.myOrders = await this.orderService.getOrderByUserId(this.globalVariable.loggedInUser.id);
      console.log(this.myOrders);
      if (this.myOrders.length > 0) {
        this.showOrders = true;
      } else {
        this.error = 'Something bad happened in getOrderByUserId';
      }
    }

  }

}
