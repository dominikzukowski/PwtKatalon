import { Component, OnInit } from '@angular/core';
import { IActivation } from '../activation';
import { ActivatedRoute, Router } from '@angular/router'
import { ActivationService } from '../activation.service';


@Component({
  templateUrl: './activation-details.component.html',
  styleUrls: ['./activation-details.component.css']
})
export class ActivationDetailsComponent implements OnInit {
  activation: IActivation;
  errorMessage: any;
  passed: any;
  public chartLabels: string[] = ['Passed', 'Failed'];
  public chartData: number[];
  public chartType: string = 'pie';
  public chartColors: any[] = [{
    backgroundColor: ["#008000", "#FF0000"]
  }]

  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: ActivationService) {
  }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id')

    this.service.getActivation(id).subscribe((res: IActivation) => {
      this.activation = res;
      this.chartData = [this.activation.counterPassed, this.activation.counterFailed];
    });
  }

  onBack() {
    this.router.navigate(['/activations'])
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
