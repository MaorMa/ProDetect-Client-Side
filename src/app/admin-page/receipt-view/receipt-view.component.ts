import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewTableComponent } from './view-table/view-table.component';
import { MatPaginator, PageEvent } from '@angular/material';
import { ReceiptToReturnList } from 'src/app/Objects/receipt-to-return-list';
import { ResearcherService } from 'src/app/Services/researcher.service';
import { ReceiptToReturn } from 'src/app/Objects/receipt-to-return';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

@Component({
  selector: 'app-receipt-view',
  templateUrl: './receipt-view.component.html',
  styleUrls: ['./receipt-view.component.css']
})
export class ReceiptViewComponent implements OnInit {

  @ViewChild(ViewTableComponent, { static: false }) table: ViewTableComponent;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  familyUploadsJson: any[][];
  families: string[] = [];
  allData: ReceiptToReturnList = null;
  allFamilyData: ReceiptToReturnList;
  selectedFamily: string = "";
  amountOfRec: number = 0;
  image: any;
  pageEvent: PageEvent;
  currIndex: number;
  currentReceiptStatus: string = "0";
  currReceiptUploadTime: string;
  isLoading: boolean = true;

  constructor(private researcherService: ResearcherService) {
  }

  ngOnInit() {
    this.getAllFamilies();
  }

  getAllFamilies(): void {
    this.researcherService.GetAllFamilies("View").subscribe((resValue) => {
      // console.log(resValue);
      this.families = JSON.parse(resValue);
      this.isLoading = false;
      this.selectedFamily = '';
      this.allData = null;
      this.allFamilyData = null;
      this.amountOfRec = 0;
    });
  }

  familyChanged(index: number): void {
    this.currIndex = index;
    this.paginator.pageIndex = 0;
    this.isLoading = true;
    this.researcherService.GetAllApprovedData(this.families[index]).subscribe((resValue) => {
      this.allData = new ReceiptToReturnList().deserialize(JSON.parse(resValue));
      console.log(this.allData);
      this.allFamilyData = this.allData;
      this.isLoading = false;
      this.amountOfRec = this.allData.Value.length;
      if (this.allData.Value.length != 0) {//If no data for user returned
        this.table.updateAllTableData(this.allFamilyData);
        // console.log(this.allData);
      }
    });
  }

  pageChange(index: PageEvent): void {
    this.table.updateDataIndex(index.pageIndex);
    this.currentReceiptStatus = this.allFamilyData['Value'][index.pageIndex]['status'];
    this.currReceiptUploadTime = this.allFamilyData['Value'][index.pageIndex]['uploadTime'];
  }

  backToAcceptCurrReceipt(receipt: ReceiptToReturn): void {
    console.log(receipt)
    this.researcherService.returnToAccept(this.families[this.selectedFamily], receipt).subscribe(resValue => {
      this.researcherService.openSnackBar("הקבלה עברה למסך קבלות שטרם אושרו לתיקון", "סגור", 1000);
      if (this.allData.Value.length == 1) {
        this.getAllFamilies();
      }
      else {
        this.familyChanged(this.currIndex);
      }
    }, error => {
      this.researcherService.openSnackBar("שגיאה בעת העברת הקבלה לקבלות שטרם אושרו", "סגור", 1000);
    })
  }

}
