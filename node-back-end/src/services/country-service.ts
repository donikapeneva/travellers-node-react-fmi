import {Db} from 'mongodb';
import {ICountry} from '../models/coutry';
import {CountryRepository} from '../repositories/coutry-repository';

export class CountryService implements ICountryService {
    // TODO Use DI
    private readonly countryRepository: CountryRepository;

    public constructor(db: Db) {
        this.countryRepository = new CountryRepository(db, 'countries_and_cities');
    }

    public getCountriesAndCities(): Promise<ICountry[]> {
        return this.countryRepository.getAll();
    }
}

export interface ICountryService {
    getCountriesAndCities(): Promise<ICountry[]>;
}
