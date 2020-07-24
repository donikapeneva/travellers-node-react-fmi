import {IUser} from '../models/user';
import {BaseRepository} from '../shared/base-repository';

export class UserRepository extends BaseRepository<IUser> {
    public async findByUsername(username: string): Promise<IUser | null> {
        const query = {username};

        const user = await this.collection.findOne(query);

        if (user) {
            user.id = (user as any)._id.toString();
        }

        return user;
    }

    public async findByMail(email: string): Promise<IUser | null> {
        const query = {email};

        const user = await this.collection.findOne(query);

        if (user) {
            user.id = (user as any)._id.toString();
        }

        return user;
    }

    public async findById(userId: string): Promise<IUser | null> {
        const user = await this.findOneById(userId);

        if (user) {
            user.id = (user as any)._id.toString();
        }

        return user;
    }
}
