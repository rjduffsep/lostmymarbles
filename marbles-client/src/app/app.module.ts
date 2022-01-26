import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DateComponent } from './widgets/date/date.component';
import { CpuUsageComponent } from './widgets/cpu-usage/cpu-usage.component';
import { CpuHotComponent } from './widgets/cpu-hot/cpu-hot.component';

@NgModule({
  declarations: [
    AppComponent,
    DateComponent,
    CpuUsageComponent,
    CpuHotComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
