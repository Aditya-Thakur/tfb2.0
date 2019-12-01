import { Component, OnInit, Input } from '@angular/core';
import { ProductVariety } from 'src/app/models/product-variety';
import { ShoppingService } from 'src/app/services/shopping.service';
import { Product } from 'src/app/models/product';
import { CartItem } from '../../models/cart-item';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {

   // tslint:disable: no-input-rename
   @Input('product') product: Product;
  productVarieties: ProductVariety[];
  quantityForm;

  constructor(private shoppingService: ShoppingService, private cart: CartService) {
    this.quantityForm = new FormGroup({
      quantity: new FormControl('', [
        Validators.required
      ])
    });
  }

  ngOnInit() {
    this.getProductVariety();
  }

  async getProductVariety() {
    this.productVarieties = await this.shoppingService.getProductVarietyByProductId(this.product.id);
    console.log(this.productVarieties);
  }

  addToBasket(product: Product) {
    // tslint:disable-next-line: prefer-const
    let cartItem: CartItem;
    cartItem.product = product;
    cartItem.productVariety = this.quantityForm.quantity;
    cartItem.quantity = 1;
    if (cartItem.productVariety == null) {
      // toast message
      console.log('Please choose quantity for the item.');
    } else {
      this.cart.addToCart(cartItem);
    }
  }

}
