import {ICity} from "./i-city";

export interface ICountry {
  id: number;
  name: string;
  countryCode: string;
  cities: ICity[];
}
