import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResearcherService } from 'src/app/Services/researcher.service';
import { MetaData } from 'src/app/Objects/meta-data';
import { MatSnackBar } from '@angular/material';
import { ResearchProduct } from 'src/app/Objects/research-product';

@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.css']
})
export class AdminCreateComponent implements OnInit {
  @Output() createEmitter = new EventEmitter();
  createForm: FormGroup;
  infoReceived: boolean = false;
  optionalProducts: ResearchProduct[] = [];

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

  UpsertSimilarProducts(sID: number, description: string, productLine: MetaData) {
    this.researcherService.UpsertSimilarProducts(description, this.data['marketID'], sID).subscribe((resValue: ResearchProduct[]) => {
      // console.log(resValue);
      productLine.setOptionalProducts(resValue);
      this.createEmitter.emit(productLine);
      this.infoReceived = true;
    });
  }

  onFormSubmit(createFormValue: any): void {
    this.focusOutCulcQuantity(this.createForm.value.Quantity);
    var productLine: MetaData = new MetaData();
    productLine['description'] = createFormValue.Description;
    productLine['sID'] = createFormValue.sID;
    productLine['quantity'] = this.createForm.get('Quantity').value;
    productLine['price'] = createFormValue.Price;
    productLine['validProduct'] = true;
    if (this.optionalProducts.length != 0) {
      productLine.setOptionalProducts(this.optionalProducts);
      this.createEmitter.emit(productLine);
    }
    else {
      this.UpsertSimilarProducts(createFormValue.sID, createFormValue.Description, productLine);
      //call
    }
    // console.log(productLine)
  }

  resetForm() {
    this.createForm.reset();
    this.createForm.get('Description').disable();
    this.createForm.get('Price').disable();
    this.createForm.get('Quantity').disable();
    this.optionalProducts = [];
    this.infoReceived = false;
  }

  focusOutCulcQuantity(quan: String) {
    quan = quan.toString().replace(/[,\/#!$%\^&\*;:{}\=\-_`~()]/g, "")
    var splitQuan = quan.split('+');
    var sum = 0;
    splitQuan.forEach(num => sum += parseFloat(num.trim()));
    if (!isNaN(sum)) {
      this.createForm.get('Quantity').setValue(parseFloat(sum.toFixed(3)));
    }
    else {
      this.createForm.get('Quantity').setValue(1);
    }
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
