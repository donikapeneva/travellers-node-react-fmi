"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryController = void 0;
const authorization_service_1 = require("../services/authorization-service");
const country_service_1 = require("../services/country-service");
class CountryController {
    constructor(db) {
        this.countryService = new country_service_1.CountryService(db);
        this.authorizationService = new authorization_service_1.AuthorizationService(db);
    }
    getCountriesAndCitites(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const countries = yield this.countryService.getCountriesAndCities();
                response.status(200).json({ countries });
            }
            catch (_a) {
                response.status(500);
            }
        });
    }
}
exports.CountryController = CountryController;
//# sourceMappingURL=coutry-controller.js.map