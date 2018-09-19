import { Component, OnInit } from '@angular/core';
import { IActivation } from '../activation';
import { ActivatedRoute, Router } from '@angular/router'
import { ActivationService } from '../activation.service';
import * as FileSaver from 'file-saver';

@Component({
  templateUrl: './activation-details.component.html',
  styleUrls: ['./activation-details.component.css']
})
export class ActivationDetailsComponent implements OnInit {
  activation: IActivation;
  errorMessage: any;
  passed:any;
  public chartLabels:string[] = ['Passed','Failed'];
  public chartData:number[];
  public chartType:string = 'pie';
  public chartColors:any[] = [{ 
  backgroundColor:["#008000", "#FF0000"] 
  }]

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private service: ActivationService) {
   }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id')

    this.service.getActivation(id).subscribe((res:IActivation)=>{
      this.activation = res;
      this.chartData = [this.activation.counterPassed,this.activation.counterFailed];
    });   
  }

  onBack() {
    this.router.navigate(['/activations'])
  }

  public chartClicked(e:any):void {
  //   let report;
  //   this.service.getActivationReport(this.activation.id).subscribe((res)=>{
  //     report = res
  //     console.log(report)
  //    let blob = new Blob([this.str2bytes(report)], {type: 'application/zip'});
  //  window.
  //   FileSaver.saveAs(blob, 'reports.zip');    
    // });
      // this.service.getBlob(this.activation.id).subscribe((res:any) => {
      //   const blob = new Blob([res._body], {type:'application/zip'});
      //   saveAs(blob, "test.zip");
      // })


  }

  str2bytes (str: String) {
    var bytes = new Uint8Array(str.length);
    for (var i=0; i<=str.length; i++) {
        bytes[i] = str.charCodeAt(i);
    }
    console.log(bytes);
    return bytes;
}
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
