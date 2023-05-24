import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteFormComponent } from './route-form.component';
import {Flight} from "../../models/airline.model";
import {FlightService} from "../../services/flight.service";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {of} from "rxjs";

const flights: Flight[] = [
  {
    "departureStation":"MZL",
    "arrivalStation":"MDE",
    "flightCarrier":"CO",
    "flightNumber":"8001",
    "price":200
  },
  {
    "departureStation":"MZL",
    "arrivalStation":"CTG",
    "flightCarrier":"CO",
    "flightNumber":"8002",
    "price":200
  },
  {
    "departureStation":"PEI",
    "arrivalStation":"BOG",
    "flightCarrier":"CO",
    "flightNumber":"8003",
    "price":200
  },
  {
    "departureStation":"MDE",
    "arrivalStation":"BCN",
    "flightCarrier":"CO",
    "flightNumber":"8004",
    "price":500
  },
  {
    "departureStation":"CTG",
    "arrivalStation":"CAN",
    "flightCarrier":"CO",
    "flightNumber":"8005",
    "price":300
  },
  {
    "departureStation":"BOG",
    "arrivalStation":"MAD",
    "flightCarrier":"CO",
    "flightNumber":"8006",
    "price":500
  },
  {
    "departureStation":"BOG",
    "arrivalStation":"MEX",
    "flightCarrier":"CO",
    "flightNumber":"8007",
    "price":300
  },
  {
    "departureStation":"MZL",
    "arrivalStation":"PEI",
    "flightCarrier":"CO",
    "flightNumber":"8008",
    "price":200
  },
  {
    "departureStation":"MDE",
    "arrivalStation":"CTG",
    "flightCarrier":"CO",
    "flightNumber":"8009",
    "price":200
  },
  {
    "departureStation":"BOG",
    "arrivalStation":"CTG",
    "flightCarrier":"CO",
    "flightNumber":"8010",
    "price":200
  },
  {
    "departureStation":"MDE",
    "arrivalStation":"MZL",
    "flightCarrier":"CO",
    "flightNumber":"9001",
    "price":200
  },
  {
    "departureStation":"CTG",
    "arrivalStation":"MZL",
    "flightCarrier":"CO",
    "flightNumber":"9002",
    "price":200
  },
  {
    "departureStation":"BOG",
    "arrivalStation":"PEI",
    "flightCarrier":"CO",
    "flightNumber":"9003",
    "price":200
  },
  {
    "departureStation":"BCN",
    "arrivalStation":"MDE",
    "flightCarrier":"ES",
    "flightNumber":"9004",
    "price":500
  },
  {
    "departureStation":"CAN",
    "arrivalStation":"CTG",
    "flightCarrier":"MX",
    "flightNumber":"9005",
    "price":300
  },
  {
    "departureStation":"MAD",
    "arrivalStation":"BOG",
    "flightCarrier":"ES",
    "flightNumber":"9006",
    "price":500
  },
  {
    "departureStation":"MEX",
    "arrivalStation":"BOG",
    "flightCarrier":"MX",
    "flightNumber":"9007",
    "price":300
  },
  {
    "departureStation":"PEI",
    "arrivalStation":"MZL",
    "flightCarrier":"CO",
    "flightNumber":"9008",
    "price":200
  },
  {
    "departureStation":"CTG",
    "arrivalStation":"MDE",
    "flightCarrier":"CO",
    "flightNumber":"9009",
    "price":200
  },
  {
    "departureStation":"CTG",
    "arrivalStation":"BOG",
    "flightCarrier":"CO",
    "flightNumber":"9010",
    "price":200
  }
]


describe('RouteFormComponent', () => {
  let component: RouteFormComponent;
  let fixture: ComponentFixture<RouteFormComponent>;
  let flightService: FlightService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RouteFormComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [FormBuilder, FlightService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteFormComponent);
    component = fixture.componentInstance;
    flightService = TestBed.inject(FlightService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.routeForm.valid).toBeFalsy();
    expect(component.routeForm.value.origin.valid).toBeFalsy();
    expect(component.routeForm.value.destination.valid).toBeFalsy();
    expect(component.routeForm.value.selectCurrency).toBe('USD');
    expect(component.routeForm.value.selectStopovers).toBe(0);
  });

  it('should update flights and find routes on form submission', () => {
    spyOn(flightService, 'getFlights').and.returnValue(of(flights));
    spyOn(flightService, 'updateFlightPrices').and.returnValue(flights);
    spyOn(component, 'findRoutes');

    // Set form values
    component.routeForm.controls['origin'].setValue('MZL');
    component.routeForm.controls['destination'].setValue('CTG');

    // Submit the form
    component.onSubmit();

    expect(flightService.getFlights).toHaveBeenCalled();
    expect(flightService.updateFlightPrices).toHaveBeenCalledWith(flights, 'USD');
    expect(component.findRoutes).toHaveBeenCalled();
    expect(component.formSubmitted).toBe(true);
  });

  it('should update routes on stopovers change', () => {
    spyOn(component, 'findRoutes');

    // Set form value
    component.routeForm.controls['selectStopovers'].setValue(1);

    // Trigger stopovers change
    component.onStopoversChange();

    expect(component.selectedStopover).toBe(1);
    expect(component.routes).toEqual([]);
    expect(component.returnRoutes).toEqual([]);
    expect(component.findRoutes).toHaveBeenCalled();
  });
});
