import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/cart';
import { Global } from 'src/app/global';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item';
import { StorageService } from 'src/app/services/storage.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  globalVariable = Global;
  myCart: Cart = {
    myCartItems: null,
    getTotalCartPrice: () => 0,
    getTotalItemCount: () => 0,
    getQuantity: () => 0,
    totalCartPrice: 0,
    getTotalDiscountPrice: () => 0
  };
  constructor( private storage: StorageService, public toastController: ToastController, private router: Router) { }

  ngOnInit() {
    this.myCart = this.globalVariable.myCart;
    console.log(this.myCart);
  }
  async presentToast(toastMessage) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 2000
    });
    toast.present();
  }
  checkout() {
    if (this.globalVariable.loggedIn) {
      this.router.navigateByUrl(`/tabs/checkout`);
    } else {
      this.presentToast('Please login before checking out');
      this.router.navigateByUrl(`/tabs/login`);
    }
  }

  clearCart() {
    const myCartItems: CartItem[] = [];
    this.globalVariable.myCart = new Cart(myCartItems);
    this.storage.saveInLocal('myCart', this.globalVariable.myCart);
  }

}
