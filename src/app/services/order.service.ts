import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  async placeOrder(order: Order) {
    try {
      console.log(order);
      const response = await this.http.post(`http://localhost/backend/api/placeOrder2.php`, order).toPromise();
      // tslint:disable-next-line: no-string-literal
      return response['orderData'].message as string;
    } catch (error) {
      this.handleError(error);
    }
  }

    // Get all order for a user.
    async getOrderByUserId(userId: number): Promise<Order[]> {
      try {
        // const response = await this.http.post(`http://localhost/backend/api/getOrderByUserId2.php`, userId).toPromise();
        const response = await this.http.post(`http://localhost/backend/api/getOrderByUserId2.php`, userId).toPromise();
        // tslint:disable-next-line: no-string-literal
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
