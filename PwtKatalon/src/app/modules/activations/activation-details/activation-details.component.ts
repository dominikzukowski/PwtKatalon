import { Component, OnInit } from '@angular/core';
import { IActivation } from '../../../models/activation';
import { ActivatedRoute } from '@angular/router'
import { ActivationService } from '../../../services/activation.service';
import { Location } from '@angular/common';
import { chartColors } from '../../../shared/chartcolors';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DateUtils } from '../../../shared/dateUtils';

@Component({
  templateUrl: './activation-details.component.html',
  styleUrls: ['./activation-details.component.css']
})
export class ActivationDetailsComponent implements OnInit {
  activation: IActivation;
  errorMessage: any;
  passed: any;
  url: string = 'about:blank';
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
    this.service.getActivation(id).subscribe((res) => {
      this.activation = res;
      this.activation.activationTime = DateUtils.getGMTDateTransformToLocalTime(this.activation.activationTime.toString())
      this.chartData = [this.activation.counterPassed, this.activation.counterFailed, this.activation.counterErrors];
    });
  }

  onBack() {
    this.location.back();
  }

  getRepo() {

    
     this.service.getReportPage(this.activation.id).subscribe((r:string)=>{
      var wnd = window.open("",);
//console.log(r)
      wnd.document.write(r);
     } )
    //   this.openRepo(r);
    // })
  }
;
  getFile2(){
    this.spinnerService.show();
    this.url = "http://pwtkatalon/activations/200/report";
    var dupa = document.getElementById("reportiframe");
    
  }

  uploadDone(){
    console.log("done");
    this.spinnerService.hide();
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
