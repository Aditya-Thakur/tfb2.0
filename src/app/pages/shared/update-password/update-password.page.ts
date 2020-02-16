import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { ToastController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { StorageService } from 'src/app/services/storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Global } from 'src/app/global';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.page.html',
  styleUrls: ['./update-password.page.scss'],
})
export class UpdatePasswordPage implements OnInit {

  loginForm; user; data; error;
  constructor(private router: Router,
              private googlePlus: GooglePlus,
              public toastController: ToastController,
              private loginService: LoginService,
              private storage: StorageService
    // private fb: Facebook
    ) {
    this.loginForm = new FormGroup({
      email: new FormControl('',
      [
        Validators.required,
        Validators.pattern('[a-z0-9._]+@[a-z]+.com|.co.in')
      ]
      ),
      otp: new FormControl('',
      [
        Validators.required,
        Validators.pattern('[0-9]{6}')
      ]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z0-9!@#$%^&*()-=_+]{6,20}')
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
  sendOTP(): void {
    this.loginService.sendOTP(this.loginForm.value).subscribe(
      (res: User) => {
        // tslint:disable: no-string-literal
        if (res['message'] != null) {
        this.presentToast(res['message'] );
      }
      },
      (err) => {
        this.error = err;
      }
    );
  }

  login(): void {
    this.loginService.updatePassword(this.loginForm.value).subscribe(
      (res) => {
        if (res.resCode === 356475) {
        this.presentToast(res['message']);
        this.router.navigateByUrl(`/tabs/login`);
      } else {
        // tslint:disable-next-line: no-string-literal
        this.presentToast(res['message']);
      }
      },
      (err) => {
        this.error = err;
      }
    );
  }
  googleLogin() {
    this.googlePlus.login({})
  .then(res => console.log(res))
  .catch(err => console.error(err));
  }

  ngOnInit() {
  }
  openRegister() {
    this.router.navigateByUrl(`/tabs/register`);
  }

}
