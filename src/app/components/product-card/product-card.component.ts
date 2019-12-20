import { Component, OnInit, Input } from '@angular/core';
import { ProductVariety } from 'src/app/models/product-variety';
import { ShoppingService } from 'src/app/services/shopping.service';
import { Product } from 'src/app/models/product';
import { CartItem } from '../../models/cart-item';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

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
  cartItem: CartItem = {
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
  };

  constructor(private shoppingService: ShoppingService, private cart: CartService, private router: Router) {
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

  addToBasket() {
    this.cartItem.product = this.product;
    this.cartItem.productVariety = this.quantityForm.quantity;
    this.cartItem.quantity = 1;
    // if (this.cartItem.productVariety == null) {
    //   // toast message
    //   console.log('Please choose quantity for the item.');
    // } else {
    this.cart.addToCart(this.cartItem);
    // }
  }

  showDetails(productId) {
    console.log('************ showing details ************');
    this.router.navigate(['tabs/product-details'], {queryParams : {thisId: productId}});
  }

}
