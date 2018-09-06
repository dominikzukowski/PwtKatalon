import { Component, OnInit } from '@angular/core';
import { IActivation } from 'src/app/activations-list/activation';
import { ActivationService } from './activation.service';

@Component({
  selector: 'app-activations-list',
  templateUrl: './activations-list.component.html',
  styleUrls: ['./activations-list.component.css']
})
export class ActivationsListComponent implements OnInit {
  activations: IActivation[];  

  constructor(private service: ActivationService) {
    this.activations = [];
  }

  populateActivations() {
    this.service.getActivations().subscribe((res) => { this.activations = res });
  }

  ngOnInit() {
    this.populateActivations();
  }
}
