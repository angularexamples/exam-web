import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ENV } from '../env.config';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUser: any;

  private httpOptions :any ;

  constructor(private _http: HttpClient) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.httpOptions = { 
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': 'online Quiz'
      })
    };
  }

  //user registration method 
  public postEvent$(event) {
    return this._http
      .post(`${ENV.BASE_API}user-signup`, event,this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Error: Unable to complete request. please try again later.');
  };

}
