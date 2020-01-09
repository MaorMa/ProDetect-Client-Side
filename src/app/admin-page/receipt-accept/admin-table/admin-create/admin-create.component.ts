import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResearcherService } from 'src/app/Services/researcher.service';
import { MetaData } from 'src/app/Objects/meta-data';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.css']
})
export class AdminCreateComponent implements OnInit {
  @Output() createEmitter = new EventEmitter();
  createForm: FormGroup;
  infoReceived: boolean = false;
  optionalProducts: string;

  constructor(private formbulider: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar, private researcherService: ResearcherService) { }

  ngOnInit() {
    // console.log(this.data);
    this.createForm = this.formbulider.group({
      sID: ['', [Validators.required]],
      Description: [{ value: '', disabled: true }],
      Quantity: [{ value: 1, disabled: true }],
      Price: [{ value: 0, disabled: true }],
    });
  }

  getProductInfo(): void {
    this.researcherService.GetAllDataForMarketAndProductID(this.data['marketID'], this.createForm.value.sID).subscribe((resValue) => {
      // console.log(JSON.parse(resValue))
      if (JSON.parse(resValue).length == 0) {
        this.createForm.get('Description').enable();
        this.createForm.get('Price').enable();
        this.createForm.get('Quantity').enable();
        this.openSnackBar('מוצר זה לא קיים במערכת, אנא מלאו את הפרטים ידנית', 'סגור', 2000);
      }
      else {
        var data = JSON.parse(resValue);//Data = array with 1 cell with Key- product data, Value- optional products
        // console.log(data[0].Value)
        var productInfo = data[0].Key[0].split(',');
        this.optionalProducts = data[0].Value;
        this.createForm.get('Description').setValue(productInfo[1]);
        this.createForm.get('Description').enable();
        this.createForm.get('Price').setValue(productInfo[2]);
        this.createForm.get('Price').enable();
        this.createForm.get('Quantity').enable();
        // console.log(this.createForm)
      }
      this.infoReceived = true;
    });

  }

  onFormSubmit(createFormValue: any): void {
    var productLine: MetaData = new MetaData();
    // console.log(createFormValue)
    productLine['description'] = createFormValue.Description;
    productLine['sID'] = createFormValue.sID;
    productLine['quantity'] = createFormValue.Quantity;
    productLine['price'] = createFormValue.Price;
    productLine['validProduct'] = true;
    productLine.setOptionalProducts(this.optionalProducts);
    // console.log(productLine)
    this.createEmitter.emit(productLine);
  }

  resetForm() {
    this.createForm.reset();
    this.createForm.get('Description').disable();
    this.createForm.get('Price').disable();
    this.createForm.get('Quantity').disable();
    this.infoReceived = false;
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
