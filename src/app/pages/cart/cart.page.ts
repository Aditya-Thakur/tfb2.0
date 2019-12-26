import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  myCart: Cart = {
    myCartItems: null,
    getTotalCartPrice: () => 0,
    getTotalItemCount: () => 0,
    getQuantity: () => 0,
    totalCartPrice: 0,
    getTotalDiscountPrice: () => 0
  };
  constructor(private cart: CartService) { }

  ngOnInit() {
    // this.myCart = this.cart.getMyCart();
  }

}
