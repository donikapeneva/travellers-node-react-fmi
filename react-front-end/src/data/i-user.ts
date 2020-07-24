export interface IUser {
    id: number;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    active: boolean;
    role?: UserRoles;
}

export enum UserRoles {
    USER = 'USER',
    ADMINISTRATOR = 'ADMINISTRATOR',

}
