import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Storage } from '@ionic/storage';
import { Global } from 'src/app/global';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  signupForm; user; error;
  constructor(private router: Router, private loginService: LoginService, private storage: Storage) {
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

  signup(): void {
    this.loginService.signup(this.signupForm.value).subscribe(
      (res: User) => {
        this.user = res;
        if (this.user.message == null) {
        Global.loggedIn = true;
        Global.loggedInUser = this.user;
        this.router.navigate(['']);
      }
      },
      (err) => {
        this.error = err;
      }
    );
  }

}
