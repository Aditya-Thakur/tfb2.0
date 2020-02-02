import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/cart';
import { Global } from 'src/app/global';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item';

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
  constructor(private cart: CartService, private router: Router) { }

  ngOnInit() {
    this.myCart = this.globalVariable.myCart;
    console.log(this.myCart);
  }
  checkout() {
    this.router.navigateByUrl(`/tabs/checkout`);
  }

  clearCart() {
    const myCartItems: CartItem[] = [];
    this.globalVariable.myCart = new Cart(myCartItems);
  }

}
