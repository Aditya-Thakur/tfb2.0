import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from 'src/app/global';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  globalVariable = Global;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  openLogin() {
    this.router.navigateByUrl(`/tabs/login`);
  }

  myOrders() {
    this.router.navigateByUrl(`/tabs/myOrders`);
  }

}
