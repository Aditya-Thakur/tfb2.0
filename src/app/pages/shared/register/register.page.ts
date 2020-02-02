import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Storage } from '@ionic/storage';
import { Global } from 'src/app/global';
import { User } from 'src/app/models/user';
import { ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  signupForm; user; error;
  constructor(private router: Router, public toastController: ToastController,
              private loginService: LoginService, private storage: StorageService) {
    this.signupForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('[a-zA-Z ]+')
      ]),
      email: new FormControl('',  [
        Validators.required,
        Validators.pattern('[a-z0-9._]+@[a-z]+.com|.co.in')
      ]),
      contactNo: new FormControl('', [
        Validators.required,
        Validators.pattern('[6-9][0-9]{9}')
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z0-9!@#$%^&*()-=_+]{6,20}')
      ])
    });
  }

  ngOnInit() {
  }
  async presentToast(toastMessage) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 2000
    });
    toast.present();
  }

  signup(): void {
    this.loginService.signup(this.signupForm.value).subscribe(
      (res: User) => {
        this.user = res;
        if (this.user.message == null) {
        Global.loggedIn = true;
        Global.loggedInUser = this.user;
        this.storage.saveInLocal('loggedInUser', this.user);
        this.presentToast('Welcome ' + Global.loggedInUser.name);
        this.router.navigate(['']);
      } else {
        this.presentToast(this.user.message);
      }
      },
      (err) => {
        this.error = err;
      }
    );
  }

  openLogin() {
    this.router.navigateByUrl(`/tabs/login`);
  }

}
