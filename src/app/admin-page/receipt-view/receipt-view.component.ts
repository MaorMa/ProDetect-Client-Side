import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewTableComponent } from './view-table/view-table.component';
import { MatPaginator, PageEvent } from '@angular/material';
import { ReceiptToReturnList } from 'src/app/Objects/receipt-to-return-list';
import { ResearcherService } from 'src/app/Services/researcher.service';

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
  currReceiptUploadTime: Date;
  isLoading: boolean = true;

  constructor(private researcherService: ResearcherService) {
  }

  ngOnInit() {
    this.getAllFamilies();
  }

  getAllFamilies(): void {
    this.researcherService.GetAllFamilies("View").subscribe((resValue) => {
      this.families = JSON.parse(resValue);
      this.isLoading = false;
    });
  }

  familyChanged(index: number): void {
    this.currIndex = index;
    this.paginator.pageIndex = 0;
    this.isLoading = true;
    this.researcherService.GetAllApprovedData(this.families[index]).subscribe((resValue) => {
      // console.log(JSON.parse(resValue));
      this.allData = new ReceiptToReturnList().deserialize(JSON.parse(resValue));
      this.allFamilyData = this.allData;
      this.isLoading = false;
      this.amountOfRec = this.allData.Value.length;
      this.table.updateAllTableData(this.allFamilyData);
      // console.log(this.allData);
    });
  }

  pageChange(index: PageEvent): void {
    this.table.updateDataIndex(index.pageIndex);
    this.currentReceiptStatus = this.allFamilyData['Value'][index.pageIndex]['status'];
    this.currReceiptUploadTime = this.allFamilyData['Value'][index.pageIndex]['uploadTime'];
  }

}
