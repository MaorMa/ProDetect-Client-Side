import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResearcherService } from 'src/app/Services/researcher.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-family',
  templateUrl: './add-family.component.html',
  styleUrls: ['./add-family.component.css']
})
export class AddFamilyComponent implements OnInit {
  createForm: FormGroup;

  constructor(private formbulider: FormBuilder, private researcherService: ResearcherService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    const english =
    "/^[a-zA-Z]+$/";
    this.createForm = this.formbulider.group({
      sID: [ '', [Validators.required, Validators.pattern(english)]]
    });
  }

  onFormSubmit(createFormValue: any): void {
    var familyName: string;
    familyName = createFormValue.sID;
    this.researcherService.CreateNewUser(familyName).subscribe(
      (resValue) => {
        this.openSnackBar('משתמש נוצר בהצלחה', 'סגור', 1000);
        this.createForm.reset();
      }, (error) => {
        this.openSnackBar('לא נוצר משתמש. אנא נסו שנית', 'סגור', 1000);
      });
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
