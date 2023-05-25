import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight } from "../models/airline.model";
import {CurrencyService} from "./currency.service";

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private apiUrl = 'https://recruiting-api.newshore.es/api/flights/2';

  constructor(private http: HttpClient, private currencyService: CurrencyService) {}

  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.apiUrl);
  }

  buildRoute(flights: Flight[], origin: string, destination: string, selectedCurrency: string, stopoverLimit: number): string[][] {
    const routes = this.findRoutes(flights, origin, destination);
    return routes.length > 0 ? this.filteredRoutes(routes, stopoverLimit) : [];
  }

  findRoutes(flights: Flight[], origin: string, destination: string): string[][] {
    const stack: { station: string; visited: string[] }[] = [];
    const routes: string[][] = [];

    stack.push({ station: origin, visited: [origin] });

    while (stack.length > 0) {
      const current = stack.pop()!;
      const currentStation = current.station;
      const visited = current.visited;

      if (currentStation === destination) {
        routes.push(visited);
        continue;
      }

      const nextFlights = flights.filter(
        flight =>
          flight.departureStation === currentStation &&
          !visited.includes(flight.arrivalStation)
      );

      for (const flight of nextFlights) {
        const newVisited = [...visited, flight.arrivalStation];
        stack.push({ station: flight.arrivalStation, visited: newVisited });
      }
    }

    return routes;
  }

  filteredRoutes(routes: string[][], stopoverLimit: number):string[][] {
    if (+stopoverLimit === 1) {
      return routes.filter(route => route.length <= 3)
    } else if (+stopoverLimit === 2) {
      return routes.filter(route => route.length <= 4)
    }
    return routes;
  }

  updateFlightPrices(flights: Flight[], selectedCurrency: string): Flight[] {
    return flights.map(flight => {
      flight.price = this.currencyService.convertCurrency(flight.price, 'USD', selectedCurrency);
      return flight;
    });
  }
}
