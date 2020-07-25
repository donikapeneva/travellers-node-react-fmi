import { IUser } from '../data/i-user';
import { ICity } from '../data/i-city';
import {ICountry} from "./i-country";

export interface ITrip {
  _id: string;
  name: string;
  userId: string;
  city: string;
  countryName: string;
  country: ICountry;
  time: string;
  tip: string;
  lastUpdated: string;
  isDeleted: boolean;

}
