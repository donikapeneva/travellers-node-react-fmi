import {Express, Request, Response} from 'express';
import {Db} from 'mongodb';
import {IUserController, UserController} from './controllers/user-controller';
import {AuthenticationController, IAuthenticationController,} from './controllers/authentication-controller';
import {AuthenticationMiddleware} from './shared/authentication-middleware';
import {ITripController, TripController} from './controllers/trip-controller';
import {IRefreshTokenManager, RefreshTokenManager,} from './shared/refresh-token-manager';
import {ITipController, TipController} from './controllers/tip-controller';
import {IImageController, ImageController,} from './controllers/image-controller';
import {countriesAndCities} from './shared-data/countries-and-cities';
import {CountryRepository} from './repositories/coutry-repository';
import {ICountry} from './models/coutry';
import {CountryController, ICountryController,} from './controllers/coutry-controller';

export class Server {
    private readonly app: Express;
    private database: Db;
    private readonly DATABASE_NAME: string = 'travellers';

    private readonly refreshTokenManager: IRefreshTokenManager = new RefreshTokenManager();

    private userController: IUserController;
    private authenticationController: IAuthenticationController;
    private tripController: ITripController;
    private tipController: ITipController;
    private imageController: IImageController;
    private countryController: ICountryController;

    public constructor(app: Express) {
        this.app = app;

        this.registerApi();
    }

    public start(port: number): void {
        this.app.listen(port, () =>
            // tslint:disable-next-line: no-console
            console.log(`Server listening on port ${port}!`)
        );

        this.connectToDabatase().then((db: Db) => {
            this.database = db;
            this.initializeScripts().then(() => {
                this.initializeControllers();
            });
        });
    }

    public async connectToDabatase(): Promise<Db> {
        // const connection = await MongoClient.connect('mongodb://localhost');
        // const db = connection.db(this.DATABASE_NAME);


        const MongoClient = require('mongodb').MongoClient;
        const uri = "mongodb+srv://travellers_admin:nYHkRo6Jb63YCVEG@cluster0.cjd3t.mongodb.net/travellers_admin?retryWrites=true&w=majority";
        const client = new MongoClient(uri, {useNewUrlParser: true});

        try {

            await client.connect();

            console.log(client.db(this.DATABASE_NAME));
            return client.db(this.DATABASE_NAME);
            // await listDatabases(client);

        } catch (e) {
            console.error(e);
            return e;
        } finally {
            // await client.close();
        }

    }

    private registerApi(): void {
        this.app.get('/api', (req: Request, res: Response): void => {
            res.send('You have reached the API!');
        });

        this.app.get('/', (req: Request, res: Response): void => {
            res.sendFile('index.html', {root: __dirname});
        });

        this.registerAuthenticationApis();
        this.registerUserApis();
        this.registerTripApis();
        this.registerTipApis();
        this.registerImageApis();
        this.registerCountryApis();
    }

    private registerAuthenticationApis(): void {
        this.app.post('/register', (req: Request, res: Response): void =>
            this.authenticationController.register(req, res)
        );

        this.app.post('/login', (req: Request, res: Response): void =>
            this.authenticationController.login(req, res)
        );

        this.app.post(
            '/logout',
            AuthenticationMiddleware.verifyToken,
            (req: Request, res: Response): void =>
                this.authenticationController.logout(req, res)
        );

        this.app.post('/token', (req: Request, res: Response) => {
            this.authenticationController.token(req, res);
        });
    }

    private registerUserApis(): void {
        this.app.get(
            '/users',
            AuthenticationMiddleware.verifyToken,
            (req: Request, res: Response): void =>
                this.userController.getUsers(req, res)
        );

        this.app.post(
            '/users',
            AuthenticationMiddleware.verifyToken,
            (req: Request, res: Response): void =>
                this.userController.createUser(req, res)
        );

        this.app.get(
            '/users/:username',
            AuthenticationMiddleware.verifyToken,
            (req: Request, res: Response): void =>
                this.userController.getUserInfo(req, res)
        );

        this.app.put(
            '/users/:userId',
            AuthenticationMiddleware.verifyToken,
            (req: Request, res: Response): void =>
                this.userController.updateUser(req, res)
        );

        this.app.delete(
            '/users/:userId',
            AuthenticationMiddleware.verifyToken,
            (req: Request, res: Response): void =>
                this.userController.deleteUser(req, res)
        );
    }

