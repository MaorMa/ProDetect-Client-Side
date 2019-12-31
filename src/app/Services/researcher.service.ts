import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReceiptToReturn } from '../Objects/receipt-to-return';
import { baseURLService } from './base-urlservice.service';

@Injectable({
  providedIn: 'root'
})
export class ResearcherService {//TODO - chec if token necc for all gets

  apiUrl: string = 'http://localhost:59416/api/';
  // apiUrl: string = 'http://proj.ise.bgu.ac.il/Proj-RR/backend/api/';
  // apiUrl: string;

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private baseURL: baseURLService) {
    // this.apiUrl = this.baseURL.appConfig.baseURL;
  }

  GetAllRecognizedData(): Observable<any> {
    return this.http.post<any>(this.apiUrl + "Receipt/GetAllRecognizedData/", '', this.getTokenHeader());
  }

  GetAllFamilies(accView: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + "Receipt/GetAllFamilies/" + accView, '', this.getTokenHeader());
  }

  GetAllFamilyData(familyID: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + "Receipt/GetAllFamilyData/" + familyID, '', this.getTokenHeader());
  }

  GetAllApprovedData(familyID: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + "Receipt/GetAllApprovedData/" + familyID, '', this.getTokenHeader());
  }

  GetAllDataForMarketAndProductID(marketID: string, productID: number): Observable<any> {
    return this.apiGetCall("Receipt/GetProductInfo/" + marketID + "/" + productID);
  }

  SaveCurrentReceipt(currTableData: ReceiptToReturn, selectedFamily: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + "Receipt/UpdateReceiptData/" + selectedFamily, currTableData, this.getTokenHeader());
  }

  DeleteCurrReceipt(receiptId: string): any {
    return this.http.post<any>(this.apiUrl + "Receipt/DeleteReceipt/" + receiptId, '', this.getTokenHeader());
  }

  CreateNewUser(familyName: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append("username", familyName);//Form
    formData.append("password", password);//Form
    return this.http.post<any>(this.apiUrl + "Users/AddFamilyUser/", formData, this.getTokenHeader());
  }

  //Get info from server 
  apiGetCall(apiExt): Observable<any> {
    var dataFromAPI = this.http.get(this.apiUrl + apiExt)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError)
      );
    return dataFromAPI;
  }

  //handle all errors from web API
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred: ', errorResponse.error.message);
      this.openSnackBar('An error occurred: ' + errorResponse.error.message, "Close", 2000);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${errorResponse.status}, ` +
        `body was: ${errorResponse.error}`);
      this.openSnackBar("Backend returned code: " + errorResponse.status, "Close", 2000);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  getTokenHeader(): any {
    const headerDict = {
      'Authorization': sessionStorage.getItem('token')
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return requestOptions;
  }

  /**
 * Open a snack bar with information for the user
 * @param message - value to show in snackBar
 * @param action - value to show in Button in shnackBar
 * @param duration 
 */
  openSnackBar(message: string, action: string, duration: number): void {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }
}
