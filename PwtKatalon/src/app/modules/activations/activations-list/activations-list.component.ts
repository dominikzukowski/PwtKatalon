import { Component, OnInit } from '@angular/core';
import { IActivation } from '../../../models/activation';
import { ActivationService } from 'src/app/services/activation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PagerService, IPagingInfo, IPagination } from '../../../shared/pagination';

@Component({
  templateUrl: './activations-list.component.html',
  styleUrls: ['./activations-list.component.css']
})

export class ActivationsListComponent implements OnInit {
  activations: IActivation[];
  errorMessage: any;

  pageNumber: string;
  pageSize: string;

  pager: any = {};

  constructor(private service: ActivationService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private pagerService: PagerService) {
       this.activations = [];
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
  }

  changePageSize(pageSize: string) {
    this.openPage(this.pageNumber, pageSize);
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
    this.router.navigate(['/activations', id]);
  }
}
