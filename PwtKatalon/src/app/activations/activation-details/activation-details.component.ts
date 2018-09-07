import { Component, OnInit } from '@angular/core';
import { IActivation } from '../activation';

@Component({
  templateUrl: './activation-details.component.html',
  styleUrls: ['./activation-details.component.css']
})
export class ActivationDetailsComponent implements OnInit {
  activation: IActivation;

  constructor() { }

  ngOnInit() {
  }

}
