import {Request, Response} from 'express';
import {Db} from 'mongodb';
import {AuthorizationService, IAuthorizationService,} from '../services/authorization-service';
import {CountryService, ICountryService} from '../services/country-service';

export class CountryController implements ICountryController {
    // TODO use DI
    private readonly countryService: ICountryService;
    private readonly authorizationService: IAuthorizationService;

    public constructor(db: Db) {
        this.countryService = new CountryService(db);
        this.authorizationService = new AuthorizationService(db);
    }

    public async getCountriesAndCitites(
        request: Request,
        response: Response
    ): Promise<void> {
        try {
            const countries = await this.countryService.getCountriesAndCities();

            response.status(200).json({countries});
        } catch {
            response.status(500);
        }
    }
}

export interface ICountryController {
    getCountriesAndCitites(request: Request, response: Response): void;
}
