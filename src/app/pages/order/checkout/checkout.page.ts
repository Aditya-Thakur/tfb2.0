import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/global';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  shippingForm;
  constructor(public toastController: ToastController) {
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

              }
  }
}
