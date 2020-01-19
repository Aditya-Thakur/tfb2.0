import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Global } from 'src/app/global';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public data: any = [];
  globalVariable = Global;
  constructor(
    private storage: Storage,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  async getFromLocal(key) {
    this.data[key] = this.storage.get(key);
  }
  async saveInLocal(key, val) {
    this.storage.set(key, val);
  }

  async initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    await this.getFromLocal('loggedInUser');
    await this.getFromLocal('myCart');
    // tslint:disable: no-string-literal
    this.globalVariable.loggedInUser = this.data['loggedInUser'];
    if (this.globalVariable.loggedInUser.id !== 0) {
      this.globalVariable.loggedIn = true;
    }
    console.log('Initializing app with data: ' + this.data);
    if (this.data.length !== 0) {
      if (this.data['myCart'].totalCartPrice !== 0) {
        this.globalVariable.myCart = this.data['myCart'];
      }
    }
  }
}
