import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  apiUrl: string = 'http://proj.ise.bgu.ac.il/Proj-RR/backend/api/';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  postFile(familyID: string, market: string, filesToUpload: FileList): any {
    const formData = new FormData();
    const headerDict = {
      'Authorization': sessionStorage.getItem('token')
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    formData.append("familyID", familyID);//Form
    formData.append("market", market);//Form
    Array.from(filesToUpload).forEach(file => { formData.append(file.name, file, file.name); });//Files
    var dataFromAPI = this.http
      .post(this.apiUrl + "Receipt/UploadReceipts", formData, requestOptions,
      )
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
