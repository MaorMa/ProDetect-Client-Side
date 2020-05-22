import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { ReceiptToReturnList } from 'src/app/Objects/receipt-to-return-list';
import { ReceiptToReturn } from 'src/app/Objects/receipt-to-return';
import { MetaData } from 'src/app/Objects/meta-data';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import { Markets } from 'src/app/markets.enum';
import { NutrientViewComponent, NutCodeToName } from './nutrient-view/nutrient-view.component';
import { ResearcherService } from 'src/app/Services/researcher.service';
import { LoginService } from 'src/app/Services/login.service';


@Component({
  selector: 'app-view-table',
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.css']
})
export class ViewTableComponent implements OnInit {
  @Output() backToAcceptEmitter: EventEmitter<ReceiptToReturn> = new EventEmitter();
  allTableData: ReceiptToReturnList;
  currReceipt: ReceiptToReturn = new ReceiptToReturn();
  currTableData: MetaData[] = [];
  currRecIndex: number;
  currMarket: string;
  currHebMarket: string;
  uploadTime: string;
  admin: boolean = false;
  token:string = sessionStorage.getItem('token');

  constructor(private dialog: MatDialog, private researcherService: ResearcherService,
    private loginService: LoginService) {
      this.detectIfAdmin();
    }

  ngOnInit() {
  }

  detectIfAdmin(){
    this.loginService.isAdmin((this.token)).subscribe(
      (resValue: any) => {
        if (resValue) {
          this.admin = resValue['body'] === true;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * Update all receipts info for a specific family 
   * @param allTableData - all data for one family
   */
  updateAllTableData(allTableData: ReceiptToReturnList): void {
    this.allTableData = allTableData;
    // console.log(this.allTableData);
    this.updateDataIndex(0);
  }

  /**
   * Change table info according to page on screen
   * @param index - index of data from allTableData
   */
  updateDataIndex(index: number): void {
    // console.log(index)
    this.currMarket = this.allTableData['Value'][index]['marketID'];
    this.uploadTime = this.allTableData['Value'][index]['uploadTime'];
    for (var n in Markets) {
      if (Markets[n] === this.currMarket)
        this.currHebMarket = n;
    }
    this.currTableData = this.allTableData['Value'][index]['products'];
    this.currReceipt = this.allTableData['Value'][index];
    this.currRecIndex = index;
    // console.log("Table data:" + this.currTableData);
  }

  loadNutriantsModal(row: any) {
    // console.log(row)
    if (row.nutrients.length != 0) {
      const editDialogConfig = new MatDialogConfig();
      editDialogConfig.disableClose = false;
      editDialogConfig.autoFocus = true;
      // editDialogConfig.maxWidth = "55%";
      editDialogConfig.maxHeight = "85%";
      editDialogConfig.data = { Nutrients: row.nutrients, ProductName: row.description };
      var dialogRef = this.dialog.open(NutrientViewComponent, editDialogConfig);
    }
    else {
      this.researcherService.openSnackBar("למוצר זה לא נמצאו נוטריאנטים", "סגור", 1000);
    }
  }

  /**
   * https://www.npmjs.com/package/angular5-csv
   */
  exportToCSV(): void {
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      showLabels: true,
      useBom: true,
      showTitle: false,
      headers: ["מקט", "שם מוצר", "כמות (קג/ליטר)", "מחיר ליחידה/קג", Object.values(NutCodeToName)],
      nullToEmptyString: true,
    };
    let withoutValidProductAttribute = this.currTableData.map(item =>
      ({
        sID: item.getsID(),
        description: item.getDescription(),
        quantity: item.getQuantity(),
        price: item.getPrice(),
        nutrients: item.getNutrients().map(a => a.$value)
      }));
    new Angular5Csv(withoutValidProductAttribute, this.currReceipt.receiptID, options);
  }

  returnToAccept(): void {
    if (confirm("קבלה זו תעבור ל'קבלות שטרם אושרו'. את/ה בטוח/ה?")) {
      this.backToAcceptEmitter.emit(this.currReceipt);
    }
  }
}
