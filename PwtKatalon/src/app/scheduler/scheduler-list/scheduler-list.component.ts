import { Component, OnInit } from '@angular/core';
import { ISchedule } from '../schedule';
import { ScheduleService } from '../schedule.service';

@Component({
  templateUrl: './scheduler-list.component.html',
  styleUrls: ['./scheduler-list.component.css']
})
export class SchedulerListComponent implements OnInit {
  schedules: ISchedule[];
  errorMessage: any;

  constructor(private service: ScheduleService) {
    this.schedules = [];
   }

  populateSchedules(){
    this.service.getSchedules().subscribe((res)=>this.schedules = res,
    error => this.errorMessage = <any>error);
  }

  ngOnInit() {
    this.populateSchedules();
  }

}
