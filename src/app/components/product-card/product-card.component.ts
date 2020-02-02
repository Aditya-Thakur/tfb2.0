import { Component, OnInit, Input } from '@angular/core';
import { ProductVariety } from 'src/app/models/product-variety';
import { ShoppingService } from 'src/app/services/shopping.service';
import { Product } from 'src/app/models/product';
import { CartItem } from '../../models/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { Global } from 'src/app/global';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {

  // tslint:disable: no-input-rename
  @Input('product') product: Product;
  globalVariable = Global;
  productVarieties: ProductVariety[] = [];
  quantityDict = new Map<number, ProductVariety>();
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

  constructor(private shoppingService: ShoppingService,
              public toastController: ToastController,
              private cart: CartService,
              private router: Router) {}


  ngOnInit() {
    this.getProductVariety();
  }

  async getProductVariety() {
    this.productVarieties = await this.shoppingService.getProductVarietyByProductId(this.product.id);
    this.productVarieties.forEach( element => {
      this.quantityDict.set(element.id, element);
    });
    console.log(this.quantityDict);
  }

  async presentToast(toastMessage) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 2000
    });
    toast.present();
  }

  addToBasket() {
    if (this.productVarieties.length !== 0 || this.choosedProductVariety == null || this.choosedProductVariety == undefined) {
      console.log('************ showing basket details ************' + this.choosedProductVariety);
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
  onQuantitySelection() {
    if (this.productVarieties.length !== 0) {
      console.log(this.choosedProductVariety);
    }
  }
  changeQuantity(change) {
    // if (this.productVarieties != null) {
    //   this.choosedProductVariety = this.quantityForm.value.quantity;
    // }
    this.cart.changeQuantity(this.cartItem.product.id, change);
  }

  async showDetails(productId) {
    console.log('************ showing details ************');
    await this.switchPage(productId);
    this.router.navigate(['/tabs/details'], { queryParams: { thisId: productId } });
    // this.router.navigate(['/tabs/details', {item: product}]);
  }

  switchPage(productId) {
    this.router.navigate(['/tabs/details'], { queryParams: { thisId: productId } });
  }

}
