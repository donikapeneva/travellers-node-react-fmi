import {BaseRepository} from '../shared/base-repository';
import {ITrip} from '../models/trip';
import {ITip} from '../models/tip';
import {ObjectId} from 'mongodb';

export class TripRepository extends BaseRepository<ITrip> {
    public async getById(tripId: string): Promise<ITrip | null> {
        const trip = await this.findOneById(tripId);

        return trip;
    }

    public async createTrip(trip: ITrip): Promise<string> {
        // for (const tip of trip.tips) {
        //   tip.id = new ObjectId().toHexString();
        //   console.log(tip.id);
        // }

        console.log(trip);
        const tripId = await this.create(trip);
        console.log(tripId);
        return tripId;
    }

    public async addTipToTrip(tripId: string, tip: ITip): Promise<string> {
        tip.id = new ObjectId().toHexString();

        await this.collection.updateOne(
            {_id: new ObjectId(tripId)},
            {$push: {tips: tip}}
        );

        return tip.id;
    }

    public async deleteTip(tipId: string, tripId: string): Promise<boolean> {
        const result = await this.collection.findOneAndUpdate(
            {_id: new ObjectId(tripId)},
            {$pull: {tips: {id: tipId}}}
        );

        return !!result.ok;
    }

    public async update(id: string, item: Partial<ITrip>): Promise<boolean> {

        const trip = await this.findOneById(id);

        const result = await this.collection.updateOne(
            {_id: new ObjectId(id)},

            {$set: {name: item.name, city: item.city, country: item.country,
                    time: item.time, tips : item.tips, lastUpdated: item.lastUpdated, isDeleted: item.isDeleted}}
        );

        return !!result.result.ok && result.result.n > 0;

    }
}
