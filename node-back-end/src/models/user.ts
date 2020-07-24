export interface IUser {
    id: string;
    username: string;
    email: string;
    password: string;
    role: string;
}

export enum UserRoles {
    ADMINISTRATOR = 'ADMINISTRATOR',
    USER = 'USER',
}
