import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FlightService } from './flight.service';
import { CurrencyService } from './currency.service';
import { Flight } from '../models/airline.model';

describe('FlightService', () => {
  let service: FlightService;
  let currencyService: CurrencyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FlightService, CurrencyService],
    });

    service = TestBed.inject(FlightService);
    currencyService = TestBed.inject(CurrencyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getFlights', () => {
    it('should return flights', () => {
      const mockFlights: Flight[] = [
        {
          departureStation: 'MZL',
          arrivalStation: 'MDE',
          flightCarrier: 'CO',
          flightNumber: '8001',
          price: 200,
        },
        // Add more mock flights as needed
      ];

      service.getFlights().subscribe((flights: Flight[]) => {
        expect(flights).toEqual(mockFlights);
      });

      const apiUrl = (service as any)['apiUrl'];
      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockFlights);
    });
  });

  describe('buildRoute', () => {
    it('should build routes correctly', () => {
      const mockFlights: Flight[] = [
        {
          departureStation: 'MZL',
          arrivalStation: 'MDE',
          flightCarrier: 'CO',
          flightNumber: '8001',
          price: 200,
        },
        // Add more mock flights as needed
      ];

      const origin = 'MZL';
      const destination = 'MDE';
      const selectedCurrency = 'USD';
      const stopoverLimit = 1;

      spyOn(service, 'findRoutes').and.returnValue([['MZL', 'MDE']]);

      const routes = service.buildRoute(mockFlights, origin, destination, selectedCurrency, stopoverLimit);

      expect(service.findRoutes).toHaveBeenCalledWith(mockFlights, origin, destination, []);
      expect(routes).toEqual([['MZL', 'MDE']]);
    });
  });

  describe('findRoutes', () => {
    it('should find routes correctly', () => {
      const mockFlights: Flight[] = [
        {
          departureStation: 'MZL',
          arrivalStation: 'MDE',
          flightCarrier: 'CO',
          flightNumber: '8001',
          price: 200,
        },
        // Add more mock flights as needed
      ];

      const origin = 'MZL';
      const destination = 'MDE';
      const visited: string[] = [];

      const routes = service.findRoutes(mockFlights, origin, destination, visited);

      expect(routes).toEqual([['MZL', 'MDE']]);
    });
  });

  describe('filteredRoutes', () => {
    it('should filter routes correctly based on stopover limit', () => {
      const routes: string[][] = [['MZL', 'MDE'], ['MZL', 'CTG', 'MDE', 'BOG']];
      const stopoverLimit = 1;

      const filteredRoutes = service.filteredRoutes(routes, stopoverLimit);

      expect(filteredRoutes).toEqual([['MZL', 'MDE']]);
    });
  });

  describe('updateFlightPrices', () => {
    it('should update flight prices correctly', () => {
      const mockFlights: Flight[] = [
        {
          departureStation: 'MZL',
          arrivalStation: 'MDE',
          flightCarrier: 'CO',
          flightNumber: '8001',
          price: 200,
        },
        // Add more mock flights as needed
      ];

      const selectedCurrency = 'EUR';

      spyOn(currencyService, 'convertCurrency').and.returnValue(186);

      const updatedFlights = service.updateFlightPrices(mockFlights, selectedCurrency);

      expect(currencyService.convertCurrency).toHaveBeenCalledWith(200, 'USD', 'EUR');
      expect(updatedFlights).toEqual([
        {
          departureStation: 'MZL',
          arrivalStation: 'MDE',
          flightCarrier: 'CO',
          flightNumber: '8001',
          price: 186,
        },
      ]);
    });
  });
});
