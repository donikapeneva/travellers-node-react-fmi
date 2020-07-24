import {IWrite} from './i-write';
import {IRead} from './i-read';
// we imported all types from mongodb driver, to use in code
import {Collection, Db, ObjectId} from 'mongodb';

// that class only can be extended
export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
    //creating a property to use your code in all instances
    // that extends your base repository and reuse on methods of class
    protected readonly collection: Collection;

    //we created constructor with arguments to manipulate mongodb operations
    public constructor(db: Db, collectionName: string) {
        this.collection = db.collection(collectionName);
    }

    // we add to method, the async keyword to manipulate the insert result
    // of method.
    public async create(item: T): Promise<string> {
        const result = await this.collection.insertOne(item);

        return result.insertedId.toString();
    }

    public async update(id: string, item: Partial<T>): Promise<boolean> {
        const result = await this.collection.updateOne(
            {_id: new ObjectId(id)},
            {$set: item}
        );

        return !!result.result.ok && result.result.n > 0;
    }

    public async delete(id: string): Promise<boolean> {
        const result = await this.collection.deleteOne({_id: new ObjectId(id)});

        return !!result.result.ok && result.deletedCount && result.deletedCount > 0;
    }

    public async find(item: T): Promise<T[]> {
        const result = await this.collection.findOne(item);

        return result;
    }

    public async findOneById(id: string): Promise<T> {
        const query = {_id: new ObjectId(id)};

        const result = await this.collection.findOne(query);

        return result;
    }

    public async getAll(): Promise<T[]> {
        const result = await this.collection.find();

        return result.toArray();
    }


}
