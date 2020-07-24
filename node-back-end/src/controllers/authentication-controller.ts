import {IUserService, UserService} from '../services/user-service';
import {Db} from 'mongodb';
import {IUser, UserRoles} from '../models/user';
import {Request, Response} from 'express';
import * as crypto from 'crypto-js';
import {TokenUtility} from '../shared/token-utility';
import {IRefreshTokenManager} from '../shared/refresh-token-manager';

// Think about storing token in database. It will be more secure, because currently we
// do not have a mechanism to invalidate token
export class AuthenticationController implements IAuthenticationController {
    // TODO use DI
    private readonly userService: IUserService;
    private readonly refreshTokenManager: IRefreshTokenManager;

    public constructor(db: Db, refreshTokenManager: IRefreshTokenManager) {
        this.userService = new UserService(db);
        this.refreshTokenManager = refreshTokenManager;
    }

    public async login(request: Request, response: Response): Promise<void> {
        const {username, password} = request.body;
        const user = await this.userService.getByUsername(username);

        const passwordIsValid =
            crypto.SHA256(password).toString() === user.password;

        if (!passwordIsValid) {
            response.status(401).send({auth: false, token: null});
        } else {
            const token = TokenUtility.generateToken(user.id);
            const refreshToken = TokenUtility.generateRefreshToken(user.id);
            this.refreshTokenManager.registerRefreshToken(refreshToken);

            response
                .status(200)
                .json({auth: true, token: token, refreshToken: refreshToken});
        }
    }

    public logout(request: Request, response: Response): void {
        const {refreshToken} = request.body;

        this.refreshTokenManager.invalidateRefreshToken(refreshToken);

        response.status(200).json({auth: false, token: null});
    }

    public async register(request: Request, response: Response): Promise<void> {
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
        // TODO test PURPOSE
        userData.role = UserRoles.ADMINISTRATOR;

        try {
            const userId = await this.userService.create(userData);
            const token = TokenUtility.generateToken(userId);
            const refreshToken = TokenUtility.generateRefreshToken(userId);
            this.refreshTokenManager.registerRefreshToken(refreshToken);

            response
                .status(200)
                .json({auth: true, token: token, refreshToken: refreshToken});
        } catch {
            response.sendStatus(500);
        }
    }

    public token(request: Request, response: Response): void {
        const {refreshToken} = request.body;

        if (!refreshToken) {
            response.sendStatus(401);

            return;
        }

        if (!this.refreshTokenManager.isRefreshTokenValid(refreshToken)) {
            response.sendStatus(403);

            return;
        }

        const verifyHandler = (err: any, user: any) => {
            if (err) {
                return response.sendStatus(403);
            }

            const accessToken = TokenUtility.generateToken(user.id);

            response.json({
                accessToken,
            });
        };

        TokenUtility.verifyRefreshToken(refreshToken, verifyHandler);
    }
}

export interface IAuthenticationController {
    login(request: Request, response: Response): void;

    logout(request: Request, response: Response): void;

    register(request: Request, response: Response): void;

    token(request: Request, response: Response): void;
}
