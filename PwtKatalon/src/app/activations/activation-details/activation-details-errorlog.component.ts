import { Component, OnInit } from '@angular/core';
import { IActivation } from '../activation';
import { ActivatedRoute } from '@angular/router'
import { ActivationService } from '../activation.service';
import { Location } from '@angular/common';

@Component({
  templateUrl: './activation-details-errorlog.component.html',
})
export class ActivationDetailsErrorLogComponent implements OnInit {
  activation: IActivation;
  errorMessage: any;

  constructor(private route: ActivatedRoute,
    private location: Location,
    private service: ActivationService) {
  }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id')

    this.service.getActivationErrorLog(id).subscribe((res: IActivation) => {
      this.activation = res;

    });
  }

  onBack() {
    this.location.back();
  }
}
