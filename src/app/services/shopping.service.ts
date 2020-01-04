import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subcategory } from '../models/subcategory';
import { throwError, Observable } from 'rxjs';
import { Product } from '../models/product';
import { ProductVariety } from '../models/product-variety';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
 // tslint:disable: no-string-literal
export class ShoppingService {

  products: Product[];
  constructor(private http: HttpClient) { }

  baseUrl: 'http://theflyingbasket.com/backend';

    // Get all categories
    async getAllCategories(): Promise<Category[]> {
      try {
        console.log('hi');
        const response = await this.http.get(`http://theflyingbasket.com/backend/api/getCategories.php`).toPromise();
        return response['categoryData'] as Category[];
      } catch (error) {
        await this.handleError(error);
      }
    }

    // Get all subcategories for a category
    async getAllSubcategories(categoryid): Promise<Subcategory[]> {
      try {
        const response = await this.http.post(
          `http://theflyingbasket.com/backend/api/getSubcategoryByCategory.php`,
           categoryid
           )
           .toPromise();
        return response['subcategoryData'] as Subcategory[];
      } catch (error) {
        await this.handleError(error);
      }
    }

     // Get all product details for menu page
  async getProductsByCategoryId(categoryId: number): Promise<Product[]> {
    try {
      const response = await
      this.http.post(`http://theflyingbasket.com/backend/api/getAllProductsOfCategory.php`, categoryId).toPromise();
      this.products = response['productData'] as Product[];
      return this.products;
    } catch (error) {
      await this.handleError(error);
    }
  }
    // Get all product details for menu page
    async getProductsBySubcategoryId(subcategoryId: number): Promise<Product[]> {
      try {
        const response = await this.http.post(
          `http://theflyingbasket.com/backend/api/getAllProductsOfSubCategory.php`, subcategoryId).toPromise();
        this.products = response['productData'] as Product[];
        return this.products;
      } catch (error) {
        await this.handleError(error);
      }
    }

      // Get product for a search keyword
  async getProductsBySearch(keyword: string): Promise<Product[]> {
    try {
      const response = await this.http.post(`http://theflyingbasket.com/backend/api/searchBarResponse.php`, keyword).toPromise();
      this.products = response['productData'] as Product[];
      return this.products;
    } catch (error) {
      await this.handleError(error);
    }
  }
// Get product details.
async getProductByProductId(productId: number): Promise<Product> {
  try {
    const response = await this.http.post(`http://theflyingbasket.com/backend/api/getProductByProductId.php`, productId).toPromise();
    return response['productData'] as Product;
  } catch (error) {
    await this.handleError(error);
  }
}

  // Get Product Variety details.
  async getProductVarietyByProductId(productId: number): Promise<ProductVariety[]> {
    try {
      const response = await
      this.http.post(`http://theflyingbasket.com/backend/api/getProductVarietyByProductId.php`, productId).toPromise();
      return response['productVarietyData'] as ProductVariety[];
    } catch (error) {
      this.handleError(error);
    }
  }

    // Get product for a search keyword
  //   getProductsBySearch2(keyword: string): Observable<Product[]> {
  //     if (keyword === '') { return null; }
  //     return this.http.post(`${this.baseUrl}/api/searchBarResponse.php`, keyword).pipe(
  //        map((res) => {
  //          return res['productData'] as Product[];
  //      }),
  //      catchError(this.handleError));\
  //  }

    private handleError(error: HttpErrorResponse) {
      console.log(error);
      // return an observable with a user friendly message
      return throwError('Error! something went wrong.');
    }
}
