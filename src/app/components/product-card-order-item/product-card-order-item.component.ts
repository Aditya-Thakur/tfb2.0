import { Component, OnInit, Input } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { Global } from 'src/app/global';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-product-card-order-item',
  templateUrl: './product-card-order-item.component.html',
  styleUrls: ['./product-card-order-item.component.scss'],
})
export class ProductCardOrderItemComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('cartItem') cartItem: CartItem;
  globalVariable = Global;
  constructor(private cart: CartService) { }

  ngOnInit() {}

  removeFromBasket() {
  }

  changeQuantity(change) {
    this.cart.changeQuantity(this.cartItem.product.id, change);
  }

}
