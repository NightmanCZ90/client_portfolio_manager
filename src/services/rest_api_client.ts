import { CurrentUser, Role, Token } from '../types/user';
import ApiClient from './api_client';

const baseUrl = (process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BASE_URL : process.env.REACT_APP_BASE_URL) || 'http://localhost:8080';

export interface IdentifierQuery {
  id: string;
}

class RestApiClient extends ApiClient {
  baseUrl = baseUrl;

  async signUp(body: {
    email: string,
    password: string,
    confirmPassword: string,
  }) {
    return this.axiosRequest<Token>({
      url: '/signup',
      method: 'POST',
      body,
    })
  }

  async signIn(body: {
    email: string,
    password: string,
  }) {
    return this.axiosRequest<Token>({
      url: '/login',
      method: 'POST',
      body,
    })
  }

  async getUser(userId: number) {
    return this.axiosRequest<CurrentUser>({
      url: `/users/${userId}`,
      method: 'GET'
    })
  }

  async getCurrentUser() {
    return this.axiosRequest<CurrentUser>({
      url: '/users/current',
      method: 'GET'
    })
  }

  async updateUser(userId: number, body: {
    firstName: string,
    lastName: string,
    role: Role,
  }) {
    return this.axiosRequest<CurrentUser>({
      url: `/users/${userId}`,
      method: 'PUT',
      body,
    })
  }
}

export default new RestApiClient();
