import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/global';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { Cart } from 'src/app/models/cart';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CartItem } from 'src/app/models/cart-item';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  shippingForm;
  order: Order = {
    id: 0,
    userId: 0,
    cart: new Cart({
      myCartItems: [{
        product: {
                  id: '',
                  category: '',
                  subcategory: '',
                  productName: '',
                  productCompany: '',
                  productPrice: '',
                  productPriceBeforeDiscount: '',
                  productDescription: '',
                  productImage1: '',
                  productImage2: '',
                  productImage3: '',
                  shippingCharge: '',
                  productAvailability: '',
                  postingDate: new Date(),
                  updationDate: new Date()
        },
        productVariety: {
                id: '',
                productId: '',
                quantityType: '',
                productQuantity: '',
                productPrice: ''
                },
        quantity: 0
      }],
      getTotalCartPrice: () => 0,
      getQuantity: (product: Product) => 0,
      getTotalItemCount: () => 0,
      getTotalDiscountPrice: () => 0
    }),
    orderDate: '',
    paymentMethod: '',
    shippingAddress: '',
    landMark: '',
    shippingState: '',
    shippingCity: '',
    shippingPincode: 0,
    contactno: 0,
    orderStatus: ''
  };
  constructor(public toastController: ToastController,
              private router: Router,
              private storage: StorageService,
              private orderService: OrderService) {
    this.shippingForm = new FormGroup({
      shippingAddress: new FormControl('', [
        Validators.required
      ]),
      landMark: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z& -]+')
      ]),
      shippingState: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z& -]+')
      ]),
      shippingCity: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z& -]+')
      ]),
      shippingPincode: new FormControl('', [
        Validators.required,
        Validators.pattern('7216+[0-9]{2}')
      ])
    });
  }
  globalVariable = Global;
  ngOnInit() {
  }
  async presentToast(toastMessage) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 2000
    });
    toast.present();
  }

  logForm() {
    console.log(this.globalVariable.loggedInUser);
    if (this.globalVariable.loggedInUser.name === '') {
      this.presentToast('Name can not be empty :(');
    } else if (this.globalVariable.loggedInUser.shippingAddress === '') {
      this.presentToast('Shipping Address can not be empty :(');
    } else if (this.globalVariable.loggedInUser.landMark === '') {
      this.presentToast('Landmark can not be empty :(');
    } else if (this.globalVariable.loggedInUser.shippingCity === '') {
      this.presentToast('City can not be empty :(');
    } else if (this.globalVariable.loggedInUser.shippingState === '') {
      this.presentToast('State can not be empty :(');
    } else if (!(this.globalVariable.availableLocation.includes(this.globalVariable.loggedInUser.shippingPincode))) {
      this.presentToast('Sorry we do not serve on this location yet. :(');
    } else {
      console.log('lets order!' + JSON.stringify(this.globalVariable.myCart, null, 2)
        + ' ********************************' + JSON.stringify(this.shippingForm.value, null, 2));
      this.placeOrder();
    }
  }

  async placeOrder() {
    this.order.userId = this.globalVariable.loggedInUser.id;
    // this.order.paymentMethod = this.placeOrderForm.value.paymentMethod;
    this.order.paymentMethod = 'Cash On Delivery';
    this.order.cart = this.globalVariable.myCart;
    this.order.contactno = this.globalVariable.loggedInUser.contactno;
    this.order.landMark = this.globalVariable.loggedInUser.landMark;
    this.order.shippingAddress = this.globalVariable.loggedInUser.shippingAddress;
    this.order.shippingCity = this.globalVariable.loggedInUser.shippingCity;
    this.order.shippingPincode = this.globalVariable.loggedInUser.shippingPincode;
    this.order.shippingState = this.globalVariable.loggedInUser.shippingState;
    const orderMsg: string = await this.orderService.placeOrder(this.order);
    console.log(orderMsg);
    const myCartItems: CartItem[] = [];
    this.globalVariable.myCart = new Cart(myCartItems);
    this.storage.saveInLocal('myCart', this.globalVariable.myCart);
    this.presentToast(orderMsg);
    this.router.navigateByUrl(`/tabs/myProfile`);
  }
}
