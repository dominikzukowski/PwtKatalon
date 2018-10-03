import { Component, OnInit } from '@angular/core';
import { ISchedule } from '../schedule';
import { ScheduleService } from '../schedule.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './scheduler-list.component.html',
  styleUrls: ['./scheduler-list.component.css']
})
export class SchedulerListComponent implements OnInit {
  schedules: ISchedule[];
  errorMessage: any;

  constructor(private service: ScheduleService, private router: Router) {
    this.schedules = [];
  }

  ngOnInit() {
    this.populateSchedules();
  }

  populateSchedules() {
    this.service.getSchedules().subscribe((res) => this.schedules = res,
      error => this.errorMessage = <any>error);
  }

  openSchedulerDetails(id: number) {
    this.router.navigate(['/scheduler', id]);
  }

}
