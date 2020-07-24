"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryService = void 0;
const coutry_repository_1 = require("../repositories/coutry-repository");
class CountryService {
    constructor(db) {
        this.countryRepository = new coutry_repository_1.CountryRepository(db, 'countries_and_cities');
    }
    getCountriesAndCities() {
        return this.countryRepository.getAll();
    }
}
exports.CountryService = CountryService;
//# sourceMappingURL=country-service.js.map