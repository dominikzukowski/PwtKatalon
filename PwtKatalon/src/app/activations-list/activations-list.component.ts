import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IActivation } from 'src/app/activations-list/activation';

@Component({
  selector: 'app-activations-list',
  templateUrl: './activations-list.component.html',
  styleUrls: ['./activations-list.component.css']
})
export class ActivationsListComponent implements OnInit {
  activations: IActivation[];  

  constructor(private httpClient: HttpClient) {
    this.activations = [];
  }

  populateActivations() {
    this.getActivations().subscribe((res) => { this.activations = res });
  }

  getActivations() {
    const apiUrl = 'http://pwtkatalon/api/activations';
    let response = this.httpClient.get<IActivation[]>(apiUrl);
    return response;
  }

  ngOnInit() {
    this.populateActivations();
  }

}
