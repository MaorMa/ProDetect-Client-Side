import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ResearcherService } from 'src/app/Services/researcher.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, OnChanges {

  @Input() graphData: any;
  @Input() title: string;
  graphs: any[] = [{ name: 'pie', description: 'גרף עוגה', selected: true }, { name: 'bar', description: 'גרף עמודות', selected: false }]
  selectedGraph: any;

  //Chart
  chartOptions = {
    responsive: true,
    animation: {
      easing: 'easeInOutExpo'
    }
  };
  // chartDataInValue: any[];
  total: number = 0;
  chartData: any[];
  // = [
  //   { data: [330, 600, 260, 700] },
  // ];
  chartLabels: string[] = [];// = ['January', 'February', 'Mars', 'April'];
  done: boolean = false;
  constructor(private researcherService: ResearcherService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    // console.log(this.graphData)
    this.selectedGraph = this.graphs[0];
    this.chartLabels = [];
    // this.chartDataInValue = [];
    this.parseData();
  }

  parseData(): void {
    var tmpData: number[] = [];
    this.graphData.forEach(data => {
      let numValue: any = data['Value'];
      if (numValue != 0) {
        tmpData.push(numValue.toFixed(2));
        this.chartLabels.push(data['Key'])
      }
    });
    this.chartData = [{ data: tmpData, label: 'המידע שלי' }]
    // console.log(this.chartData)
    this.done = true;
  }

}
