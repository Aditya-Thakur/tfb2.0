import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/user';
// import { Storage } from '@ionic/storage';
import { Global } from 'src/app/global';
import { ToastController } from '@ionic/angular';
// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { StorageService } from 'src/app/services/storage.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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

  login(): void {
    this.loginService.login(this.loginForm.value).subscribe(
      (res: User) => {
        this.user = res;
        if (this.user.message == null) {
        Global.loggedIn = true;
        Global.loggedInUser = this.user;
        this.presentToast('Welcome ' + Global.loggedInUser.name);
        this.storage.saveInLocal('loggedInUser', this.user);
        this.router.navigate(['']);
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
  // fblogin() {
  // this.fb.login(['public_profile', 'user_friends', 'email'])
  // .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
  // .catch(e => console.log('Error logging into Facebook', e));
  // }
  openRegister() {
    this.router.navigateByUrl(`/tabs/register`);
  }
}
