import { Component, OnInit } from '@angular/core';
import { IActivation } from '../activation';
import { ActivatedRoute } from '@angular/router'
import { ActivationService } from '../activation.service';
import { Location } from '@angular/common';

@Component({
  templateUrl: './activation-details.component.html',
  styleUrls: ['./activation-details.component.css']
})
export class ActivationDetailsComponent implements OnInit {
  activation: IActivation;
  errorMessage: any;
  passed: any;
  public chartLabels: string[] = ['Passed', 'Failed', 'Error'];
  public chartData: number[];
  public chartType: string = 'pie';
  public chartColors: any[] = [{
    backgroundColor: ["#008000", "#FF0000", "rgba(0, 0, 255, 1)"]
  }]

  constructor(private route: ActivatedRoute,
    private location: Location,
    private service: ActivationService) {
  }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id')

    this.service.getActivation(id).subscribe((res: IActivation) => {
      this.activation = res;
      this.chartData = [this.activation.counterPassed, this.activation.counterFailed, this.activation.counterErrors];
    });
  }

  onBack() {
    this.location.back();
  }

  getFile() {
    this.service.getReport(this.activation.id).subscribe(respData => 
      this.downLoadFile(respData)
    )};

  downLoadFile(data: any) {
    var blob = new Blob([data], { type: 'application/zip' });
    var anchor = document.createElement('a');
    anchor.download = `report_${this.activation.id}.zip`;
    anchor.href = window.URL.createObjectURL(blob);
    anchor.click();
  }

  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
