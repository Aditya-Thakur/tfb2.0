import { Component, ViewChildren, QueryList, OnInit } from '@angular/core';
import {
  Platform, ToastController, IonRouterOutlet,
  ActionSheetController, PopoverController, ModalController, MenuController, AlertController
} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { Storage } from '@ionic/storage';
import { Global } from 'src/app/global';
import { StorageService } from './services/storage.service';
import { Cart } from './models/cart';
import { Router } from '@angular/router';

// tslint:disable: no-string-literal
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  public data: any = [];
  globalVariable = Global;
  constructor(
    private storage: StorageService,
    private platform: Platform,
    public toastController: ToastController,
    private splashScreen: SplashScreen,
    private actionSheetCtrl: ActionSheetController,
    private popoverCtrl: PopoverController,
    private statusBar: StatusBar,
    public modalCtrl: ModalController,
    private menu: MenuController,
    private alertController: AlertController,
    private router: Router
  ) {
    this.initializeApp();
    // Initialize BackButton Eevent.
    this.backButtonEvent();
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
    if (this.platform.is('android')) {
      this.statusBar.styleLightContent();
    }

    this.globalVariable.loggedInUser.id = 0;
    this.data['loggedInUser'] = await this.storage.getFromLocal('loggedInUser');
    this.data['myCart'] = await this.storage.getFromLocal('myCart');
    this.globalVariable.loggedInUser = this.data['loggedInUser'];
    if (this.globalVariable.loggedInUser.id !== 0) {
      this.globalVariable.loggedIn = true;
      this.presentToast('Welcome back ' + Global.loggedInUser.name);
    }
    if (this.data['myCart']['myCartItems'].length > 0) {
      // this.globalVariable.myCart = this.data['myCart'];
      console.log('trrrruuuuuuuueeeeeeeee');
      this.globalVariable.myCart = new Cart(this.data['myCart']['myCartItems']);
    }
  }

  // backButtonEvent() {
  //   this.presentToast('back clicked ' + (new Date().getTime()));
  //   this.platform.backButton.subscribeWithPriority(0, () => {
  //     this.presentToast('back clicked 2' + (new Date().getTime()));
  //     this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {
  //       if (this.router.url !== '/tabs/menu') {
  //         await this.router.navigate(['/tabs/menu']);
  //       } else if (this.router.url === '/tabs/menu') {
  //         if (new Date().getTime() - this.lastTimeBackPress >= this.timePeriodToExit) {
  //           this.lastTimeBackPress = new Date().getTime();
  //           this.presentAlertConfirm();
  //         } else {
  //           navigator['app'].exitApp();
  //         }
  //       }
  //     });
  //   });
  // }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      // header: 'Confirm!',
      message: 'Are you sure you want to exit the app?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => { }
      }, {
        text: 'Close App',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    });
    await alert.present();
  }

  // active hardware back button
  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {
      // close action sheet
      try {
        const element = await this.actionSheetCtrl.getTop();
        if (element) {
          element.dismiss();
          return;
        }
      } catch (error) {
      }
      // close popover
      try {
        const element = await this.popoverCtrl.getTop();
        if (element) {
          element.dismiss();
          return;
        }
      } catch (error) {
      }
      // close modal
      try {
        const element = await this.modalCtrl.getTop();
        if (element) {
          element.dismiss();
          return;
        }
      } catch (error) {
        console.log(error);
      }
      // close side menua
      try {
        const element = await this.menu.getOpen();
        if (element) {
          this.menu.close();
          return;
        }
      } catch (error) {
      }

      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        // if (outlet && outlet.canGoBack()) {
        //     outlet.pop();
        if (this.router.url !== '/tabs/main') {
           this.router.navigate(['/tabs/main']);
        } else if (this.router.url === '/tabs/main') {
          if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
            // this.platform.exitApp(); // Exit from app
            navigator['app'].exitApp(); // work in ionic 4

          } else {
            this.presentToast(`Press back again to exit App.`);
            this.lastTimeBackPress = new Date().getTime();
          }
        }
      });
    });
  }
}
