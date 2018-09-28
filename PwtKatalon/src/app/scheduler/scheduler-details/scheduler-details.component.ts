import { Component, OnInit } from '@angular/core';
import { ISchedule } from '../schedule';
import { ScheduleService } from '../schedule.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './scheduler-details.component.html',
  styleUrls: ['./scheduler-details.component.css']
})
export class SchedulerDetailsComponent implements OnInit {
  schedule: ISchedule;
  errorMessage: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: ScheduleService) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id')
    this.service.getSchedule(id).subscribe((res:ISchedule)=>{
      this.schedule = res;    
    });
  }
  
  onBack() {
    this.router.navigate(['/scheduler'])
  }
}
