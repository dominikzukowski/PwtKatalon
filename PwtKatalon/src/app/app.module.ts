import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsComponent } from './charts/charts/charts.component';
import { ActivationsModule } from './activations/activations.module';

@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChartsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {path: 'charts', component:ChartsComponent},
      {path: '', redirectTo: 'activations', pathMatch: 'full'},
      {path: '**', redirectTo: 'activations', pathMatch: 'full'}
    ], {onSameUrlNavigation: 'reload'}),
    ActivationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }


