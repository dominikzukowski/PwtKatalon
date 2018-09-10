import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { ActivationsListComponent } from './activations/activations-list/activations-list.component';
import { ActivationDetailsComponent } from './activations/activation-details/activation-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ActivationsListComponent,
    ActivationDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartsModule,
    RouterModule.forRoot([
      {path: 'activations', component: ActivationsListComponent},
      {path: 'activation/:id', component: ActivationDetailsComponent},
      {path: '', redirectTo: 'activations', pathMatch: 'full'},
      {path: '**', redirectTo: 'activations', pathMatch: 'full'}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
