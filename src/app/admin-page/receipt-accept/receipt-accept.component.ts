import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { ResearcherService } from 'src/app/Services/researcher.service';
import { ReceiptToReturnList } from 'src/app/Objects/receipt-to-return-list';
import { AdminTableComponent } from './admin-table/admin-table.component';
import { ReceiptToReturn } from 'src/app/Objects/receipt-to-return';

@Component({
  selector: 'app-receipt-accept',
  templateUrl: './receipt-accept.component.html',
  styleUrls: ['./receipt-accept.component.css']
})
export class ReceiptAcceptComponent implements OnInit {

  @ViewChild(AdminTableComponent, { static: false }) table: AdminTableComponent;
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
    this.researcherService.GetAllFamilies("Acc").subscribe((resValue) => {
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
    this.allFamilyData = null;
    this.allData = null;
    this.amountOfRec = 0;
    this.researcherService.GetAllFamilyData(this.families[index]).subscribe((resValue) => {
      //console.log(JSON.parse(resValue));
      this.allData = new ReceiptToReturnList().deserialize(JSON.parse(resValue));
      this.amountOfRec = this.allData.Value.length;
      this.allFamilyData = this.allData;
      this.table.updateAllTableData(this.allFamilyData, this.families[index]);
      this.currentReceiptStatus = this.allFamilyData['Value'][0]['status'];
      this.currReceiptUploadTime = this.allFamilyData['Value'][0]['uploadTime'];
      this.updatePhoto(0);
      this.isLoading = false;
      // console.log(this.allData)
    });
  }

  pageChange(index: PageEvent) {
    // console.log(index); 
    this.table.updateDataIndex(index.pageIndex);
    this.currentReceiptStatus = this.allFamilyData['Value'][index.pageIndex]['status'];
    this.currReceiptUploadTime = this.allFamilyData['Value'][index.pageIndex]['uploadTime'];
    this.updatePhoto(index.pageIndex);
  }

  updatePhoto(index: number): void {
    if (this.allFamilyData['Value'][index]['image'] !== "")
      this.image = 'data:image/png;base64,' + this.allFamilyData['Value'][index]['image'];
  }

  deleteCurrReceipt(receipt: ReceiptToReturn): void {
    this.researcherService.DeleteCurrReceipt(receipt.receiptID).subscribe((resValue) => {
      // console.log(resValue);
      this.researcherService.openSnackBar("הקבלה נמחקה בהצלחה", "סגור", 1500);
      if (this.allData.Value.length == 1) {
        this.getAllFamilies();
      }
      else {
        this.familyChanged(this.currIndex);
      }
    }, error => {
      this.researcherService.openSnackBar("קרתה תקלה בעת מחיקת הקבלה, אנא נסו שנית", "סגור", 1500);
    })
  }
}
