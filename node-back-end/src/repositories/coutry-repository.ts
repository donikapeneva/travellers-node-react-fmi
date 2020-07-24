import {ICountry} from '../models/coutry';
import {BaseRepository} from '../shared/base-repository';

export class CountryRepository extends BaseRepository<ICountry> {
    public async hasRecords(): Promise<Boolean | null> {

        const record = await this.collection.countDocuments();

        if (record > 0) {
            return true;
        }

        return false;
    }
}
