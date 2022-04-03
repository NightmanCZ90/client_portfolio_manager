import { Token } from '../types/user';
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
    return this.request<Token>({
      url: '/signup',
      method: 'POST',
      body,
    })
  }
}

export default new RestApiClient();
