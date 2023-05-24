import {Component, Input, OnInit} from '@angular/core';
import {Flight} from "../../models/airline.model";

@Component({
  selector: 'app-flight-routes',
  templateUrl: './flight-routes.component.html',
  styleUrls: ['./flight-routes.component.scss']
})
export class FlightRoutesComponent  {
  @Input() routes!: string[][];
  @Input() selectedCurrency!: string;
  @Input() flights!: Flight[];
  @Input() title!: string

  getFlightByStations(departureStation: string, arrivalStation: string): Flight | undefined {
    return this.flights.find(flight => flight.departureStation === departureStation && flight.arrivalStation === arrivalStation);
  }
}
