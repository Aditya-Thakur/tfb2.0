import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { ShoppingService } from 'src/app/services/shopping.service';
import { Subcategory } from 'src/app/models/subcategory';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  Categories: Category[] = [];
  categoryDict = new Map<string, Subcategory[]>();
  constructor(private shoppingService: ShoppingService, private router: Router) { }

  async ngOnInit() {
    await this.getAllCategories();
    this.Categories.forEach(async element => {
      const subcategories = await this.shoppingService.getAllSubcategories(element.id);
      const subcategoriesTemp: Subcategory[] = [];
      subcategories.forEach( element2 => {
       subcategoriesTemp.push(element2);
      });
      this.categoryDict.set(element.categoryName, subcategoriesTemp);
    });
    console.log(this.categoryDict);
  }

  async getAllCategories() {
    this.Categories = null;
    console.log('here');
    this.Categories = await this.shoppingService.getAllCategories();
    console.log(this.Categories);
  }

  getProducts(id) {
    this.router.navigate(['tabs/products'], {queryParams : {subid: id}});
  }


}
