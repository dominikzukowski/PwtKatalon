import { Component, OnInit } from '@angular/core';
import { IActivation } from '../activation';
import { ActivationService } from '../activation.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './activations-list.component.html',
  styleUrls: ['./activations-list.component.css']
})
export class ActivationsListComponent implements OnInit {
  activations: IActivation[];  
  errorMessage: any;
  
  constructor(private service: ActivationService, private router: Router) {
    this.activations = [];
  }

  ngOnInit() {
    this.populateActivations();
  }

  populateActivations() {
    this.service.getActivations().subscribe((res) => this.activations = res,
    error => this.errorMessage = <any>error );
  }
  
  openActivationDetails(id: number) {
    this.router.navigate(['/activation', id]);
  }
}
