import { Component, OnInit } from '@angular/core';
import { ActivationService } from '../../../services/activation.service';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { chartColors } from '../../../shared/chartcolors';
import { IUser } from '../../../models/user';
import { DateUtils } from '../../../shared/dateUtils';

const ACTIVATION_ID_INDEX: number = 4;
const ACTIVATION_LABEL_INDEX: number = 0;
const ACTIVATION_USER_INDEX: number = 5;

@Component({
  selector: 'app-charts',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  count: string;
  userId: string;
  envinronmentId: string;
  version: string;

  versionDrop = new FormControl('');
  environmentDrop = new FormControl('');
  userDrop = new FormControl('');
  countDrop = new FormControl('');

  envinronments: string[];
  versions: string[];
  users: IUser[];

  details: Array<Array<string>>;
  coloredColumnIndex: number;
  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any>;
  public lineTableActivationUsers: Array<any>;

  public lineChartOptions: any = {
    responsive: true,
    elements: {
      line: {
        tension: 0, // disables bezier curves
      }
    }
  };
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  public lineChartColors: Array<any> = [{
    backgroundColor: chartColors.passedColorTransparent,
    borderColor: chartColors.passedColor,
  },
  {
    backgroundColor: chartColors.failedColorTransaprent,
    borderColor: chartColors.failedColor,
  },
  {
    backgroundColor: chartColors.errorColorTransparent,
    borderColor: chartColors.errorColor
  }
  ];

  constructor(private service: ActivationService, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.count = params['count'] ? params['count'] : "50";
      this.userId = params['user'] ? params['user'] : "default";
      this.envinronmentId = params['env'] ? params['env'] : "default";
      this.version = params['ver'] ? params['ver'] : "default";

      this.countDrop.setValue(this.count);
      this.setUserDrop();
      this.setEnvinronmentsDrop();
      this.setVersionsDrop();

      this.refreshChart();
    })
  }

  setUserDrop(){
    this.service.getUsers().subscribe((res) => {
      this.users = res;
      this.userDrop.setValue(this.userId);
    });
  }

  setEnvinronmentsDrop(){
    this.service.getEnvironments().subscribe((res) => {
      this.envinronments = res;
      this.environmentDrop.setValue(this.envinronmentId);
    });
  }

  setVersionsDrop(){
    this.service.getVersions().subscribe((res) => {
      this.versions = res.reverse();
      this.versionDrop.setValue(this.version);
    });
  }

  refreshChart() {
    this.getDetails(this.envinronmentId, this.version, this.userId, this.count);
  }

  changeEnvinronment(envinronmentId: any) {
    this.envinronmentId = envinronmentId;
    this.navigate()
  }

  changeUser(userId: any) {
    this.userId = userId;
    this.navigate()
  }

  changeVersion(version: any) {
    this.version = version;
    this.navigate()
  }

  changeCount(count: any) {
    this.count = count;
    this.navigate()
  }

  navigate(){
    this.router.navigate(['/charts'], { queryParams: { 
      count: this.count,
      user: this.userId, 
      env: this.envinronmentId,
      ver: this.version } });
  }

  private getDetails(environment: string, version: string, user: string, count: string) {
    this.service.getDetails(environment, version, user, count).subscribe((res) => {

      if (this.lineChartData)
        this.lineChartData.length = 0;

      this.details = res;
      const arrayColumn = (arr, n) => arr.map(x => x[n]);

      for (let i = 1; i <= 3; i++) {
        this.lineChartData.push({ data: this.details.slice(1).map(x => x[i]), label: this.details[ACTIVATION_LABEL_INDEX][i] });
      }

      this.lineChartLabels = arrayColumn(this.details.slice(1), 0);

      for (let i = 0; i < this.lineChartLabels.length; i++) {
        this.lineChartLabels[i] =  DateUtils.getGMTDateTransformToLocalTime(this.lineChartLabels[i]).toLocaleString();
      }

      this.lineTableActivationUsers = arrayColumn(this.details.slice(1), ACTIVATION_USER_INDEX);
    });
  }

  public chartClicked(clickedChartColumn: any, table: any): void {
    try {
      let index = clickedChartColumn.active[0]._index

      this.coloredColumnIndex = index
      let tableColumn = table.rows[0].cells[index];

      tableColumn.scrollIntoView();

    }
    catch (err) {
      console.log(err);
    }
  }

  getColor(index, label) {
    if (index == this.coloredColumnIndex) {
      switch (label) {
        case 'Passed':
          return chartColors.passedColorTransparent;
        case 'Failed':
          return chartColors.failedColorTransaprent;
        case 'Errors':
          return chartColors.errorColorTransparent;
      }
    }
  }

  openActivationDetails(index: any) {
    this.router.navigate(['/activations', this.details[index][ACTIVATION_ID_INDEX]]);
  }

}
