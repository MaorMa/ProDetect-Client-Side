import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-update',
  templateUrl: './admin-update.component.html',
  styleUrls: ['./admin-update.component.css']
})
export class AdminUpdateComponent implements OnInit {
  @Output() editEmitter = new EventEmitter();
  updateForm: any;

  constructor(private formbulider: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) { }

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
    this.data.sID = this.updateForm.value.sID;
    this.data.description = this.updateForm.value.Description;
    this.data.quantity = this.updateForm.value.Quantity;
    this.data.price = this.updateForm.value.Price;
    this.editEmitter.emit(this.data);
  }

  resetForm() {
    this.updateForm.reset();
  }

}
