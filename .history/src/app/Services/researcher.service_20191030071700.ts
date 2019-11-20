import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReceiptToReturn } from '../Objects/receipt-to-return';

@Injectable({
  providedIn: 'root'
})
export class ResearcherService {//TODO - chec if token necc for all gets

  apiUrl: string = 'http://localhost:59416/api/';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  // getFamilyUploads(): Observable<any> {
  //   return this.apiGetCall("Receipt/GetTotalUploadsDetails");
  // }

  GetAllRecognizedData(): Observable<any> {
    return this.http.post<any>(this.apiUrl + "Receipt/GetAllRecognizedData/", '', this.getTokenHeader());
    // return this.apiGetCall("Receipt/GetAllRecognizedData");
  }

  GetAllApprovedData(): Observable<any> {
    return this.http.post<any>(this.apiUrl + "Receipt/GetAllApprovedData/", '', this.getTokenHeader());
    // return this.apiGetCall("Receipt/GetAllApprovedData");
  }

  GetAllDataForMarketAndProductID(marketID: string, productID: number): Observable<any> {
    return this.apiGetCall("Receipt/GetProductInfo/" + marketID + "/" + productID);
  }

  SaveCurrentReceipt(currTableData: ReceiptToReturn, selectedFamily: string): Observable<any> {
    return this.http.put<any>(this.apiUrl + "Receipt/UpdateReceiptData/" + selectedFamily, currTableData, this.getTokenHeader());
  }

  CreateNewUser(familyName: string): Observable<any>{
    const formData = new FormData();
    formData.append("username", familyName);//Form
    formData.append("password", 'rrs123123');//Form
    return this.http.post<any>(this.apiUrl + "Users/AddFamilyUser/",formData, this.getTokenHeader());
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

  getTokenHeader(): any{
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
