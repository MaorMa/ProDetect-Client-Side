import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { ReceiptToReturnList } from 'src/app/Objects/receipt-to-return-list';
import { ReceiptToReturn } from 'src/app/Objects/receipt-to-return';
import { MetaData } from 'src/app/Objects/meta-data';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import { Markets } from 'src/app/markets.enum';
import { NutrientViewComponent } from './nutrient-view/nutrient-view.component';

@Component({
  selector: 'app-view-table',
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.css']
})
export class ViewTableComponent implements OnInit {
  allTableData: ReceiptToReturnList;
  currReceipt: ReceiptToReturn = new ReceiptToReturn();
  currTableData: MetaData[] = [];
  currRecIndex: number;
  currMarket: string;
  currHebMarket: string;

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
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
    if (row.nutrients.length != 0) {
      const editDialogConfig = new MatDialogConfig();
      editDialogConfig.disableClose = false;
      editDialogConfig.autoFocus = true;
      editDialogConfig.maxWidth = "25%";
      editDialogConfig.maxHeight = "85%";
      editDialogConfig.data = { Nutrients: row.nutrients };
      var dialogRef = this.dialog.open(NutrientViewComponent, editDialogConfig);
    }
    else {
      this.openSnackBar("למוצר זה לא נמצאו נוטריאנטים", "סגור", 1000);
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
      headers: ["מקט", "שם מוצר", "כמות", "מחיר"],
      nullToEmptyString: true,
    };
    let withoutValidProductAttribute = this.currTableData.map(item =>
      ({
        sID: item.getsID(),
        description: item.getDescription(),
        quantity: item.getQuantity(),
        price: item.getPrice()
      }));
    new Angular5Csv(withoutValidProductAttribute, this.currReceipt.receiptID, options);
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
