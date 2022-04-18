import { Portfolio, PortfolioTypes } from '../types/portfolio';
import { User, Role, Token } from '../types/user';
import ApiClient from './ApiClient';

const baseUrl = (process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BASE_URL : process.env.REACT_APP_BASE_URL) || 'http://localhost:8080';

export interface IdentifierQuery {
  id: string;
}

class RestApiClient extends ApiClient {
  baseUrl = baseUrl;

  /**
   * Authentication
   *
   */

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

  /**
   * Current User
   *
   */

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

  /**
   * Portfolios
   *
   */

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
    return this.axiosRequest<PortfolioTypes>({
      url: '/portfolios',
      method: 'GET',
    })
  }

  async getPortfolio(portfolioId: number) {
    return this.axiosRequest<Portfolio>({
      url: `/portfolios/${portfolioId}`,
      method: 'GET',
    })
  }

  async createPortfolio(body: {
    name: string,
    description: string,
    color: string,
    url: string,
    investorId: number | null,
  }) {
    return this.axiosRequest<Portfolio>({
      url: '/portfolios/create',
      method: 'POST',
      body,
    })
  }

  async confirmPortfolio(portfolioId: number) {
    return this.axiosRequest<Portfolio>({
      url: `/portfolios/${portfolioId}/confirm`,
      method: 'PUT',
    })
  }
}

export default new RestApiClient();
