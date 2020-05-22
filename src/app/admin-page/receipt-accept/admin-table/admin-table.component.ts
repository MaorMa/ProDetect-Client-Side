import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AdminUpdateComponent } from './admin-update/admin-update.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminCreateComponent } from './admin-create/admin-create.component';
import { ResearcherService } from 'src/app/Services/researcher.service';
import { MetaData } from 'src/app/Objects/meta-data';
import { ReceiptToReturnList } from 'src/app/Objects/receipt-to-return-list';
import { ReceiptToReturn } from 'src/app/Objects/receipt-to-return';


@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.css']
})
export class AdminTableComponent implements OnInit {
  @Output() deleteEmitter: EventEmitter<ReceiptToReturn> = new EventEmitter();
  allTableData: ReceiptToReturnList;
  selectedFamily: string;
  currReceipt: ReceiptToReturn = new ReceiptToReturn();
  currTableData: MetaData[] = [];
  currRecIndex: number;
  currMarket: string;
  uploadTime: string;
  deletedHistory: any[] = [];

  constructor(private dialog: MatDialog, private researcherService: ResearcherService) { }

  ngOnInit() {
  }

  /**
   * Update all receipts info for a specific family 
   * @param allTableData - all data for one family
   */
  updateAllTableData(allTableData: ReceiptToReturnList, selectedFamily: string): void {
    this.selectedFamily = selectedFamily;
    this.allTableData = allTableData;
    // console.log(this.allTableData);
    this.updateDataIndex(0);
    this.createDeletedHistoryList();
  }

  /**
   * Create Deleted History List the correct size
   */
  createDeletedHistoryList(): void {
    for (let i = 0; i < this.allTableData['Value'].length; i++)
      this.deletedHistory[i] = [];
  }

  /**
   * Change table info according to page on screen
   * @param index - index of data from allTableData
   */
  updateDataIndex(index: number): void {
    // console.log(index)
    this.currMarket = this.allTableData['Value'][index]['marketID'];
    this.currTableData = this.allTableData['Value'][index]['products'];
    this.uploadTime = this.allTableData['Value'][index]['uploadTime'];
    this.currReceipt = this.allTableData['Value'][index];
    this.currRecIndex = index;
    // console.log(this.allTableData);
  }

  loadEditModal(row: any) {
    const editDialogConfig = new MatDialogConfig();
    editDialogConfig.disableClose = false;
    editDialogConfig.autoFocus = true;
    editDialogConfig.position = { 'right': '2.5%' };
    // editDialogConfig.maxWidth = "25%";
    editDialogConfig.data = row;
    var dialogRef = this.dialog.open(AdminUpdateComponent, editDialogConfig);
    dialogRef.componentInstance.editEmitter.subscribe((data: any) => {
      row = data;
      dialogRef.close();
      this.researcherService.openSnackBar('המוצר עודכן בהצלחה', 'סגור', 1500);
    });
  };

  loadCreateModal() {
    const editDialogConfig = new MatDialogConfig();
    editDialogConfig.disableClose = false;
    editDialogConfig.autoFocus = true;
    editDialogConfig.position = { 'right': '2.5%' };
    // editDialogConfig.maxWidth = "25%";
    editDialogConfig.data = { marketID: this.currMarket };
    var dialogRef = this.dialog.open(AdminCreateComponent, editDialogConfig);
    dialogRef.componentInstance.createEmitter.subscribe((data: MetaData) => {
      // console.log(data.getsID());
      var row = this.currTableData.find(x => (x.getsID() == data.getsID()));
      // console.log("TCL: AdminTableComponent -> loadCreateModal -> row", row)
      if (row) {
        this.researcherService.openSnackBar('המוצר כבר קיים, עדכן את הכמות', 'סגור', 1500);
        dialogRef.close();
        this.loadEditModal(row);
      }
      else {
        this.currTableData.push(data);
        dialogRef.close();
        this.researcherService.openSnackBar('המוצר נוצר ונוסף בהצלחה', 'סגור', 1500);
      }
    });
  };

  deleteRow(index: number) {
    // console.log(this.currTableData)
    if (confirm("האם אתה בטוח שברצונך למחוק מוצר זה?")) {
      var deletedLine = this.currTableData.splice(index, 1);
      // console.log(deletedLine)
      this.deletedHistory[this.currRecIndex].push(deletedLine[0]);
      // console.log(this.deletedHistory);
      this.researcherService.openSnackBar('המוצר נמחק בהצלחה', 'סגור', 1000);
    }
  }

  undo(): void {
    this.allTableData['Value'][this.currRecIndex]['products'].push(this.deletedHistory[this.currRecIndex].pop());
  }

  saveCurrReceipt(): void {
    // console.log(this.allTableData['Value'][this.currRecIndex]);
    if (confirm("האם לשמור קבלה זו? לאחר השמירה, הקבלה לא תוצג שנית")) {
      this.researcherService.SaveCurrentReceipt(this.allTableData['Value'][this.currRecIndex], this.selectedFamily).subscribe(
        (resValue) => {
          this.allTableData['Value'][this.currRecIndex]['status'] = "1";
          this.researcherService.openSnackBar('נתוני הקבלה הנוכחית נשמרו בהצלחה', 'סגור', 1000);
        }, (error) => {
          this.researcherService.openSnackBar('שגיאה בעת שמירת הקבלה, אנא נסו שנית', 'סגור', 1000);
        });
    }
  }

  deleteCurrReceipt() {
    if (confirm("האם למחוק קבלה זו? לאחר המחיקה, הקבלה תיעלם לצמיתות מן המערכת")) {
      this.deleteEmitter.emit(this.currReceipt);
    }
  }
}
