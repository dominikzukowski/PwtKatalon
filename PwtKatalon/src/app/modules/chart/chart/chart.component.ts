import { Component, OnInit } from '@angular/core';
import { ActivationService } from '../../../services/activation.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { chartColors } from '../../../shared/chartcolors';

const ACTIVATION_ID_INDEX: number = 4;
const ACTIVATION_LABEL_INDEX: number = 0;

@Component({
  selector: 'app-charts',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  versionDrop = new FormControl('');
  environmentDrop = new FormControl('');
  envinronments: string[];
  versions: string[];
  details: Array<Array<string>>;
  coloredColumnIndex: number;
  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any>;

  public lineChartOptions: any = {
    responsive: true,
    elements: {
      line: {
          tension: 0, // disables bezier curves
      }
    }
  };
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  public lineChartColors: Array<any> = [{
    backgroundColor: chartColors.passedColorTransparent,
    borderColor: chartColors.passedColor,
  },
  {
    backgroundColor: chartColors.failedColorTransaprent,
    borderColor:  chartColors.failedColor,
  },
  {
    backgroundColor: chartColors.errorColorTransparent,
    borderColor: chartColors.errorColor
  }
  ];

  constructor(private service: ActivationService, private router: Router) { }

  ngOnInit() {
    this.service.getVersions().subscribe((res) => {
      this.versions = res.reverse();
      this.versionDrop.setValue(this.versions[0]);
      this.service.getEnvironments().subscribe((res) => {
        this.envinronments = res
        this.environmentDrop.setValue(this.envinronments[0]);
        this.refreshChart();
      });
    });
  }

  refreshChart() {
    this.getDetails(this.environmentDrop.value.trim(), this.versionDrop.value.trim());
  }

  private getDetails(environment: string, version: string) {
    this.service.getDetails(environment, version).subscribe((res) => {

      if (this.lineChartData)
        this.lineChartData.length = 0;

      this.details = res;
      const arrayColumn = (arr, n) => arr.map(x => x[n]);

      for (let i = 1; i <= 3; i++) {
        this.lineChartData.push({ data: this.details.slice(1).map(x => x[i]), label: this.details[ACTIVATION_LABEL_INDEX][i] });
      }

      this.lineChartLabels = arrayColumn(this.details.slice(1), 0);
    });
  }

  public chartClicked(clickedChartColumn: any, table: any): void {
    try {
      let index = clickedChartColumn.active[0]._index

      this.coloredColumnIndex = index
      let tableColumn = table.rows[0].cells[index];
    
      tableColumn.scrollIntoView();

    }
    catch (err) {
      console.log(err);
    }
  }

  getColor(index, label) {
    if (index == this.coloredColumnIndex) {
      switch (label) {
        case 'Passed':
          return chartColors.passedColorTransparent;
        case 'Failed':
          return chartColors.failedColorTransaprent;
        case 'Errors':
          return chartColors.errorColorTransparent;
      }
    }
  }

  openActivationDetails(index: any) {
    console.log(this.details[index][ACTIVATION_ID_INDEX]);
    this.router.navigate(['/activations', this.details[index][ACTIVATION_ID_INDEX]]);
  }

}
