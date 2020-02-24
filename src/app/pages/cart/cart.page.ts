import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Global } from 'src/app/global';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  globalVariable = Global;
  shippingCharge = false;
  constructor( public cartService: CartService,
               public toastController: ToastController,
               private router: Router) { }

  ngOnInit() {
    if (this.globalVariable.myCart.getTotalCartPrice() === 0) {
      this.presentToast('Let\'s add few item to cart first (-.-)');
      this.router.navigate(['']);
    }
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
    this.cartService.clearCart();
  }

}
