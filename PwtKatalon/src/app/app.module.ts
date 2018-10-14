import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivationsModule } from './activations/activations.module';
import { ChartModule } from './chart/chart.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {path: '', redirectTo: 'activations', pathMatch: 'full'},
      {path: '**', redirectTo: 'activations', pathMatch: 'full'}
    ], {onSameUrlNavigation: 'reload'}),
    ActivationsModule,
    ChartModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }


