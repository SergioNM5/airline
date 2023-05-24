import { CurrencyService } from './currency.service';

describe('CurrencyService', () => {
  let service: CurrencyService;

  beforeEach(() => {
    service = new CurrencyService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert currency correctly from USD to EUR', () => {
    const amount = 100;
    const fromCurrency = 'USD';
    const toCurrency = 'EUR';
    const expectedAmount = 93; // 100 * 0.93

    const convertedAmount = service.convertCurrency(amount, fromCurrency, toCurrency);

    expect(convertedAmount).toEqual(expectedAmount);
  });

  it('should convert currency correctly from USD to COP', () => {
    const amount = 100;
    const fromCurrency = 'USD';
    const toCurrency = 'COP';
    const expectedAmount = 445721;

    const convertedAmount = service.convertCurrency(amount, fromCurrency, toCurrency);

    expect(convertedAmount).toEqual(expectedAmount);
  });

});
