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
exports.Server = void 0;
const user_controller_1 = require("./controllers/user-controller");
const authentication_controller_1 = require("./controllers/authentication-controller");
const authentication_middleware_1 = require("./shared/authentication-middleware");
const trip_controller_1 = require("./controllers/trip-controller");
const refresh_token_manager_1 = require("./shared/refresh-token-manager");
const tip_controller_1 = require("./controllers/tip-controller");
const image_controller_1 = require("./controllers/image-controller");
const countries_and_cities_1 = require("./shared-data/countries-and-cities");
const coutry_repository_1 = require("./repositories/coutry-repository");
const coutry_controller_1 = require("./controllers/coutry-controller");
class Server {
    constructor(app) {
        this.DATABASE_NAME = 'travellers';
        this.refreshTokenManager = new refresh_token_manager_1.RefreshTokenManager();
        this.app = app;
        this.registerApi();
    }
    start(port) {
        this.app.listen(port, () => 
        // tslint:disable-next-line: no-console
        console.log(`Server listening on port ${port}!`));
        this.connectToDabatase().then((db) => {
            this.database = db;
            this.initializeScripts().then(() => {
                this.initializeControllers();
            });
        });
    }
    connectToDabatase() {
        return __awaiter(this, void 0, void 0, function* () {
            // const connection = await MongoClient.connect('mongodb://localhost');
            // const db = connection.db(this.DATABASE_NAME);
            const MongoClient = require('mongodb').MongoClient;
            const uri = "mongodb+srv://travellers_admin:nYHkRo6Jb63YCVEG@cluster0.cjd3t.mongodb.net/travellers_admin?retryWrites=true&w=majority";
            const client = new MongoClient(uri, { useNewUrlParser: true });
            try {
                yield client.connect();
                console.log(client.db(this.DATABASE_NAME));
                return client.db(this.DATABASE_NAME);
                // await listDatabases(client);
            }
            catch (e) {
                console.error(e);
                return e;
            }
            finally {
                // await client.close();
            }
        });
    }
    registerApi() {
        this.app.get('/api', (req, res) => {
            res.send('You have reached the API!');
        });
        this.app.get('/', (req, res) => {
            res.sendFile('index.html', { root: __dirname });
        });
        this.registerAuthenticationApis();
        this.registerUserApis();
        this.registerTripApis();
        this.registerTipApis();
        this.registerImageApis();
        this.registerCountryApis();
    }
    registerAuthenticationApis() {
        this.app.post('/register', (req, res) => this.authenticationController.register(req, res));
        this.app.post('/login', (req, res) => this.authenticationController.login(req, res));
        this.app.post('/logout', authentication_middleware_1.AuthenticationMiddleware.verifyToken, (req, res) => this.authenticationController.logout(req, res));
        this.app.post('/token', (req, res) => {
            this.authenticationController.token(req, res);
        });
    }
    registerUserApis() {
        this.app.get('/users', authentication_middleware_1.AuthenticationMiddleware.verifyToken, (req, res) => this.userController.getUsers(req, res));
        this.app.post('/users', authentication_middleware_1.AuthenticationMiddleware.verifyToken, (req, res) => this.userController.createUser(req, res));
        this.app.get('/user/:username', authentication_middleware_1.AuthenticationMiddleware.verifyToken, (req, res) => this.userController.getUserInfo(req, res));
        this.app.put('/user/:userId', authentication_middleware_1.AuthenticationMiddleware.verifyToken, (req, res) => this.userController.updateUser(req, res));
        this.app.delete('/user/:userId', authentication_middleware_1.AuthenticationMiddleware.verifyToken, (req, res) => this.userController.deleteUser(req, res));
    }
    registerTripApis() {
        this.app.get('/trips', 
        // We do not need authentication. All user should view the trips.
        (req, res) => this.tripController.getTrips(req, res));
        this.app.post('/trips', 
        // AuthenticationMiddleware.verifyToken,
        (req, res) => this.tripController.createTrip(req, res));
        this.app.get('/trip/:tripId', 
        // We do not need authentication. All user should view the trips.
        (req, res) => this.tripController.getTripInfo(req, res));
        this.app.put('/trip/:tripId', authentication_middleware_1.AuthenticationMiddleware.verifyToken, (req, res) => this.tripController.updateTrip(req, res));
        this.app.delete('/trip/:tripId', authentication_middleware_1.AuthenticationMiddleware.verifyToken, (req, res) => this.tripController.deleteTrip(req, res));
    }
    registerTipApis() {
        this.app.get('/tips/:tripId', 
        // We do not need authentication. All user should view the trips.
        (req, res) => this.tipController.getTips(req, res));
        this.app.post('/tips/:tripId', authentication_middleware_1.AuthenticationMiddleware.verifyToken, (req, res) => this.tipController.createTip(req, res));
        this.app.put('/tip/:tipId', authentication_middleware_1.AuthenticationMiddleware.verifyToken, (req, res) => this.tipController.updateTip(req, res));
        this.app.delete('/tip/:tipId/:tripId', authentication_middleware_1.AuthenticationMiddleware.verifyToken, (req, res) => this.tipController.deleteTip(req, res));
    }
    registerImageApis() {
        this.app.get('/images/:tripId', 
        // We do not need authentication. All user should view the trips.
        (req, res) => this.imageController.getImages(req, res));
        this.app.post('/images/:tripId', authentication_middleware_1.AuthenticationMiddleware.verifyToken, (req, res) => this.imageController.uploadImage(req, res));
        this.app.get('/image/:tripId', 
        // We do not need authentication. All user should view the trips.
        (req, res) => this.imageController.getImage(req, res));
        this.app.delete('/image/:tripId', authentication_middleware_1.AuthenticationMiddleware.verifyToken, (req, res) => this.imageController.deleteImage(req, res));
    }
    registerCountryApis() {
        this.app.get('/countries/', 
        // We do not need authentication. All user should view the trips.
        (req, res) => this.countryController.getCountriesAndCitites(req, res));
    }
    initializeControllers() {
        this.userController = new user_controller_1.UserController(this.database);
        this.authenticationController = new authentication_controller_1.AuthenticationController(this.database, this.refreshTokenManager);
        this.tripController = new trip_controller_1.TripController(this.database);
        this.tipController = new tip_controller_1.TipController(this.database);
        this.imageController = new image_controller_1.ImageController(this.database);
        this.countryController = new coutry_controller_1.CountryController(this.database);
    }
    initializeScripts() {
        return __awaiter(this, void 0, void 0, function* () {
            const coutryRepo = new coutry_repository_1.CountryRepository(this.database, 'countries_and_cities');
            let promise = yield coutryRepo.hasRecords();
            if (promise.valueOf()) {
                return;
            }
            for (const [countryName, cities] of Object.entries(countries_and_cities_1.countriesAndCities)) {
                // let citiesWithName : ICity[] = cities.map(city => { let newCity : ICity = {name : city}; return newCity });
                const entry = {
                    name: countryName,
                    cities: cities,
                };
                yield coutryRepo.create(entry);
            }
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map