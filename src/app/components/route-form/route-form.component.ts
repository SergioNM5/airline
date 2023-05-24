import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FlightService} from "../../services/flight.service";
import {Flight} from "../../models/airline.model";
import {Stopover} from "../../models/stopover.model";

@Component({
  selector: 'app-route-form',
  templateUrl: './route-form.component.html',
  styleUrls: ['./route-form.component.scss']
})
export class RouteFormComponent implements OnInit {
  routeForm!: FormGroup;
  flights: Flight[] = [];
  routes: string[][] = [];
  returnRoutes: string[][] = []
  currencies: string[] = ['USD', 'EUR', 'COP'];
  stopovers: Stopover[] = [{quantity: 0, label: 'any'}, {quantity: 1, label: '1 or less'}, {quantity: 2, label: '2 or less'}]
  selectedCurrency: string = 'USD';
  selectedStopover : number = 0
  formSubmitted = false;
  hasRoutes = false

  constructor(private formBuilder: FormBuilder, private flightService: FlightService) {}

  ngOnInit(): void {
    this.routeForm = this.formBuilder.group({
      origin: ['', [Validators.required, Validators.minLength(3)]],
      destination: ['', [Validators.required, Validators.minLength(3)]],
      selectCurrency: [this.selectedCurrency],
      selectStopovers: [this.selectedStopover]
    }, { validator: this.checkOriginDestination });
  }

  onSubmit(): void {

    this.routes = []
    this.returnRoutes = []

    if (this.routeForm.invalid) {
      return;
    }

    this.flightService.getFlights().subscribe((flights: Flight[]) => {
      this.flights = this.flightService.updateFlightPrices(flights, this.selectedCurrency);
      this.findRoutes()
      this.formSubmitted = true
    });
  }

  findRoutes() {
    const origin = this.routeForm.value.origin;
    const destination = this.routeForm.value.destination;
    const selectedCurrency = this.routeForm.value.selectCurrency;

    this.routes = this.flightService.buildRoute(this.flights, origin, destination, selectedCurrency, this.selectedStopover);
    if (this.routes.length > 0) {
      this.hasRoutes = true
    } else {
      this.hasRoutes = false
      return;
    }
    this.returnRoutes = this.flightService.buildRoute(this.flights, destination, origin, selectedCurrency, this.selectedStopover);
  }

  onCurrencyChange() {
    this.selectedCurrency = this.routeForm.value.selectCurrency
    this.routes = []
    this.returnRoutes = []
    this.onSubmit()
  }

  onStopoversChange() {
    this.selectedStopover = this.routeForm.value.selectStopovers
    this.routes = []
    this.returnRoutes = []
    this.findRoutes()
  }

  checkOriginDestination(group: FormGroup) {
    const origin = group.value.origin;
    const destination = group.value.destination;

    if(origin.trim() && destination.trim()) {
      return origin !== destination ? null : { sameOriginDestination: true };
    }
    return null
  }
}
