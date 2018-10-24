import { Component, OnInit } from '@angular/core';
import { IActivation } from '../../../models/activation';
import { ActivatedRoute } from '@angular/router'
import { ActivationService } from '../../../services/activation.service';
import { Location } from '@angular/common';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  templateUrl: './activation-details-log.html',
})
export class ActivationDetailsConsolelogComponent implements OnInit {
  activation: IActivation;
  id: number;
  errorMessage: any;
  log: string;
  
  constructor(private route: ActivatedRoute,
    private location: Location,
    private service: ActivationService,
    private spinnerService: Ng4LoadingSpinnerService) {
  }

  ngOnInit() {
    this.spinnerService.show();
    this.id = +this.route.snapshot.paramMap.get('id')
    this.service.getActivationConsoleLog(this.id).subscribe((res) => {
      this.activation = res;
      this.log = this.activation.consoleLog;
      this.spinnerService.hide();
    });
  }

  onBack() {
    this.location.back();
  }

  scroll(e:any) {  
     e.scrollIntoView();
  }
}
