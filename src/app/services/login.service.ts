import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: User;
  publicIp = {
    ip: ''
  };

  constructor(private http: HttpClient) {
    this.http.get<{ ip: string }>('https://jsonip.com')
      .subscribe(data => {
        this.publicIp = data;
      });
   }

   // Get user information
   login(user): Observable<User> {
    user.ip = this.publicIp.ip;
    return this.http.post(`http://theflyingbasket.com/backend/api/login.php`, user).pipe(
      map((res) => {
        // tslint:disable-next-line: no-string-literal
        this.user = res['userData'];
        return this.user;
      }),
      catchError(this.handleError));
  }

  // Register new user
  signup(user: User): Observable<User> {
    user.ip = this.publicIp.ip;
    return this.http.post(`http://theflyingbasket.com/backend/api/signup.php`, user).pipe(
      map((res) => {
        // tslint:disable-next-line: no-string-literal
        this.user = res['userData'];
        return this.user;
      }),
      catchError(this.handleError));
  }

  updateAddress(user: User) {
    // user.id = Global.loggedInUser.id;
    return this.http.post(`http://theflyingbasket.com/backend/api/updateAddress.php`, user).pipe(
      map((res) => {
        // tslint:disable-next-line: no-string-literal
        this.user = res['userData'];
        return this.user;
      }),
      catchError(this.handleError));
  }

  updateProfile(user: User) {
    // user.id = Global.loggedInUser.id;
    return this.http.post(`http://theflyingbasket.com/backend/api/updateProfile.php`, user).pipe(
      map((res) => {
        // tslint:disable-next-line: no-string-literal
        this.user = res['userData'];
        return this.user;
      }),
      catchError(this.handleError));
  }

  // updatePassword(password: Password) {
  //   password.id = Global.loggedInUser.id;
  //   return this.http.post(`${this.baseUrl}/api/updatePassword.php`, password).pipe(
  //     map((res) => {
  //       // tslint:disable-next-line: no-string-literal
  //       this.user = res['userData'];
  //       return this.user;
  //     }),
  //     catchError(this.handleError));
  // }


  // async placeOrder(order: Order): Promise<string>  {
  //   try {
  //     const response = await this.http.post(`${this.baseUrl}/api/placeOrder.php`, order).toPromise();
  //     // tslint:disable-next-line: no-string-literal
  //     return response['orderData'] as string;
  //   } catch (error) {
  //     await this.handleError(error);
  //   }
  // }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
