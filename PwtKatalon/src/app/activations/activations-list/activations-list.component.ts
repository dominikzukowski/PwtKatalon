import { Component, OnInit } from '@angular/core';
import { IActivation } from '../activation';
import { ActivationService } from '../activation.service';

@Component({
  templateUrl: './activations-list.component.html',
  styleUrls: ['./activations-list.component.css']
})
export class ActivationsListComponent implements OnInit {
  activations: IActivation[];  
  errorMessage: any;
  constructor(private service: ActivationService) {
    this.activations = [];
  }

  populateActivations() {
    this.service.getActivations().subscribe((res) => this.activations = res,
    error => this.errorMessage = <any>error );
  }

  ngOnInit() {
    this.populateActivations();
  }
}
