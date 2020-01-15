import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductVariety } from 'src/app/models/product-variety';
import { CartItem } from 'src/app/models/cart-item';
import { ShoppingService } from 'src/app/services/shopping.service';
import { CartService } from 'src/app/services/cart.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Global } from 'src/app/global';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  items: Product[] = [
    {
      id: 0,
      category: 0,
      subCategory: 0,
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
    }
  ];
  product: Product = {
    id: 0,
    category: 0,
    subCategory: 0,
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
  };
  globalVariable = Global;
  productVarieties: ProductVariety[] = [];
  quantityForm;
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
      await this.peopleAlsoBought();
    });
    }

  async getProductVariety() {
      this.productVarieties = await this.shoppingService.getProductVarietyByProductId(this.product.id);
      console.log(this.productVarieties);
    }

  async peopleAlsoBought() {
      try {
        this.items = await this.shoppingService.peopleAlsoBought(this.product.category);
      } catch (e) {
        console.log(e);
      }
    }

  addToBasket() {
      // this.cartItem.product = this.product;
      // this.cartItem.productVariety = this.quantityForm.quantity;
      // this.cartItem.quantity = 1;
      // // if (this.cartItem.productVariety == null) {
      // //   // toast message
      // //   console.log('Please choose quantity for the item.');
      // // } else {
      // this.cart.addToCart(this.cartItem);
      // // }
    }


}
