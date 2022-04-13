import { Portfolio } from '../types/portfolio';
import { User, Role, Token } from '../types/user';
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
    return this.axiosRequest<User>({
      url: `/users/${userId}`,
      method: 'GET'
    })
  }

  async getCurrentUser() {
    return this.axiosRequest<User>({
      url: '/users/current',
      method: 'GET'
    })
  }

  async updateUser(userId: number, body: {
    firstName: string,
    lastName: string,
    role: Role,
  }) {
    return this.axiosRequest<User>({
      url: `/users/${userId}`,
      method: 'PUT',
      body,
    })
  }

  async confirmInvestor(investorEmail: string) {
    return this.axiosRequest<{ id: number }>({
      url: '/users/confirm',
      method: 'POST',
      body: {
        email: investorEmail,
      },
    })
  }

  async getUsersPortfolios() {
    return this.axiosRequest<{ personal: Portfolio[], managed: Portfolio[] }>({
      url: '/portfolios',
      method: 'GET',
    })
  }

  async createPortfolio(body: {
    name: string,
    description: string,
    color: string,
    url: string,
  }) {
    return this.axiosRequest<User>({
      url: '/portfoli',
      method: 'POST',
      body,
    })
  }
}

export default new RestApiClient();
