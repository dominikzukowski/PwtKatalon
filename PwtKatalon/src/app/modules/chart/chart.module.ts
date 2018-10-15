import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'charts', component:ChartComponent},
    ])
  ],
  declarations: [
    ChartComponent
  ]
})
export class ChartModule { }
