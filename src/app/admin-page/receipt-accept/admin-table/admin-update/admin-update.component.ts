import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResearcherService } from 'src/app/Services/researcher.service';
import { ResearchProduct } from 'src/app/Objects/research-product';
import { MetaData } from 'src/app/Objects/meta-data';

@Component({
  selector: 'app-admin-update',
  templateUrl: './admin-update.component.html',
  styleUrls: ['./admin-update.component.css']
})
export class AdminUpdateComponent implements OnInit {
  @Output() editEmitter = new EventEmitter();
  updateForm: any;
  quantityInvalid: boolean = false;

  constructor(private formbulider: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: MetaData,
    private researcherService: ResearcherService) { }

  ngOnInit() {
    // console.log(this.data)
    this.updateForm = this.formbulider.group({
      sID: [this.data.sID],
      Description: [this.data.description],
      Quantity: [this.data.quantity],
      Price: [this.data.price],
    });
  }

  onFormSubmit() {
    this.focusOutCulcQuantity(this.updateForm.value.Quantity);
    this.data.sID = this.updateForm.value.sID;
    if (this.data.description !== this.updateForm.value.Description) {//if description changed
      this.data.description = this.updateForm.value.Description;
      //get similar products
      var cleanDescription = this.data.description.replace(/[.,\/#!$+%\^&\*;:{}=\-_`~()]/g, "")
      var sub = this.researcherService.GetSimilarProductsByDescription(cleanDescription)
        .subscribe((result: any[]) => {
          // console.log(result);
          if (result) {
            this.data.optionalProducts = result.map(element => new ResearchProduct().deserialize(element));
            this.data.optionalProductsChosen = this.data.optionalProducts[0];
          }
          this.changeRestOfData();
        });
    }
    else
      this.changeRestOfData();
  }

  changeRestOfData(): void {
    this.data.quantity = this.updateForm.value.Quantity;
    this.data.price = this.updateForm.value.Price;
    this.editEmitter.emit(this.data);
  }

  resetForm() {
    this.updateForm.reset();
  }

  focusOutCulcQuantity(quan: String) {
    quan = quan.toString().replace(/[,\/#!$%\^&\*;:{}\=\-_`~()]/g, "")
    var splitQuan = quan.split('+');
    var sum = 0;
    splitQuan.forEach(num => sum += parseFloat(num.trim()));
    if (!isNaN(sum)) {
      this.updateForm.get('Quantity').setValue(parseFloat(sum.toFixed(3)));
    }
    else {
      this.updateForm.get('Quantity').setValue(1);
    }
  }

}
