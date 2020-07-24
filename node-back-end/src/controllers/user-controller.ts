import {IUserService, UserService} from '../services/user-service';
import {Db} from 'mongodb';
import {Request, Response} from 'express';
import {AuthorizationService, IAuthorizationService,} from '../services/authorization-service';
import {IUser, UserRoles} from '../models/user';
import * as crypto from 'crypto-js';

export class UserController implements IUserController {
    // TODO use DI
    private readonly userService: IUserService;
    private readonly authorizationService: IAuthorizationService;

    public constructor(db: Db) {
        this.userService = new UserService(db);
        this.authorizationService = new AuthorizationService(db);
    }

    public async getUserInfo(
        request: Request,
        response: Response
    ): Promise<void> {
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

        const username = request.params['username'];
        const user = await this.userService.getByUsername(username);

        if (user) {
            delete user.password;
        }

        response.status(200).send({user});
    }

    public async getUsers(request: Request, response: Response): Promise<void> {
        const userId: string = (request as any).userId;

        if (
            !(await this.authorizationService.verifyRole(userId, [
                UserRoles.ADMINISTRATOR,
            ]))
        ) {
            response.sendStatus(401);

            return;
        }

        const users: IUser[] = await this.userService.getAllUsers();

        response.status(200).send({users});
    }

    public async createUser(request: Request, response: Response): Promise<void> {
        const userData: IUser = (request.body as unknown) as IUser;

        // Could be optimized with 1 query
        const isUserNameExists: boolean = await this.userService.usernameExists(
            userData.username
        );
        const isMailExists: boolean = await this.userService.mailsExists(
            userData.email
        );

        if (isUserNameExists || isMailExists) {
            // Change status and send appropriate message
            response.status(500).send('Username or mail exist in database');

            return;
        }

        const hashedPassword = crypto.SHA256(userData.password).toString();
        userData.password = hashedPassword;

        try {
            const userId = await this.userService.create(userData);

            response.status(200).json({userId});
        } catch {
            response.sendStatus(500);
        }
    }

    public async updateUser(request: Request, response: Response): Promise<void> {
        const userData: Partial<IUser> = (request.body as unknown) as IUser;
        const userId = request.params['userId'];

        try {
            await this.userService.update(userId, userData);

            response.sendStatus(200);
        } catch {
            response.sendStatus(500);
        }
    }

    public async deleteUser(request: Request, response: Response): Promise<void> {
        const userId = request.params['userId'];
        try {
            await this.userService.delete(userId);

            response.sendStatus(200);
        } catch {
            response.sendStatus(500);
        }
    }
}

export interface IUserController {
    getUserInfo(request: Request, response: Response): void;

    getUsers(request: Request, response: Response): void;

    createUser(request: Request, response: Response): void;

    deleteUser(request: Request, response: Response): void;

    updateUser(request: Request, response: Response): void;
}
