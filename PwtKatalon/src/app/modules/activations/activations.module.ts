import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivationsListComponent } from './activations-list/activations-list.component';
import { ActivationDetailsComponent } from './activation-details/activation-details.component';
import { ActivationDetailsErrorLogComponent } from './activation-details/activation-details-errorlog.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SecondsToDatePipe } from '../../shared/pipes/secondsToDate.pipe';
import { PagerService } from '../../shared/pagination';
import { ChartsModule } from 'ng2-charts';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    RouterModule.forChild([
      {path: 'activations', 
      component: ActivationsListComponent, 
      runGuardsAndResolvers: 'always'},
      {path: 'activations/:id', component: ActivationDetailsComponent},
      {path: 'activations/:id/errorlog', component: ActivationDetailsErrorLogComponent, pathMatch: 'full'}
      ])
  ],
  declarations: [
    ActivationsListComponent,
    ActivationDetailsComponent,
    ActivationDetailsErrorLogComponent,
    SecondsToDatePipe
  ],
  providers: [PagerService]
})
export class ActivationsModule { }
