import {Db} from 'mongodb';
import {ITrip} from '../models/trip';
import {TripRepository} from '../repositories/trip-repository';

export class TripService implements ITripService {
    private readonly tripRepository: TripRepository;

    public constructor(db: Db) {
        this.tripRepository = new TripRepository(db, 'trips');
    }

    public async getTripInfo(tripId: string): Promise<ITrip | null> {
        const trip = await this.tripRepository.getById(tripId);

        return trip;
    }

    public async getTrips(): Promise<ITrip[]> {
        const trips = await this.tripRepository.getAll();

        return trips;
    }

    public async createTrip(trip: ITrip, userId: string): Promise<string> {

        const newTrip = {...trip};

        newTrip.userId = userId;
        newTrip.isDeleted = false;
        newTrip.lastUpdated = Date.now().toString();

        const tripId: string = await this.tripRepository.createTrip(newTrip);

        return tripId;
    }

    public async deleteTrip(tripId: string): Promise<boolean> {
        const isDeleted = await this.tripRepository.delete(tripId);

        return isDeleted;
    }

    public async updateTrip(
        tripId: string,
        tripUpdates: Partial<ITrip>
    ): Promise<boolean> {
        tripUpdates.lastUpdated = Date.now().toString();
        tripUpdates.userId = Date.now().toString();

        const isUpdated: boolean = await this.tripRepository.update(
            tripId,
            tripUpdates
        );

        return isUpdated;
    }
}

export interface ITripService {
    getTripInfo(tripId: string): Promise<ITrip | null>;

    getTrips(): Promise<ITrip[]>;

    createTrip(trip: ITrip, userId: string): Promise<string>;

    deleteTrip(tripId: string): Promise<boolean>;

    updateTrip(tripId: string, tripUpdates: Partial<ITrip>): Promise<boolean>;
}
