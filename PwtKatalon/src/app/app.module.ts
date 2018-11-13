import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivationsModule } from './modules/activations/activations.module';
import { ChartModule } from './modules/chart/chart.module';
import { UsersModule } from './modules/users/users.module';
import { ApiService } from './services/api.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {path: '', redirectTo: 'activations', pathMatch: 'full'},
      {path: '**', redirectTo: 'activations', pathMatch: 'full'},
      {
        path: "charts",
        loadChildren: "../app/modules/chart/chart.module#ChartModule"
      },
    ], {onSameUrlNavigation: 'reload'}),
    ActivationsModule,
    ChartModule,
    UsersModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule { }


