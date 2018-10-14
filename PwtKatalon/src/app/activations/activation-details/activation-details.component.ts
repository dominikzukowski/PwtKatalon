import { Component, OnInit } from '@angular/core';
import { IActivation } from '../../models/activation';
import { ActivatedRoute } from '@angular/router'
import { ActivationService } from '../../services/activation.service';
import { Location } from '@angular/common';
import { chartColors } from '../../shared/chartcolors';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

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
    backgroundColor: [chartColors.passedColor, chartColors.failedColor, chartColors.errorColor]
  }]

  constructor(private route: ActivatedRoute,
    private location: Location,
    private service: ActivationService,
    private spinnerService: Ng4LoadingSpinnerService) {
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
    this.spinnerService.show();
    this.service.getReport(this.activation.id).subscribe(respData => {
      
      this.downLoadFile(respData);
      this.spinnerService.hide();
     })
    
  };

  downLoadFile(data: any) {
    var blob = new Blob([data], { type: 'application/zip' });
    var anchor = document.createElement('a');
    anchor.download = `${this.activation.reportName}.zip`;
    anchor.href = window.URL.createObjectURL(blob);
    anchor.click();
  }

  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
