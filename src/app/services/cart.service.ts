import { Injectable, Inject } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Cart } from '../models/cart';
import { Storage } from '@ionic/storage';
import { Global } from 'src/app/global';
@Injectable({
  providedIn: 'root'
})
// tslint:disable: no-string-literal
export class CartService {

  public data: any = [];
  globalVariable = Global;

  public myCartItems: CartItem[] = [];

  constructor(private storage: Storage) { }



  async getFromLocal(key) {
    this.data[key] = this.storage.get(key);
  }
  async saveInLocal(key, val) {
    this.storage.set(key, val);
  }

  async addToCart(cartItem: CartItem) {
    try {
      this.myCartItems.push(cartItem);
      this.globalVariable.myCart = new Cart(this.myCartItems);
      this.saveInLocal('myCart', this.globalVariable.myCart);
      this.getFromLocal('myCart');
      console.log(this.data);
    } catch (e) {
      console.log(e);
    }
  }

  async changeQuantity(cartItem: CartItem, change: number) {
    try {
      const index = this.globalVariable.myCart.myCartItems.findIndex(e => e.product.id === cartItem.product.id);
      this.globalVariable.myCart.myCartItems[index].quantity += change;
      // this.saveInLocal('myCart', this.globalVariable.myCart);
      const quantity = this.globalVariable.myCart.myCartItems[index].quantity;
      console.log('in removeFrom CArt with quantity ' + quantity + 'for '
      + this.globalVariable.myCart.myCartItems[index].product.productName);
      if (quantity === 0) {
        this.globalVariable.myCart.myCartItems.splice(index, 1);
        console.log('removed ' + JSON.stringify(cartItem));
      }
      this.saveInLocal('myCart', this.globalVariable.myCart);
    } catch (e) {
      console.log(e);
    }
  }

  async removeFromCart(cartItem: CartItem) {
    this.getFromLocal('myCart');
    // this.myCart  = this.data['myCart'];
    const index = this.globalVariable.myCart.myCartItems.findIndex((e) => e.product.id === cartItem.product.id);
    this.globalVariable.myCart[index].quantity -= 1;
    const quantity = this.globalVariable.myCart[index].quantity;
    console.log('in removeFrom CArt with quantity ' + quantity + 'for ' + cartItem.product.productName);
    if (quantity === 0) {
      this.globalVariable.myCart.myCartItems.splice(index, 1);
      console.log('removed ' + JSON.stringify(cartItem));
    }
    this.saveInLocal('myCart', this.globalVariable.myCart);
  }

}
