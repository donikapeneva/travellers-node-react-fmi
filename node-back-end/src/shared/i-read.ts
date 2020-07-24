export interface IRead<T> {
    find(item: T): Promise<T[]>;

    findOneById(id: string): Promise<T | null>;

    getAll(): Promise<T[]>;
}
