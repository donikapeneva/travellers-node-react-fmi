import Axios from 'axios';
import { BACKEND_URL } from '../config';
import { ICity } from '../data/i-city';

class CityService implements ICityService {
  public async getAll(): Promise<ICity[]> {
    const citiesResponse = await Axios.get(`${BACKEND_URL}/cities`);

    return citiesResponse.data;
  }
}

export interface ICityService {
  getAll(): Promise<ICity[]>;
}

export const cityService = new CityService();
