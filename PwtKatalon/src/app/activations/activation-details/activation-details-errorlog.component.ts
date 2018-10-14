import { Component, OnInit } from '@angular/core';
import { IActivation } from '../../models/activation';
import { ActivatedRoute } from '@angular/router'
import { ActivationService } from '../../services/activation.service';
import { Location } from '@angular/common';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  templateUrl: './activation-details-errorlog.component.html',
})
export class ActivationDetailsErrorLogComponent implements OnInit {
  activation: IActivation;
  id: number;
  errorMessage: any;

  constructor(private route: ActivatedRoute,
    private location: Location,
    private service: ActivationService,
    private spinnerService: Ng4LoadingSpinnerService) {
  }

  ngOnInit() {
    this.spinnerService.show();
    this.id = +this.route.snapshot.paramMap.get('id')
    this.service.getActivationErrorLog(this.id).subscribe((res: IActivation) => {
      this.activation = res;
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
