import { Component, OnInit } from '@angular/core';
import { ResearcherService } from 'src/app/Services/researcher.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  constructor(private researcherService: ResearcherService) { }

  ngOnInit() {
  }

  chartOptions = {
    responsive: true
  };

  chartData = [
    { data: [330, 600, 260, 700] },
  ];

  chartLabels = ['January', 'February', 'Mars', 'April'];

  onChartClick(event) {
    console.log(event);
  }

}
