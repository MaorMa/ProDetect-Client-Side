import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { ResearcherService } from 'src/app/Services/researcher.service';
import { ReceiptToReturnList } from 'src/app/Objects/receipt-to-return-list';
import { AdminTableComponent } from './admin-table/admin-table.component';

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
  allData: ReceiptToReturnList[] = [];
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
    this.researcherService.GetAllRecognizedData().subscribe((resValue) => {
      console.log(JSON.parse(resValue));
      for (let pair of JSON.parse(resValue)) {
        this.allData.push(new ReceiptToReturnList().deserialize(pair));
        this.families.push(pair.Key);
      }
      this.isLoading = false;
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
    this.table.updateAllTableData(this.allFamilyData, this.families[this.selectedFamily]);
    this.currentReceiptStatus = this.allFamilyData['Value'][0]['status'];
    this.currReceiptUploadTime = this.allFamilyData['Value'][0]['uploadTime'];
    this.updatePhoto(0);
  }

  pageChange(index: PageEvent) {
    this.table.updateDataIndex(index.pageIndex);
    this.currentReceiptStatus = this.allFamilyData['Value'][index.pageIndex]['status'];
    this.currReceiptUploadTime = this.allFamilyData['Value'][index.pageIndex]['uploadTime'];
    this.updatePhoto(index.pageIndex);
  }

  updatePhoto(index: number): void {
    if (this.allFamilyData['Value'][index]['image'] !== "")
      this.image = 'data:image/png;base64,' + this.allFamilyData['Value'][index]['image'];
  }
}
