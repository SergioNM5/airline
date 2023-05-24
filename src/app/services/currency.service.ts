import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  //conversion rate with values as of 06/24/2023
  private conversionRates: { [key: string]: number } = {
    USD: 1,
    EUR: 0.93,
    COP: 4457.21
  };
  convertCurrency(amount: number, fromCurrency: string, toCurrency: string): number {
    const conversionRate = this.conversionRates[toCurrency] / this.conversionRates[fromCurrency];
    return amount * conversionRate;
  }
}
