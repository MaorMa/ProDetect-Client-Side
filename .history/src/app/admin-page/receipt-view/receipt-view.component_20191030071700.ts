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
  allData: ReceiptToReturnList[] = [];
  allFamilyData: ReceiptToReturnList;
  selectedFamily: string = "";
  amountOfRec: number = 0;
  image: any;
  pageEvent: PageEvent;
  currIndex: number;
  currentReceiptStatus: string = "0";
  currReceiptUploadTime: Date;

  constructor(private researcherService: ResearcherService) {
    this.researcherService.GetAllApprovedData().subscribe((resValue) => {
      // console.log(JSON.parse(resValue));
      for (let pair of JSON.parse(resValue)) {
        this.allData.push(new ReceiptToReturnList().deserialize(pair));
        this.families.push(pair.Key);
      }
      // console.log(this.allData);
    });
  }

  ngOnInit() {
  }

  familyChanged(index: number): void {
    this.currIndex = index;
    this.paginator.pageIndex = 0;
    this.amountOfRec = this.allData[index].Value.length;
    this.allFamilyData = this.allData[index];
    this.table.updateAllTableData(this.allFamilyData);
  }

  pageChange(index: PageEvent): void {
    this.table.updateDataIndex(index.pageIndex);
    this.currentReceiptStatus = this.allFamilyData['Value'][index.pageIndex]['status'];
    this.currReceiptUploadTime = this.allFamilyData['Value'][index.pageIndex]['uploadTime'];
  }

}