    private registerTripApis(): void {
        this.app.get(
            '/trips',
            // We do not need authentication. All user should view the trips.
            (req: Request, res: Response): void =>
                this.tripController.getTrips(req, res)
        );

        this.app.post(
            '/trips',
            // AuthenticationMiddleware.verifyToken,
            (req: Request, res: Response): void =>
                this.tripController.createTrip(req, res)
        );

        this.app.get(
            '/trips/:tripId',
            // We do not need authentication. All user should view the trips.
            (req: Request, res: Response): void =>
                this.tripController.getTripInfo(req, res)
        );

        this.app.put(
            '/trips/:tripId',
            // AuthenticationMiddleware.verifyToken,
            (req: Request, res: Response): void =>
                this.tripController.updateTrip(req, res)
        );

        this.app.delete(
            '/trips/:tripId',
            // AuthenticationMiddleware.verifyToken,
            (req: Request, res: Response): void =>
                this.tripController.deleteTrip(req, res)
        );
    }

    private registerTipApis(): void {
        this.app.get(
            '/tips/:tripId',
            // We do not need authentication. All user should view the trips.
            (req: Request, res: Response): void =>
                this.tipController.getTips(req, res)
        );

        this.app.post(
            '/tips/:tripId',
            // AuthenticationMiddleware.verifyToken,
            (req: Request, res: Response): void =>
                this.tipController.createTip(req, res)
        );

        this.app.put(
            '/tips/:tipId',
            // AuthenticationMiddleware.verifyToken,
            (req: Request, res: Response): void =>
                this.tipController.updateTip(req, res)
        );

        this.app.delete(
            '/tips/:tipId/:tripId',
            // AuthenticationMiddleware.verifyToken,
            (req: Request, res: Response): void =>
                this.tipController.deleteTip(req, res)
        );
    }

    private registerImageApis(): void {
        this.app.get(
            '/images/:tripId',
            // We do not need authentication. All user should view the trips.
            (req: Request, res: Response): void =>
                this.imageController.getImages(req, res)
        );

        this.app.post(
            '/images/:tripId',
            // AuthenticationMiddleware.verifyToken,
            (req: Request, res: Response): void =>
                this.imageController.uploadImage(req, res)
        );

        this.app.get(
            '/images/:tripId',
            // We do not need authentication. All user should view the trips.
            (req: Request, res: Response): void =>
                this.imageController.getImage(req, res)
        );

        this.app.delete(
            '/images/:imageId',
            // AuthenticationMiddleware.verifyToken,
            (req: Request, res: Response): void =>
                this.imageController.deleteImage(req, res)
        );
    }

    private registerCountryApis(): void {
        this.app.get(
            '/countries/',
            // We do not need authentication. All user should view the trips.
            (req: Request, res: Response): void =>
                this.countryController.getCountriesAndCitites(req, res)
        );
    }

    private initializeControllers(): void {
        this.userController = new UserController(this.database);
        this.authenticationController = new AuthenticationController(
            this.database,
            this.refreshTokenManager
        );
        this.tripController = new TripController(this.database);
        this.tipController = new TipController(this.database);
        this.imageController = new ImageController(this.database);
        this.countryController = new CountryController(this.database);
    }

    private async initializeScripts(): Promise<void> {
        const coutryRepo = new CountryRepository(
            this.database,
            'countries_and_cities'
        );

        let promise = await coutryRepo.hasRecords();
        if (promise.valueOf()) {
            return;
        }

        for (const [countryName, cities] of Object.entries(countriesAndCities)) {
            // let citiesWithName : ICity[] = cities.map(city => { let newCity : ICity = {name : city}; return newCity });

            const entry: ICountry = {
                name: countryName,
                cities: cities,
                // cities: citiesWithName,
            };

            await coutryRepo.create(entry);
        }
    }
}
