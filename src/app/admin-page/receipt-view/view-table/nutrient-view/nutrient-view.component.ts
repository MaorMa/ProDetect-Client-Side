import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Nutrient } from 'src/app/Objects/nutrient';
import { element } from 'protractor';

@Component({
  selector: 'app-nutrient-view',
  templateUrl: './nutrient-view.component.html',
  styleUrls: ['./nutrient-view.component.css']
})
export class NutrientViewComponent implements OnInit {
  
  nutrients: Nutrient[];
  nutrientsToShow: Nutrient[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    // console.log(this.data)
    this.nutrients = this.data.Nutrients;
    this.nutrientsToShow = this.nutrients.filter(element => element.$value !== "0")
    // console.log(this.nutrients)
    // console.log(this.nutrientsToShow)
  }

}
