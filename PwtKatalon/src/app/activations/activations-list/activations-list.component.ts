import { Component, OnInit } from '@angular/core';
import { IActivation } from '../activation';
import { ActivationService } from '../activation.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './activations-list.component.html',
  styleUrls: ['./activations-list.component.css']
})
export class ActivationsListComponent implements OnInit {
  activations: IActivation[];  
  errorMessage: any;
  nextpage: string;
  
  constructor(private service: ActivationService, private router: Router,private activatedRoute: ActivatedRoute) {
    this.activations = [];
    this.activatedRoute.queryParams.subscribe(params => {
      let date = params['PageNumber'];
      let date2 = params['PageSize'];
      console.log(date); // Print the parameter to the console. 
      console.log(date2); // Print the parameter to the console. 
  });
  }

  ngOnInit() {
    this.populateActivations();
  }

  populateActivations() {
    this.service.getActivations().subscribe((res) => {this.activations = res.items;
      console.log(res.links[0].href);
      this.nextpage = res.links.find(res=>res.rel == "nextPage").href;
  },
    error => this.errorMessage = <any>error );
  }
  
  openActivationDetails(id: number) {
    this.router.navigate(['/activation', id]);
  }
}
