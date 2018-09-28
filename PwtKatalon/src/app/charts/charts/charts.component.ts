import { Component, OnInit } from '@angular/core';
import { ActivationService } from '../../activations/activation.service';
import { FormControl } from '@angular/forms';

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

  constructor(private service: ActivationService) { }


  refreshChart() {
   // console.log("Dupa:" + this.versionId);
    this.getDetails(this.environmentDrop.value, this.versionDrop.value);
   // console.log(    this.versionI.value);
  }

  ngOnInit() {
    this.service.getVersions().subscribe((res) => {this.versions = res;
      this.versionDrop.setValue(this.versions[0]);
      this.service.getEnvironments().subscribe((res) => { this.envinronments = res
        this.environmentDrop.setValue(this.envinronments[0]);
        this.refreshChart();
      });
    });
    // this.service.getEnvironments().subscribe((res) => { this.envinronments = res
    //   this.environmentDrop.setValue(this.envinronments[0]);
    //   this.refreshChart();
    // });
    
    //this.refreshChart()
    
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
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
