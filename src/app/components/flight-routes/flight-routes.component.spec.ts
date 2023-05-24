import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightRoutesComponent } from './flight-routes.component';

describe('FlightRoutesComponent', () => {
  let component: FlightRoutesComponent;
  let fixture: ComponentFixture<FlightRoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightRoutesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightRoutesComponent);
    component = fixture.componentInstance;
    component.routes = [['MZL', 'MDE', 'CTG'], ['MZL', 'CTG'] ,['MZL', 'PEI', 'BOG', 'CTG']]
    component.flights = [
      {
        departureStation: 'MZL',
        arrivalStation: 'MDE',
        flightCarrier: 'CO',
        flightNumber: '8001',
        price: 200,
      },
      {
        departureStation: 'MZL',
        arrivalStation: 'CTG',
        flightCarrier: 'CO',
        flightNumber: '8002',
        price: 300,
      },
    ];
    component.selectedCurrency = 'USD';
    component.title = 'Test'
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the routes correctly', () => {
    component.routes = [['MZL', 'MDE'], ['MZL', 'CTG']];
    fixture.detectChanges();

    const routeElements = fixture.nativeElement.querySelectorAll('.route-option');
    expect(routeElements.length).toBe(2);

    const priceElements = fixture.nativeElement.querySelectorAll('.price');
    expect(priceElements.length).toBe(2);

    expect(priceElements[0].textContent).toContain('Price: $200');
    expect(priceElements[1].textContent).toContain('Price: $300');
  });

  it('should return undefined if flight is not found', () => {
    component.flights = [
      {
        departureStation: 'MZL',
        arrivalStation: 'MDE',
        flightCarrier: 'CO',
        flightNumber: '8001',
        price: 200,
      },
      {
        departureStation: 'MZL',
        arrivalStation: 'CTG',
        flightCarrier: 'CO',
        flightNumber: '8002',
        price: 300,
      },
    ];

    const flight = component.getFlightByStations('MDE', 'BOG');
    expect(flight).toBeUndefined();
  });

  it('should return the correct flight', () => {
    component.flights = [
      {
        departureStation: 'MZL',
        arrivalStation: 'MDE',
        flightCarrier: 'CO',
        flightNumber: '8001',
        price: 200,
      },
      {
        departureStation: 'MZL',
        arrivalStation: 'CTG',
        flightCarrier: 'CO',
        flightNumber: '8002',
        price: 300,
      },
    ];

    const flight = component.getFlightByStations('MZL', 'CTG');
    expect(flight).toEqual({
      departureStation: 'MZL',
      arrivalStation: 'CTG',
      flightCarrier: 'CO',
      flightNumber: '8002',
      price: 300,
    });
  });
});
