import {Db} from 'mongodb';
import {TripRepository} from '../repositories/trip-repository';
import {ITip} from '../models/tip';

export class TipService implements ITipService {
    private readonly tripRepository: TripRepository;

    public constructor(db: Db) {
        this.tripRepository = new TripRepository(db, 'trips');
    }

    public async getTips(tripId: string): Promise<ITip[]> {
        const trip = await this.tripRepository.getById(tripId);

        return trip.tips;
    }

    public async createTip(tripId: string, tip: ITip): Promise<string> {
        const tipId: string = await this.tripRepository.addTipToTrip(tripId, tip);

        return tipId;
    }

    public async deleteTip(tipId: string, tripId: string): Promise<boolean> {
        const isDeleted = await this.tripRepository.deleteTip(tipId, tripId);

        return isDeleted;
    }

    public async updateTip(
        tripId: string,
        tipId: string,
        tipUpdates: ITip,
        userId: string
    ): Promise<boolean> {
        const trip = await this.tripRepository.getById(tripId);

        trip.lastUpdated = Date.now().toString();
        trip.userId = userId;

        let tipToBeUpdated = trip.tips.find((tip) => tip.id === tipId);
        tipToBeUpdated = tipUpdates;

        const isUpdated: boolean = await this.tripRepository.update(tripId, trip);

        return isUpdated;
    }
}

export interface ITipService {
    getTips(tripId: string): Promise<ITip[]>;

    createTip(tripId: string, tip: Partial<ITip>): Promise<string>;

    deleteTip(tipId: string, tripId: string): Promise<boolean>;

    updateTip(
        tripId: string,
        tipId: string,
        tipUpdates: ITip,
        userId: string
    ): Promise<boolean>;
}
