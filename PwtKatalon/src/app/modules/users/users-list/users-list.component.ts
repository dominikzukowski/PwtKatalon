import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PagerService, IPagingInfo } from '../../../shared/pagination';

@Component({
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: IUser[];
  errorMessage: any;

  pageNumber: string;
  pageSize: string;

  pager: any = {};

  constructor(private service: UserService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private pagerService: PagerService) {
      this.users = [];
     }

  ngOnInit() {
    this.populateUsers();
  }

  setPage(paging: IPagingInfo) {
    this.pager = this.pagerService.getPager(paging);
  }

  openPage(pageNumber: string, pageSize: string) {
    this.router.navigate(['/users'], { queryParams: { PageNumber: pageNumber, PageSize: pageSize } });
  }

  changePageNumber(pageNumber: string) {
    this.openPage(pageNumber, this.pageSize);
  }

  changePageSize(pageSize: string) {
    this.openPage(this.pageNumber, pageSize);
  }
  
  openUserDetails(id: number) {
    this.router.navigate(['/users', id]);
  }

  populateUsers(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.pageNumber = params['PageNumber'];
      this.pageSize = params['PageSize'] ? params['PageSize'] : "10";

      this.service.getUsers(this.pageNumber, this.pageSize).subscribe((res) => {
      this.users = res.items;
        this.setPage(res.paging);
      });
    },
      error => this.errorMessage = <any>error);
  }

}
