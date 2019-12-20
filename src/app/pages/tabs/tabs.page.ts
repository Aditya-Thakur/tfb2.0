import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  private currentColor: string;
  constructor(private router: Router, private menu: MenuController) {
    this.currentColor = 'success';
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  ngOnInit() {
  }

  openSearch() {
    this.router.navigateByUrl(`/tabs/search`);
  }

  openLogin() {
    this.router.navigateByUrl(`/tabs/login`);
    this.menu.toggle();
  }

  openHome() {
    this.router.navigateByUrl(`/tabs/main`);
    this.menu.toggle();
  }

}
