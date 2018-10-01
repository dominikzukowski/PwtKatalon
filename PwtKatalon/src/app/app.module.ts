import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { ActivationsListComponent } from './activations/activations-list/activations-list.component';
import { ActivationDetailsComponent } from './activations/activation-details/activation-details.component';
import { SchedulerListComponent } from './scheduler/scheduler-list/scheduler-list.component';
import { SchedulerDetailsComponent } from './scheduler/scheduler-details/scheduler-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsComponent } from './charts/charts/charts.component';

@NgModule({
  declarations: [
    AppComponent,
    ActivationsListComponent,
    ActivationDetailsComponent,
    SchedulerListComponent,
    SchedulerDetailsComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {path: 'activations', component: ActivationsListComponent},
      {path: 'activation/:id', component: ActivationDetailsComponent},
      {path: 'scheduler', component:SchedulerListComponent},
      {path: 'scheduler/:id', component:SchedulerDetailsComponent},
      {path: 'charts', component:ChartsComponent},
      {path: '', redirectTo: 'activations', pathMatch: 'full'},
      {path: '**', redirectTo: 'activations', pathMatch: 'full'}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
