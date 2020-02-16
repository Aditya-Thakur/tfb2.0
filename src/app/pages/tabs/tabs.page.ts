import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Global } from 'src/app/global';
import { StorageService } from 'src/app/services/storage.service';
import { Cart } from 'src/app/models/cart';
import { CartItem } from 'src/app/models/cart-item';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  private currentColor: string;
  globalVariable = Global;
  constructor(private router: Router, private menu: MenuController, private storage: StorageService) {
    this.currentColor = 'success';
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  ngOnInit() {
  }

  openSearch() {
    this.router.navigateByUrl(`/tabs/search`);
  }

  openLogin() {
    this.router.navigateByUrl(`/tabs/login`);
    this.menu.toggle();
  }

  openHome() {
    this.router.navigateByUrl(`/tabs/main`);
    this.menu.toggle();
  }
  openHomeByIcon() {
    this.router.navigateByUrl(`/tabs/main`);
  }

  openPage(pageName) {
    this.router.navigateByUrl(`/tabs/` + pageName);
    this.menu.toggle();
  }
  openPage2(pageName) {
    this.router.navigateByUrl(`/tabs/` + pageName);
    // this.menu.toggle();
  }
  logout() {
    const loggedOutUser = {
      id: 0,
      name: '',
      email: '',
      contactno: 0,
      password: '',
      shippingAddress: '',
      landMark: '',
      shippingState: '',
      shippingCity: '',
      shippingPincode: 0,
      billingAddress: '',
      billingState: '',
      billingCity: '',
      billingPincode: 0,
      regDate: '',
      updationDate: '',
      ip: '',
      message: ''
    };
    const lostCart = new Cart({
      myCartItems: new Array<CartItem>(),
      getTotalCartPrice: () => 0,
      getQuantity: (product: Product) => 0,
      getTotalItemCount: () => 0,
      getTotalDiscountPrice: () => 0
    });
    this.globalVariable.loggedIn = false;
    this.globalVariable.loggedInUser = loggedOutUser;
    this.globalVariable.myCart = lostCart;
    this.storage.clearAll();
  }

}
