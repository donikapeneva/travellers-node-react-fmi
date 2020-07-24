import { ICountry } from './i-country';

export interface ICity {
  id: number;
  name: string;
  countryId: number;
  country: ICountry;
}
