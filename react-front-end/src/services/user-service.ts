import Axios from 'axios';
import { IUser } from '../data/i-user';
import { BACKEND_URL } from '../config';

export class UserService implements IUserService {
  public async getUserInfo(userId: string): Promise<IUser> {
    const userResponse = await Axios.get(`${BACKEND_URL}/user/${userId}`);

    return userResponse.data;
  }

  public async getUsers(): Promise<IUser[]> {
    const usersResponse = await Axios.get(`${BACKEND_URL}/users`);

    return usersResponse.data;
  }

  public async createUser(user: Partial<IUser>): Promise<void> {
    console.log(user);
    await Axios.post(`${BACKEND_URL}/register`,  user );
  }

  public async deleteUser(userId: string): Promise<void> {
    await Axios.delete(`${BACKEND_URL}/user/${userId}`);
  }

  public async updateUser(userId: string, user: Partial<IUser>): Promise<void> {
    await Axios.put(`${BACKEND_URL}/user/${userId}`, { user });
  }
}

export interface IUserService {
  getUserInfo(userId: string): Promise<IUser>;
  getUsers(): Promise<IUser[]>;
  createUser(user: Partial<IUser>): Promise<void>;
  deleteUser(userId: string): Promise<void>;
  updateUser(userId: string, user: Partial<IUser>): Promise<void>;
}

export const userService = new UserService();