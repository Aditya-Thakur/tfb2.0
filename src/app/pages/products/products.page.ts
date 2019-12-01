import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingService } from 'src/app/services/shopping.service';
import { Product } from 'src/app/models/product';
import { ProductVariety } from 'src/app/models/product-variety';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  pid: number;
  subid: number;
  pSearch: string;
  products: Product[];
  error;
  constructor(private route: ActivatedRoute, private shoppingService: ShoppingService) { }

  async ngOnInit() {
    await this.route.queryParams.subscribe(async queryParams => {
      this.error = false;
      console.log(queryParams);
      // tslint:disable: no-string-literal
      this.pid = Number(queryParams['pid']);
      this.pSearch = queryParams['pSearch'];
      this.subid = queryParams['subid'];
      this.products = [];
      if (this.pid) {
        this.products = await this.shoppingService.getProductsByCategoryId(this.pid);
      } else if (this.pSearch) {
        this.products = await this.shoppingService.getProductsBySearch(this.pSearch);
      } else {
        this.products = await this.shoppingService.getProductsBySubcategoryId(this.subid);
      }
      if (this.products.length === 0) {
        this.error = true;
      }
      console.log(this.products);
    });
  }

}
