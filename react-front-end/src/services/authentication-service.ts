import Axios from 'axios';
import { BACKEND_URL } from '../config';
import { IUser } from '../data/i-user';

export class AuthenticationService implements IAuthenticationService {
  public async login(): Promise<void> {
    const username: string = 'test';
    const password: string = 'test';

    const result = await Axios.post(`${BACKEND_URL}/login`, {
      username,
      password,
    });

    // const { auth, token, refreshToken } = result;

    // Save them in local storage or redux store
  }

  public async logout(): Promise<void> {
    const refreshToken: string = 'test';

    const result = await Axios.post(`${BACKEND_URL}/logout`, {
      refreshToken,
    });

    // delete auth data
  }

  public async register(user: Partial<IUser>): Promise<void> {
    const result = await Axios.post(`${BACKEND_URL}/register`, {
      user,
    });

    // const { auth, token, refreshToken } = result;

    // Save them in local storage or redux store
  }

  public async token(): Promise<void> {
    const refreshToken: string = 'test';

    const result = await Axios.post(`${BACKEND_URL}/token`, {
      refreshToken,
    });

    // const { accessToken } = result;
    // Save them in local storage or redux store
  }
}

export interface IAuthenticationService {
  login(): Promise<void>;
  logout(): Promise<void>;
  register(user: IUser): Promise<void>;
  token(): Promise<void>;
}
