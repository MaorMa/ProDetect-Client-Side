import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { baseURLService } from './base-urlservice.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // apiUrl: string = 'http://localhost:59416/api/';
  apiUrl: string = 'http://proj.ise.bgu.ac.il/Proj-RR/backend/api/';
  // apiUrl: string; 

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private baseURL: baseURLService) {
    // this.apiUrl = this.baseURL.appConfig.baseURL;
  }

  login(username: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append("username", username);//Form
    formData.append("password", password);//Form
    return this.apiPostCall('Users/Login', formData);
  }

  isTokenValid(token: string): Observable<any> {
    const formData = new FormData();
    formData.append("token", token);//Form
    return this.apiPostCall('Users/tokenIsValid', formData);
  }

  isGlobalAdmin(token: string): Observable<any> {
    const formData = new FormData();
    formData.append("token", token);//Form
    return this.apiPostCall('Users/isGlobalAdmin', formData);
  }

  isAdmin(token: string): Observable<any> {
    const formData = new FormData();
    formData.append("token", token);//Form
    return this.apiPostCall('Users/isAdmin', formData);
  }

  //Get info from server 
  private apiPostCall(apiExt, formData: FormData): Observable<any> {
    var dataFromAPI = this.http.post(this.apiUrl + apiExt, formData,
      { reportProgress: true, observe: 'response' })
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError)
      );
    return dataFromAPI;
  }

  //handle all errors from web API
  private handleError(errorResponse: HttpErrorResponse) {
    // console.log(errorResponse)
    if (errorResponse.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred: ', errorResponse.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${errorResponse.status}, ` +
        `body was: ${errorResponse.statusText}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
