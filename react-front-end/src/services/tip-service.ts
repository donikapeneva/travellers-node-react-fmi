import Axios from 'axios';
import { BACKEND_URL } from '../config';
import { ITip } from '../data/i-tip';

export class TipService implements ITipService {
  public async getTip(tipId: string): Promise<ITip> {
    const tripResponse = await Axios.get(`${BACKEND_URL}/tip/${tipId}`);

    return tripResponse.data;
  }

  public async getTips(tripId: string): Promise<ITip[]> {
    const tipsResponse = await Axios.get(`${BACKEND_URL}/trips/${tripId}`);

    return tipsResponse.data;
  }

  public async updateTip(tipId: string, tip: Partial<ITip>): Promise<void> {
    await Axios.put(`${BACKEND_URL}/tip/${tipId}`, { tip });
  }

  public async deleteTip(tipId: string): Promise<void> {
    await Axios.delete(`${BACKEND_URL}/tip/${tipId}`);
  }
}

export interface ITipService {
  getTip(tripId: string): Promise<ITip>;
  getTips(tripId: string): Promise<ITip[]>;
  updateTip(tipId: string, trip: Partial<ITip>): Promise<void>;
  deleteTip(tipId: string): Promise<void>;
}
