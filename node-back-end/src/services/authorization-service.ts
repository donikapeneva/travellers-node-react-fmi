import {UserRoles} from '../models/user';
import {UserService} from './user-service';
import {Db} from 'mongodb';

export class AuthorizationService implements IAuthorizationService {
    // TODO Use DI
    private readonly userService: UserService;

    public constructor(db: Db) {
        this.userService = new UserService(db);
    }

    public async verifyRole(
        userId: string,
        roles: Iterable<UserRoles>
    ): Promise<boolean> {
        const user = await this.userService.getByUserId(userId);
        const userRoles = new Set(
            [...roles].map((role) => role.toString().toUpperCase())
        );

        return user ? userRoles.has(user.role.toUpperCase()) : false;
    }
}

export interface IAuthorizationService {
    verifyRole(userId: string, role: Iterable<UserRoles>): Promise<boolean>;
}
