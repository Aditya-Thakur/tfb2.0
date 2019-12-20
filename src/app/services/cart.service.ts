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
  public myCart: Cart = {
    myCartItems: [{
      product: {
        id: 0,
        category: 0,
        subcategory: 0,
        productName: '',
        productCompany: '',
        productPrice: 0,
        productPriceBeforeDiscount: 0,
        productDescription: '',
        productImage1: '',
        productImage2: '',
        productImage3: '',
        shippingCharge: 0,
        productAvailability: '',
        postingDate: new Date(),
        updationDate: new Date(),
        priceVarietyAvailable: false
      },
      productVariety: {
        id: 0,
      productId: 0,
      quantityType: '',
      productQuantity: 0,
      productPrice: 0
      },
      quantity: 0
    }],
    getTotalCartPrice: () => 0,
    getTotalItemCount: () => 0,
    getQuantity: () => 0,
    totalCartPrice: 0,
    getTotalDiscountPrice: () => 0
  };

  public myCartItems: CartItem[] = [];

  constructor(private storage: Storage) {
    this.getMyCart();
  }

  getMyCart(): Cart {
    this.getFromLocal('myCart');
    this.myCart  = this.data['myCart'];
    console.log('*******');
    // if (this.myCart == null) {
    //   console.log('#####');
    //   this.myCart = {
    //     myCartItems: [{
    //       product: {
    //         id: 0,
    //         category: 0,
    //         subcategory: 0,
    //         productName: '',
    //         productCompany: '',
    //         productPrice: 0,
    //         productPriceBeforeDiscount: 0,
    //         productDescription: '',
    //         productImage1: '',
    //         productImage2: '',
    //         productImage3: '',
    //         shippingCharge: 0,
    //         productAvailability: '',
    //         postingDate: new Date(),
    //         updationDate: new Date(),
    //         priceVarietyAvailable: false
    //       },
    //       productVariety: {
    //         id: 0,
    //       productId: 0,
    //       quantityType: '',
    //       productQuantity: 0,
    //       productPrice: 0
    //       },
    //       quantity: 0
    //     }],
    //     getTotalCartPrice: () => 0,
    //     getTotalItemCount: () => 0,
    //     getQuantity: () => 0,
    //     totalCartPrice: 0,
    //     getTotalDiscountPrice: () => 0};
    // }
    return this.myCart;
  }

  async getFromLocal(key) {
    this.data[key] = this.storage.get(key);
  }
  async saveInLocal(key, val) {
    this.storage.set(key, val);
  }

  async addToCart(cartItem: CartItem) {
    this.getMyCart();
    try {
      this.myCart.myCartItems.push(cartItem);
    //   const index = this.myCart.myCartItems.findIndex(e => e.product.id === cartItem.product.id);
    //   if (index === -1) {
    //     this.myCart.myCartItems.push(cartItem);
    //   } else {
    //     this.myCart.myCartItems[index].quantity += 1;
    // }
      this.saveInLocal('myCart', this.myCart);
      console.log(this.myCart);
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
