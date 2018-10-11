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
  id: number;
  errorMessage: any;

  constructor(private route: ActivatedRoute,
    private location: Location,
    private service: ActivationService) {
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id')

    this.service.getActivationErrorLog(this.id).subscribe((res: IActivation) => {
      this.activation = res;

    });
  }

  onBack() {
    this.location.back();
  }

  scroll(e:any) {  
     e.scrollIntoView();
  }
}
