import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Nutrient } from 'src/app/Objects/nutrient';

@Component({
  selector: 'app-nutrient-view',
  templateUrl: './nutrient-view.component.html',
  styleUrls: ['./nutrient-view.component.css']
})
export class NutrientViewComponent implements OnInit {

  nutrients: Nutrient[];
  nutrientsToShow: Nutrient[];
  nutEnum: any = NutCodeToName;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data)
    this.nutrients = this.data.Nutrients;
    this.nutrientsToShow = this.nutrients.filter(element => element.$value != 0)
    // console.log(this.nutrients)
    // console.log(this.nutrientsToShow)
  }
}

export enum NutCodeToName {
  nut203 = "Protein",
  nut204 = "Total_lipid_fat",
  nut205 = "Carbohydrate_by_difference",
  nut208 = "Energy",
  nut221 = "Alcohol_ethyl",
  nut255 = "Water",
  nut291 = "Fiber_total_dietary",
  nut301 = "Calcium_Ca",
  nut303 = "Iron_Fe",
  nut304 = "Magnesium_Mg",
  nut305 = "Phosphorus_P",
  nut306 = "Potassium_K",
  nut307 = "Sodium_Na",
  nut309 = "Zinc_Zn",
  nut312 = "Copper_Cu",
  nut318 = "Vitamin_A_IU",
  nut320 = "Vitamin_A_RAE",
  nut321 = "Carotene_beta",
  nut323 = "Vitamin_E_alpha_tocopherol",
  nut401 = "Vitamin_C_total_ascorbic_acid",
  nut404 = "Thiamin",
  nut405 = "Riboflavin",
  nut406 = "Niacin",
  nut415 = "Vitamin_B_6",
  nut417 = "Folate_total",
  nut418 = "Vitamin_B_12",
  nut601 = "Cholesterol",
  nut606 = "Fatty_acids_total_saturated",
  nut607 = "F_4_0",
  nut608 = "F_6_0",
  nut609 = "F_8_0",
  nut610 = "F_10_0",
  nut611 = "F_12_0",
  nut612 = "F_14_0",
  nut613 = "F_16_0",
  nut614 = "F_18_0",
  nut617 = "F_18_1_undifferentiated",
  nut618 = "F_18_2_undifferentiated",
  nut619 = "F_18_3_undifferentiated",
  nut620 = "F_20_4_undifferentiated",
  nut621 = "F_22_6_n_3",
  nut622 = "לנוטריאנט זה לא מופיע שם",
  nut623 = "לנוטריאנט זה לא מופיע שם",
  nut628 = "F_20_1",
  nut625 = "F_14_1",
  nut630 = "F_22_1_undifferentiated",
  nut631 = "F_22_5_n_3",
  nut645 = "Fatty_acids_total_monounsaturated",
  nut646 = "Fatty_acids_total_polyunsaturated",
  nut324 = "Vitamin_D_IU",
  nut269 = "Sugars_total",
  nut605 = "Fatty_acids_total_trans"
}
