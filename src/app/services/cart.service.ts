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

  async changeQuantity(cartItemProductId: number, cartItemProductVarietyId: number, change: number) {
    try {
      const index = this.globalVariable.myCart.myCartItems.findIndex(e =>
        (e.product.id === cartItemProductId) && (e.productVariety.id === cartItemProductVarietyId));
      this.globalVariable.myCart.myCartItems[index].quantity += change;
      const quantity = this.globalVariable.myCart.myCartItems[index].quantity;
      if (quantity === 0) {
        this.globalVariable.myCart.myCartItems.splice(index, 1);
      }
      const myCartItems2 = this.globalVariable.myCart.myCartItems;
      this.globalVariable.myCart = new Cart(myCartItems2);
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
    if (quantity === 0) {
      this.globalVariable.myCart.myCartItems.splice(index, 1);
    }
    this.storage.saveInLocal('myCart', this.globalVariable.myCart);
  }

}
