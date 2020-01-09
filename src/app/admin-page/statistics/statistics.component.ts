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
  selectedFamily: string = "";
  allData: ReceiptToReturnList = null;
  allFamilyData: ReceiptToReturnList;
  amountOfRec: number = 0;


  constructor(private researcherService: ResearcherService) { }

  ngOnInit() {
    this.getAllFamilies();
  }

  getAllFamilies(): void {
    this.researcherService.GetAllFamilies("View").subscribe((resValue) => {
      this.families = JSON.parse(resValue);
      this.isLoading = false;
      this.selectedFamily = '';
      this.allData = null;
      this.allFamilyData = null;
      this.amountOfRec = 0;
    });
  }

}
