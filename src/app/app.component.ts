import { Component, OnInit } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { Storage } from '@ionic/storage';
import { Global } from 'src/app/global';
import { StorageService } from './services/storage.service';
import { Cart } from './models/cart';

// tslint:disable: no-string-literal
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public data: any = [];
  globalVariable = Global;
  constructor(
    private storage: StorageService,
    private platform: Platform,
    public toastController: ToastController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
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
    if (window.innerWidth > 768) {
      window.open('https://d.theflyingbasket.com/', '_self');
    }

    this.globalVariable.loggedInUser.id = 0;
    this.data['loggedInUser'] = await this.storage.getFromLocal('loggedInUser');
    this.data['myCart'] = await this.storage.getFromLocal('myCart');
    this.globalVariable.loggedInUser = this.data['loggedInUser'];
    if (this.globalVariable.loggedInUser.id !== 0) {
      this.globalVariable.loggedIn = true;
      this.presentToast('Welcome back ' + Global.loggedInUser.name);
    }
    if (this.data['myCart']['myCartItems'][0]['product']['id'] !== 0) {
      // this.globalVariable.myCart = this.data['myCart'];
      this.globalVariable.myCart = new Cart(this.data['myCart']['myCartItems']);
    }
  }
}
