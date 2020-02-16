import { Injectable, Inject } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Cart } from '../models/cart';
import { Global } from 'src/app/global';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
// tslint:disable: no-string-literal
export class CartService {

  public data: any = [];
  globalVariable = Global;

  private myCartItems: CartItem[] = [];

  constructor(private storage: StorageService) { }

  async addToCart(cartItem: CartItem) {
    try {
      this.myCartItems.push(cartItem);
      this.globalVariable.myCart = new Cart(this.myCartItems);
      this.storage.saveInLocal('myCart', this.globalVariable.myCart);
      this.data['myCart'] = this.storage.getFromLocal('myCart');
      console.log(this.data);
    } catch (e) {
      console.log(e);
    }
  }

  async clearCart() {
    try {
      const myCartItems2: CartItem[] = [];
      this.myCartItems = myCartItems2;
      this.globalVariable.myCart = new Cart(this.myCartItems);
      this.storage.saveInLocal('myCart', this.globalVariable.myCart);
    } catch (e) {
      console.log(e);
    }
  }

  async changeQuantity(cartItemProductId: number, change: number) {
    try {
      const index = this.globalVariable.myCart.myCartItems.findIndex(e => e.product.id === cartItemProductId);
      this.globalVariable.myCart.myCartItems[index].quantity += change;
      // this.saveInLocal('myCart', this.globalVariable.myCart);
      const quantity = this.globalVariable.myCart.myCartItems[index].quantity;
      console.log('in removeFrom CArt with quantity ' + quantity + 'for '
      + this.globalVariable.myCart.myCartItems[index].product.productName);
      if (quantity === 0) {
        this.globalVariable.myCart.myCartItems.splice(index, 1);
        console.log('removed ' + JSON.stringify(cartItemProductId));
      }
      this.storage.saveInLocal('myCart', this.globalVariable.myCart);
    } catch (e) {
      console.log(e);
    }
  }

  async removeFromCart(cartItem: CartItem) {
    // this.data['myCart'] = this.storage.getFromLocal('myCart');
    const index = this.globalVariable.myCart.myCartItems.findIndex((e) => e.product.id === cartItem.product.id);
    this.globalVariable.myCart[index].quantity -= 1;
    const quantity = this.globalVariable.myCart[index].quantity;
    console.log('in removeFrom CArt with quantity ' + quantity + 'for ' + cartItem.product.productName);
    if (quantity === 0) {
      this.globalVariable.myCart.myCartItems.splice(index, 1);
      console.log('removed ' + JSON.stringify(cartItem));
    }
    this.storage.saveInLocal('myCart', this.globalVariable.myCart);
  }

}
