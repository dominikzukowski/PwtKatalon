import { Component, OnInit } from '@angular/core';
import { ActivationService } from '../../activations/activation.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  versionDrop = new FormControl('');
  environmentDrop = new FormControl('');
  envinronments: string[];
  versions: string[];
  details: Array<Array<string>>;
  coloredColumnIndex: number;

  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any>;

  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  public lineChartColors: Array<any> = [{
    backgroundColor: 'rgba(0, 150, 0, 0.2)',
    borderColor: 'rgba(0, 150, 0, 1)',
  },
  {
    backgroundColor: 'rgba(200, 0, 0, 0.2)',
    borderColor: 'rgba(200, 0, 0, 1)'
  },
  {
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
    borderColor: 'rgba(0, 0, 255, 1)'
  }
  ];

  constructor(private service: ActivationService, private router: Router) { }

  refreshChart() {
    this.getDetails(this.environmentDrop.value, this.versionDrop.value);
  }

  openActivationDetails(e: any) {
    console.log(this.details[e + 1][4]);
    this.router.navigate(['/activation', this.details[e + 1][4]]);
  }

  ngOnInit() {
    this.service.getVersions().subscribe((res) => {
      this.versions = res;
      this.versionDrop.setValue(this.versions[0]);
      this.service.getEnvironments().subscribe((res) => {
        this.envinronments = res
        this.environmentDrop.setValue(this.envinronments[0]);
        this.refreshChart();
      });
    });
  }

  private getDetails(environment: string, version: string) {
    this.service.getDetails(environment, version).subscribe((res) => {

      if (this.lineChartData)
        this.lineChartData.length = 0;

      this.details = res;
      const arrayColumn = (arr, n) => arr.map(x => x[n]);

      for (let i = 1; i <= 3; i++) {
        this.lineChartData.push({ data: this.details.slice(1).map(x => x[i]), label: this.details[0][i] });
      }

      this.lineChartLabels = arrayColumn(this.details.slice(1), 0);
    });
  }

  public chartClicked(e: any): void {
    try {
      this.coloredColumnIndex = e.active[0]._index
    }
    catch (err) {
      console.log(err);
    }
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  getColor(index, label) {
    if (index == this.coloredColumnIndex) {
      switch (label) {
        case 'Passed':
          return 'rgba(0, 150, 0, 0.2)';
        case 'Failed':
          return 'rgba(200, 0, 0, 0.2)';
        case 'Errors':
          return 'rgba(0, 0, 255, 0.2)';
      }
    }

  }

}