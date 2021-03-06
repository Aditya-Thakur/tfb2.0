import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from 'src/app/global';
import { ToastController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  globalVariable = Global;
  constructor(private router: Router,
              private loginService: LoginService,
              public toastController: ToastController) { }

  ngOnInit() {
    if (this.globalVariable.loggedIn) {
    console.log('bla bla in my-profile');
  } else {
    this.presentToast('Please login first to view your profile.');
    this.router.navigateByUrl(`/tabs/login`);
  }
  }
  async presentToast(toastMessage) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 2000
    });
    toast.present();
  }
  openLogin() {
    this.router.navigateByUrl(`/tabs/login`);
  }

  myOrders() {
    this.router.navigateByUrl(`/tabs/myOrders`);
  }

  logForm() {
    this.loginService.updateProfile(this.globalVariable.loggedInUser).subscribe(
      res => {
        console.log(res);
        this.presentToast('Details updated successfully');
      });
  }

}
