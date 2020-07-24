import { IUser } from '../data/i-user';
import { ICity } from '../data/i-city';

export interface ITrip {
  _id: string;
  name: string;
  userId: string;
  city: string;
  countryName: string;
  time: string;
  tip: string;
  lastUpdated: string;
  isDeleted: boolean;

}
