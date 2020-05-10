import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductVariety } from 'src/app/models/product-variety';
import { CartItem } from 'src/app/models/cart-item';
import { ShoppingService } from 'src/app/services/shopping.service';
import { CartService } from 'src/app/services/cart.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Global } from 'src/app/global';
import { ToastController } from '@ionic/angular';
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
  pId = 0;
  cartItem: CartItem = {
    product: {
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
  choosedProductVariety = 0;
  quantityDict = new Map<number, ProductVariety>();
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
              public toastController: ToastController,
              private route: ActivatedRoute,
              private cart: CartService) {  }

  async presentToast(toastMessage) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 2000
    });
    toast.present();
  }

  async ngOnInit() {
    await this.route.queryParams.subscribe(async queryParams => {
      // tslint:disable: no-string-literal
      this.pId = Number(queryParams['thisId']);
      this.product = await this.shoppingService.getProductByProductId(this.pId);
      await this.getProductVariety();
      if (this.productVarieties.length !== 0) {
        this.choosedProductVariety = this.productVarieties[0].id;
      }
    });
    }

  async getProductVariety() {
    this.productVarieties = await this.shoppingService.getProductVarietyByProductId(this.pId);
    this.productVarieties.forEach(element => {
      this.quantityDict.set(element.id, element);
    });
    }

    outOfStock() {
      this.presentToast('This item is currently unavailable :(');
    }

    addToBasket() {
      // tslint:disable-next-line: prefer-const
      let cartItemToAdd: CartItem = {
        product: {
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
      if (this.productVarieties.length !== 0 || this.choosedProductVariety === null || this.choosedProductVariety === undefined) {
        // console.log('************ showing basket details ************' + this.choosedProductVariety);
        cartItemToAdd.productVariety = this.quantityDict.get(this.choosedProductVariety);
      } else {
        cartItemToAdd.productVariety.id = 0;
        cartItemToAdd.productVariety.productId = this.product.id;
        cartItemToAdd.productVariety.productPrice = this.product.productPrice;
        cartItemToAdd.productVariety.productQuantity = 0;
        cartItemToAdd.productVariety.quantityType = 'default';
        this.choosedProductVariety = 1000;
      }
      cartItemToAdd.product = this.product;
      cartItemToAdd.quantity = 1;
      if (this.choosedProductVariety === 0) {
        // toast message
        this.presentToast('Please choose quantity of item');
        // console.log('Please choose quantity for the item.');
      } else {
        this.cart.addToCart(cartItemToAdd);
      }
    }
    changeQuantity(change) {
      if (this.productVarieties == null || this.productVarieties === undefined || this.productVarieties.length === 0) {
        this.cart.changeQuantity(this.product.id, undefined, change);
      } else {
        this.cart.changeQuantity(this.product.id, this.quantityDict.get(this.choosedProductVariety).id, change);
      }
    }

}
