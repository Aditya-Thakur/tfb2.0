import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/user';
import { Storage } from '@ionic/storage';
import { Global } from 'src/app/global';
// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm; signupForm; user; data; error;
  constructor(private router: Router, private loginService: LoginService, private storage: Storage,
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
  async getFromLocal(key) {
    this.data[key] = this.storage.get(key);
  }
  async saveInLocal(key, val) {
    this.storage.set(key, val);
  }

  login(): void {
    this.loginService.login(this.loginForm.value).subscribe(
      (res: User) => {
        this.user = res;
        if (this.user.message == null) {
        Global.loggedIn = true;
        Global.loggedInUser = this.user;
        this.saveInLocal('loggedInUser', this.user);
        this.router.navigate(['']);
      }
      },
      (err) => {
        this.error = err;
      }
    );
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
