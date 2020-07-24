import { IUser } from '../data/i-user';
import { ICity } from '../data/i-city';

export interface ITrip {
  id: string;
  name: string;
  userId: number;
  cityId: number;
  time: string;
  tip: string;
  lastUpdated: string;
  isDeleted: boolean;
  user: IUser;
  city: string;


}
