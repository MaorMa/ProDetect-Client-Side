import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-graph-compare',
  templateUrl: './graph-compare.component.html',
  styleUrls: ['./graph-compare.component.css']
})
export class GraphCompareComponent implements OnInit, OnChanges {

  @Input() graphData: any;
  @Input() title: string;
  //Chart
  chartOptions = {
    responsive: true,
    animation: {
      easing: 'easeInOutExpo'
    }
  };
  chartData: any[];
  chartType: string = "bar";
  // = [
  //   { data: [330, 600, 260, 700] },
  // ];
  chartLabels: string[] = [];// = ['January', 'February', 'Mars', 'April'];
  done: boolean = false;
  myData: any;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    // console.log(this.graphData)ּ
    this.parseData();
  }

  parseData(): void {
    var me: number[] = [];
    var other: any[] = [];
    if (this.graphData) {
      this.graphData.forEach(data => {
        if (data.Key != null) {
          this.chartLabels.push(data.Key);
        }
        if (data.Value.Item1 != null && data.Value.Item2 != null) {
          me.push(data.Value.Item1.toFixed(2));
          other.push(data.Value.Item2.toFixed(2));
        }
      });
    }

    this.myData = {
      datasets: [
        {
          label: "אני",
          data: me
        },
        {
          label: "ממוצע",
          data: other
        }
      ]
    };

    this.chartData = this.myData.datasets;
    this.done = true;
  }
}
