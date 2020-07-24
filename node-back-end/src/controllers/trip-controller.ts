import {Request, Response} from 'express';
import {IAuthorizationService,} from '../services/authorization-service';
import {Db} from 'mongodb';
import {UserRoles} from '../models/user';
import {ITrip} from '../models/trip';
import {ITripService, TripService} from '../services/trip-service';

export class TripController implements ITripController {
    // TODO use DI
    private readonly authorizationService: IAuthorizationService;
    private readonly tripService: ITripService;

    public constructor(db: Db) {
        // this.authorizationService = new AuthorizationService(db);
        this.tripService = new TripService(db);
    }

    public async getTripInfo(
        request: Request,
        response: Response
    ): Promise<void> {
        // We do not need authrization. Anonymous users can view trips
        const tripId: string = request.params['tripId'];

        try {
            const trip: ITrip = await this.tripService.getTripInfo(tripId);

            response.status(200).json({trip});
        } catch {
            response.sendStatus(500);
        }
    }

    public async getTrips(request: Request, response: Response): Promise<void> {
        // We do not need authrization. Anonymous users can view trips
        try {
            const trips: ITrip[] = await this.tripService.getTrips();

            response.status(200).json({trips});
        } catch {
            response.sendStatus(500);
        }
    }

    public async createTrip(request: Request, response: Response): Promise<void> {
        const userId: string = (request as any).userId;

        if (
            !(await this.authorizationService.verifyRole(userId, [
                UserRoles.ADMINISTRATOR,
                UserRoles.USER,
            ]))
        ) {
            response.sendStatus(401);

            return;
        }

        const trip: ITrip = (request.body as unknown) as ITrip;
        console.log(trip);
        try {
            const tripId: string = await this.tripService.createTrip(trip, trip.userId);
            response.status(200).json({tripId});
        } catch {
            response.sendStatus(500);
        }
    }

    public async deleteTrip(request: Request, response: Response): Promise<void> {
        const userId: string = (request as any).userId;

        if (
            !(await this.authorizationService.verifyRole(userId, [
                UserRoles.ADMINISTRATOR,
                UserRoles.USER,
            ]))
        ) {
            response.sendStatus(401);

            return;
        }

        const tripId = request.params['tripId'];

        try {
            await this.tripService.deleteTrip(tripId);

            response.sendStatus(200);
        } catch {
            response.sendStatus(500);
        }
    }

    public async updateTrip(request: Request, response: Response): Promise<void> {
        const userId: string = (request as any).userId;

        if (
            !(await this.authorizationService.verifyRole(userId, [
                UserRoles.ADMINISTRATOR,
                UserRoles.USER,
            ]))
        ) {
            response.sendStatus(401);

            return;
        }

        const tripUpdates: Partial<ITrip> = (request.body as unknown) as Partial<ITrip>;
        const tripId = request.params['tripId'];

        try {
            await this.tripService.updateTrip(tripId, tripUpdates);

            response.sendStatus(200);
        } catch {
            response.sendStatus(500);
        }
    }
}

export interface ITripController {
    getTripInfo(request: Request, response: Response): void;

    getTrips(request: Request, response: Response): void;

    createTrip(request: Request, response: Response): void;

    deleteTrip(request: Request, response: Response): void;

    updateTrip(request: Request, response: Response): void;
}
