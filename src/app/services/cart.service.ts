import { Injectable, Inject } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Cart } from '../models/cart';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
// tslint:disable: no-string-literal
export class CartService {

  public data: any = [];
  public myCart: Cart;
  public myCartItems: CartItem[] = [];

  constructor(private storage: Storage) {
    this.getMyCart();
  }

  getMyCart(): Cart {
    this.getFromLocal('myCart');
    this.myCart  = this.data['myCart'];
    return this.myCart;
  }

  async getFromLocal(key) {
    this.data[key] = this.storage.get(key);
  }
  async saveInLocal(key, val) {
    this.storage.set(key, val);
  }

  async addToCart(cartItem: CartItem) {
    this.getFromLocal('myCart');
    this.myCart  = this.data['myCart'];
    try {
      const index = this.myCart.myCartItems.findIndex(e => e.product.id === cartItem.product.id);
      if (index === -1) {
        this.myCart.myCartItems.push(cartItem);
      } else {
        this.myCart.myCartItems[index].quantity += 1;
      }
      this.saveInLocal('myCart', this.myCart);
    } catch (e) {
      console.log(e);
    }
  }

  async removeFromCart(cartItem: CartItem) {
    this.getFromLocal('myCart');
    this.myCart  = this.data['myCart'];
    const index = this.myCart.myCartItems.findIndex((e) => e.product.id === cartItem.product.id);
    const quantity = this.myCart[index].quantity -= 1;
    if (quantity === 0) {
      this.myCart.myCartItems.splice(index, 1);
    }
    this.saveInLocal('myCart', this.myCart);
  }

}
