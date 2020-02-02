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
              public toastController: ToastController,
              private route: ActivatedRoute,
              private cart: CartService) {
    this.quantityForm = new FormGroup({
      quantity: new FormControl('', [
        Validators.required
      ])
    });
  }

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
      console.log(this.product);
      await this.getProductVariety();
      await this.peopleAlsoBought();
    });
    }
    changeQuantity(change) {
      this.cart.changeQuantity(this.cartItem.product.id, change);
    }

  async getProductVariety() {
    this.productVarieties = await this.shoppingService.getProductVarietyByProductId(this.pId);
    this.productVarieties.forEach(element => {
      this.quantityDict.set(element.id, element);
    });
    }

  async peopleAlsoBought() {
      try {
        this.items = await this.shoppingService.peopleAlsoBought(this.product.category);
      } catch (e) {
        console.log(e);
      }
    }
    addToBasket() {
      if (this.productVarieties.length !== 0 || this.choosedProductVariety === null || this.choosedProductVariety === undefined) {
        // console.log('************ showing basket details ************' + this.choosedProductVariety);
        this.cartItem.productVariety = this.quantityDict.get(this.choosedProductVariety);
      } else {
        this.cartItem.productVariety.id = 0;
        this.cartItem.productVariety.productId = this.product.id;
        this.cartItem.productVariety.productPrice = this.product.productPrice;
        this.cartItem.productVariety.productQuantity = 0;
        this.cartItem.productVariety.quantityType = 'default';
        this.choosedProductVariety = 1000;
      }
      this.cartItem.product = this.product;
      this.cartItem.quantity = 1;
      if (this.choosedProductVariety === 0) {
        // toast message
        this.presentToast('Please choose quantity of item');
        console.log('Please choose quantity for the item.');
      } else {
        this.cart.addToCart(this.cartItem);
      }
    }


}
