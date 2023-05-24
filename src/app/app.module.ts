import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouteFormComponent } from './components/route-form/route-form.component';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import {UpperCaseInputDirective} from "./utils/to-uppercase.directive";
import { FlightRoutesComponent } from './components/flight-routes/flight-routes.component';

@NgModule({
  declarations: [
    AppComponent,
    RouteFormComponent,
    UpperCaseInputDirective,
    FlightRoutesComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
