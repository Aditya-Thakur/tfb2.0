import { Injectable } from '@angular/core';
import { Order, OrderToSend } from '../models/order';
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
    // tslint:disable-next-line: prefer-const
    let orderToSend: OrderToSend = {
      id: 0,
      userId: 0,
      cart: {
        myCartItems: []
      },
      orderDate: '',
      paymentMethod: '',
      shippingAddress: '',
      landMark: '',
      shippingState: '',
      shippingCity: '',
      shippingPincode: 0,
      contactno: 0,
      orderStatus: '',
      totalCartPrice: 0
    };
    order.cart.myCartItems.forEach(element => {
      orderToSend.cart.myCartItems.push(element);
    });
    orderToSend.userId = order.userId;
    orderToSend.orderDate = order.orderDate;
    orderToSend.paymentMethod = order.paymentMethod;
    orderToSend.shippingAddress = order.shippingAddress;
    orderToSend.landMark = order.landMark;
    orderToSend.shippingState = order.shippingState;
    orderToSend.shippingCity = order.shippingCity;
    orderToSend.shippingPincode = order.shippingPincode;
    orderToSend.contactno = order.contactno;
    orderToSend.orderStatus = order.orderStatus;
    orderToSend.totalCartPrice = order.totalCartPrice;
    return this.http.post(`https://theflyingbasket.com/backend/api/placeOrder2.php`, orderToSend).pipe(
      map((res) => {
        // tslint:disable: no-string-literal
        const response = res['orderData'];
        return response;
      }),
      catchError(this.handleError));
  }

  cancelOrder(orderID: number) {
    return this.http.post(`https://theflyingbasket.com/backend/api/cancelOrderById.php`, orderID).pipe(
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
      // const response = await this.http.post(`https://theflyingbasket.com/backend/api/getOrderByUserId2.php`, userId).toPromise();
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
