import { Injectable } from '@angular/core';
import {AutoCompleteService} from 'ionic4-auto-complete';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class SearchService implements AutoCompleteService {
  labelAttribute = 'search';
  private products: Product[] = [];
  constructor(private http: HttpClient) { }

  getResults(keyword: string): Observable<any[]> {
    let observable: Observable<any>;

    if (this.products.length === 0) {
      observable = this.http.get('http://theflyingbasket.com/backend/api/searchAll.php');
    } else {
      observable = of(this.products);
    }

    return observable.pipe(
      map(
        (result) => {
          return result.filter(
            (item) => {
              return item.productName.toLowerCase().startsWith(
                  keyword.toLowerCase()
              );
            }
          );
        }
      )
    );
  }
}
