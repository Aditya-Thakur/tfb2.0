import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductVariety } from 'src/app/models/product-variety';
import { CartItem } from 'src/app/models/cart-item';
import { ShoppingService } from 'src/app/services/shopping.service';
import { CartService } from 'src/app/services/cart.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  product: Product;
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

  constructor(private shoppingService: ShoppingService,
              private route: ActivatedRoute,
              private cart: CartService) {
    this.quantityForm = new FormGroup({
      quantity: new FormControl('', [
        Validators.required
      ])
    });
  }

  async ngOnInit() {
    await this.route.queryParams.subscribe(async queryParams => {
      // tslint:disable: no-string-literal
      const pId = Number(queryParams['thisId']);
      this.product = await this.shoppingService.getProductByProductId(pId);
      console.log(this.product);
      await this.getProductVariety();
    });
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


}
