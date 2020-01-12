import { Component, OnInit } from '@angular/core';
import { ReceiptToReturnList } from 'src/app/Objects/receipt-to-return-list';
import { ResearcherService } from 'src/app/Services/researcher.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  families: string[] = [];
  isLoading: boolean = true;
  selectedFamily: number;
  allData: any = null;
  compareData: any = null;
  amountOfRec: number = 0;
  index: number = 0;
  title: string = "";


  constructor(private researcherService: ResearcherService) { }

  ngOnInit() {
    this.getAllFamilies();
  }

  getAllFamilies(): void {
    this.researcherService.GetAllFamilies("View").subscribe((resValue) => {
      this.families = JSON.parse(resValue);
      this.isLoading = false;
      // this.selectedFamily = '';
      this.allData = null;
      this.amountOfRec = 0;
    });
  }

  familyChanged(index: number): void {
    this.isLoading = true;
    var event = { index: 0 };
    this.tabChanged(event);
  }

  tabChanged(event: any) {
    // this.allData = null;
    this.compareData = null;
    this.index = event.index;
    switch (this.index) {
      case 0://price per catagory
        this.title = "התפלגות מחירים בכל קטגוריה"
        this.researcherService.getPricePerCategory(this.families[this.selectedFamily]).subscribe((resValue) => {
          this.allData = JSON.parse(resValue);
          this.isLoading = false;
          this.scrollToBottom();
          // console.log(this.allData);
        });
        break;
      case 1://consumption per category
        this.title = "התפלגות צריכת מוצרים בק\"ג/ליטר בכל קטגוריה"
        this.researcherService.getQuantitiesPerCategory(this.families[this.selectedFamily]).subscribe((resValue) => {
          this.allData = JSON.parse(resValue);
          this.isLoading = false;
          this.scrollToBottom();
          // console.log(this.allData);
        });
        break;
      case 2://money compare
      this.title = "השוואת הוצאות לאחרים"
      this.researcherService.GetCompareByCost(this.families[this.selectedFamily]).subscribe((resValue) => {
        this.compareData = JSON.parse(resValue);
        this.isLoading = false;
        this.scrollToBottom();
        // console.log(this.allData);
      });
      break;
    }
  }

  scrollToBottom(): void {
    window.scrollTo({
      top: 1000,
      behavior: 'smooth'
    })
  }

}
