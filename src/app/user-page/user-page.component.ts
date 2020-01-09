import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../Services/file-upload.service';
import { GetSettingsService } from '../Services/get-settings.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Markets } from '../markets.enum';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  families: string[];
  selectedFamily: string;
  markets: string[];
  selectedMarket: string;
  filesToUpload: FileList = null;
  selectInput: string;
  marketDis: boolean = true;
  uploadDis: boolean = true;
  uploadBtnDis: boolean = true;
  uploading: boolean = false;

  constructor(private snackBar: MatSnackBar, private fileUploadService: FileUploadService, private getSettingsService: GetSettingsService) {
    // this.families = ['yaniv', 'maor', 'aviv'];
    this.families = [];
    this.markets = [];
    this.getSettingsService.getMarkets().subscribe((resValue) => {
      // console.log(resValue);
      for (let element of resValue) {
        this.markets.push(element);
      }
    });
    this.getSettingsService.getFamilies().subscribe((resValue) => {
      // console.log(resValue);
      for (let element of resValue) {
        this.families.push(element);
      }
      // console.log(this.families)
    });
  }

  ngOnInit() {
  }

  familyChanged(family: string): void {
    this.marketDis = false;
  }

  marketChanged(market: string): void {
    this.uploadDis = false;
  }


  handleFileInput(files: FileList) {
    if (files.length > 10) {
      alert("אין לבחור יותר מ10 קבצים בכל העלאה. נסו שנית.")
      this.selectInput = "";
      files = null;
    }
    else {
      this.filesToUpload = files;
      this.uploadBtnDis = false;
      this.marketDis = false;
    }
  }

  uploadFiles() {
    this.uploading = true;
    this.fileUploadService.postFile(this.selectedFamily, Markets[this.selectedMarket], this.filesToUpload).subscribe(data => {
      // console.log("Success: " + data);
      this.openSnackBar("התמונות הועלו בהצלחה", "סגור", 5000);
      this.resetAllFields();
    }, error => {
      this.openSnackBar("שגיאה בהעלאת הקבצים, אנא נסו שנית", "סגור", 5000);
      this.resetAllFields();
    });
  }

  resetAllFields() {
    this.marketDis = true;
    this.uploadBtnDis = true;
    this.uploadDis = true;
    this.selectedFamily = "";
    this.selectedMarket = "";
    this.selectInput = "";
    this.uploading = false;
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
