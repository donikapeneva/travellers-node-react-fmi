import {Request, Response} from 'express';
import {AuthorizationService, IAuthorizationService,} from '../services/authorization-service';
import {Db} from 'mongodb';
import {UserRoles} from '../models/user';
import {ITipService, TipService} from '../services/tip-service';
import {ITip} from '../models/tip';

export class TipController implements ITipController {
  // TODO use DI
  private readonly authorizationService: IAuthorizationService;
  private readonly tipService: ITipService;

  public constructor(db: Db) {
    this.authorizationService = new AuthorizationService(db);
    this.tipService = new TipService(db);
  }

  public async getTips(request: Request, response: Response): Promise<void> {
    // We do not need authrization. Anonymous users can view trips
    const tripId: string = request.params['tripId'];

    try {
      const tips = await this.tipService.getTips(tripId);

      response.status(200).json({ tips });
    } catch {
      response.sendStatus(500);
    }
  }

  public async createTip(request: Request, response: Response): Promise<void> {
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

    const tripId: string = request.params['tripId'];
    const tip: ITip = (request.body as unknown) as ITip;

    try {
      const tipId: string = await this.tipService.createTip(tripId, tip);

      response.status(200).json({ tipId });
    } catch {
      response.sendStatus(500);
    }
  }

  public async deleteTip(request: Request, response: Response): Promise<void> {
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

    const tipId: string = request.params['tipId'];
    const tripId: string = request.params['tripId'];

    try {
      await this.tipService.deleteTip(tipId, tripId);

      response.sendStatus(200);
    } catch {
      response.sendStatus(500);
    }
  }

  public async updateTip(request: Request, response: Response): Promise<void> {
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

    const tripId: string = request.params['tripId'];
    const tipId: string = request.params['tipId'];

    const tip: ITip = (request.body as unknown) as ITip;

    try {
      await this.tipService.updateTip(tripId, tipId, tip, userId);

      response.sendStatus(200);
    } catch {
      response.sendStatus(500);
    }
  }
}

export interface ITipController {
  getTips(request: Request, response: Response): void;
  createTip(request: Request, response: Response): void;
  deleteTip(request: Request, response: Response): void;
  updateTip(request: Request, response: Response): void;
}
