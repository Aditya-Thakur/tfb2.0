import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: true
  };

  constructor(private router: Router) { }

  ngOnInit() {
  }

  async openShop(id: number) {
    this.router.navigate(['tabs/products'], {queryParams : {subid: id}});
  }
  async openShop2(id: number) {
    this.router.navigate(['tabs/products'], {queryParams : {pid: id}});
  }

  openSearch() {
    this.router.navigateByUrl(`/tabs/search`);
  }

}
