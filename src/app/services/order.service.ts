import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  placeOrder(order: Order) {
    console.log(order);
    return this.http.post(`https://theflyingbasket.com/backend/api/placeOrder2.php`, order).pipe(
      map((res) => {
        // tslint:disable: no-string-literal
        const response = res['orderData'];
        return response;
      }),
      catchError(this.handleError));
  }
  // Get all order for a user.
  async getOrderByUserId(userId: number) {
    try {
      // const response = await this.http.post(`https://localhost/backend/api/getOrderByUserId2.php`, userId).toPromise();
      const response = await this.http.post(`https://theflyingbasket.com/backend/api/getOrderByUserId.php`, userId).toPromise();
      return response['orderData'] as Order[];
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }

}
