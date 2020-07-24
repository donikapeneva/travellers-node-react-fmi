import {UserRepository} from '../repositories/user-repository';
import {IUser} from '../models/user';
import {Db} from 'mongodb';

export class UserService implements IUserService {
    // TODO Use DI
    private readonly userRepository: UserRepository;

    public constructor(db: Db) {
        this.userRepository = new UserRepository(db, 'users');
    }

    public async create(userData: IUser): Promise<string> {
        const userId: string = await this.userRepository.create(userData);

        return userId;
    }

    public async update(
        userId: string,
        userData: Partial<IUser>
    ): Promise<boolean> {
        const isUpdated: boolean = await this.userRepository.update(
            userId,
            userData
        );

        return isUpdated;
    }

    // Do we want to delete it physicali from db?
    public async delete(userId: string): Promise<boolean> {
        const isDeleted: boolean = await this.userRepository.delete(userId);

        return isDeleted;
    }

    public async getByUsername(username: string): Promise<IUser | null> {
        const user: IUser | null = await this.userRepository.findByUsername(
            username
        );

        return user;
    }

    public async getByUserId(userId: string): Promise<IUser | null> {
        const user: IUser | null = await this.userRepository.findById(userId);

        return user;
    }

    public async usernameExists(username: string): Promise<boolean> {
        const user: IUser | null = await this.userRepository.findByUsername(
            username
        );

        return user !== null;
    }

    public async mailsExists(email: string): Promise<boolean> {
        const user: IUser | null = await this.userRepository.findByMail(email);

        return user !== null;
    }

    public async getAllUsers(): Promise<IUser[]> {
        const users: IUser[] = await this.userRepository.getAll();

        for (const user of users) {
            delete user.password;
        }

        return users;
    }
}

export interface IUserService {
    create(userData: IUser): Promise<string>;

    update(userId: string, userData: Partial<IUser>): Promise<boolean>;

    delete(userId: string): Promise<boolean>;

    getByUsername(username: string): Promise<IUser | null>;

    getByUserId(userId: string): Promise<IUser | null>;

    usernameExists(userId: string): Promise<boolean>;

    mailsExists(mail: string): Promise<boolean>;

    getAllUsers(): Promise<IUser[]>;
}
