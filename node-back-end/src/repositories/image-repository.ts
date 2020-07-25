import {BaseRepository} from '../shared/base-repository';
import {IImage} from '../models/image';

export class ImageRepository extends BaseRepository<IImage> {
    public async findByImageId(imageId: string): Promise<IImage | null> {
        return this.findOneById(imageId);
    }

    public async findAllByTripId(tripId: string): Promise<IImage[]> {
        const query = {tripId: tripId};

        return this.collection.find(query).toArray();
    }


}
