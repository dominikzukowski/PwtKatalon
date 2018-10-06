import { Component, OnInit, OnDestroy } from '@angular/core';
import { IActivation } from '../activation';
import { ActivationService } from '../activation.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { PagerService, IPagingInfo } from '../../pagination';

@Component({
  templateUrl: './activations-list.component.html',
  styleUrls: ['./activations-list.component.css']
})

export class ActivationsListComponent implements OnInit, OnDestroy {
  activations: IActivation[];
  errorMessage: any;

  pageNumber: string;
  pageSize: string;

  navigationSubscription;
  pager: any = {};

  constructor(private service: ActivationService, private router: Router, private activatedRoute: ActivatedRoute, private pagerService: PagerService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.populateActivations();
      }
    });
    this.activations = [];
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.populateActivations();
  }

  setPage(paging: IPagingInfo) {
    this.pager = this.pagerService.getPager(paging);
  }

  openPage(pageNumber: string, pageSize: string) {
    this.router.navigate(['/activations'], { queryParams: { PageNumber: pageNumber, PageSize: pageSize } });
  }

  changePageNumber(pageNumber: string) {
    this.openPage(pageNumber, this.pageSize);
    console.log(pageNumber);
    console.log(this.pageSize);
  }

  changePageSize(pageSize: string) {
    this.openPage(this.pageNumber, pageSize);
    console.log(this.pageNumber);
    console.log(pageSize);
  }

  populateActivations() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.pageNumber = params['PageNumber'];
      this.pageSize = params['PageSize'] ? params['PageSize'] : "10";

      this.service.getActivations(this.pageNumber, this.pageSize).subscribe((res) => {
      this.activations = res.items;
        this.setPage(res.paging);
      });
    },
      error => this.errorMessage = <any>error);
  }

  openActivationDetails(id: number) {
    this.router.navigate(['/activation', id]);
  }
}
