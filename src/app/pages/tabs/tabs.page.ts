import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  private currentColor: string;
  constructor(private router: Router) {
    this.currentColor = 'success';
  }

  ngOnInit() {
  }

  openSearch() {
    this.router.navigateByUrl(`/tabs/search`);
  }

  openHome() {
    this.router.navigateByUrl(`/tabs/main`);
  }

}
