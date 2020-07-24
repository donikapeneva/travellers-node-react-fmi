import Axios from 'axios';
import { ITrip } from '../data/i-trip';
import { BACKEND_URL } from '../config';
import {debuglog} from "util";

class TripService implements ITripService {
  public async getTrip(tripId: string): Promise<ITrip> {
      const tripResponse = await Axios.get(`${BACKEND_URL}/trips/${tripId}`);

      return tripResponse.data.trip;


  }

  public async getTrips(): Promise<ITrip[]> {
     const tripsResponse = await Axios.get(`${BACKEND_URL}/trips`);

     return tripsResponse.data.trips;

  }

  public async createTrip(trip: Partial<ITrip>): Promise<string> {
    console.log(">>> ");
    console.log(trip);
    let result;
    try {
      result = await Axios.post(`${BACKEND_URL}/trips`, trip);

    }catch (e) {
      console.log(e);
    }
    console.log("RESULT : " + result.data);

    return result.data.tripId;
  }

  public async updateTrip(tripId: string, trip: Partial<ITrip>): Promise<void> {
    await Axios.put(`${BACKEND_URL}/trips/${tripId}`,  trip );
  }

  public async deleteTrip(tripId: string): Promise<void> {
    await Axios.delete(`${BACKEND_URL}/trips/${tripId}`);
  }
}

export interface ITripService {
  getTrip(tripId: string): Promise<ITrip>;
  getTrips(): Promise<ITrip[]>;
  createTrip(trip: Partial<ITrip>): Promise<string>;
  updateTrip(tripId: string, trip: Partial<ITrip>): Promise<void>;
  deleteTrip(tripId: string): Promise<void>;
}

export const tripService = new TripService();
