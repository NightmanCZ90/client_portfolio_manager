import { createModel } from "@rematch/core";

import { RootModel } from "../../../store";
import { User, Token } from '../../../types/user';
import { SignUpFormData } from '../SignUp';
import RestApiClient from '../../../services/restApiClient';
import { SignInFormData } from '../SignIn';
import axios from '../../../services/axios';

interface CurrentUserState {
  error: string;
  loading: boolean;
  token: Token | null;
  user: User | null;
}

export const currentUser = createModel<RootModel>()({
  state: {
    error: '',
    loading: false,
    token: null,
    user: null,
  } as CurrentUserState,
  reducers: {
    setError: (state, error: string) => ({ ...state, error }),
    setLoading: (state, loading: boolean) => ({ ...state, loading }),
    setToken: (state, token: Token | null) => ({ ...state, token }),
    setUser: (state, user: User | null) => ({ ...state, user }),
  },
  effects: (dispatch) => ({
    async signIn(payload: SignInFormData) {
      const { setError, setLoading, setToken, setUser } = dispatch.currentUser;

      /** Reset */
      setError('');
      setUser(null);
      setToken(null);
      localStorage.removeItem('jwt_token');

      setLoading(true);
      try {
        const data = await RestApiClient.signIn(payload);
        if (data) {
          const { accessToken, refreshToken, expiresIn } = data;
          const tokenData = JSON.stringify({ accessToken, refreshToken, expiresIn });
          localStorage.setItem('jwt_token', tokenData);
          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          setToken(data);
        }
      } catch (error: any) {
        if (error) {
          error.message && setError(error.message);
          error.data && error.data?.length > 0 && setError(error.data[0]?.msg);
        }
      }
      setLoading(false);
    },

    async signUp(payload: SignUpFormData) {
      const { setError, setLoading, setToken, setUser } = dispatch.currentUser;

      /** Reset */
      setError('');
      setUser(null);
      setToken(null);
      localStorage.removeItem('jwt_token');

      setLoading(true);

      try {
        const data = await RestApiClient.signUp(payload);
        if (data) {
          const { accessToken, refreshToken, expiresIn } = data;
          const tokenData = JSON.stringify({ accessToken, refreshToken, expiresIn });
          localStorage.setItem('jwt_token', tokenData);
          setToken(data);
        }
      } catch (error: any) {
        if (error) {
          error.message && setError(error.message);
          error.data && error.data?.length > 0 && setError(error.data[0]?.msg);
        }
      }
      setLoading(false);
    },

    signOut() {
      localStorage.removeItem('jwt_token');
      dispatch.currentUser.setToken(null);
      dispatch.currentUser.setUser(null);
      window.location.reload();
    },

    async getCurrentUser() {
      const { setError, setUser } = dispatch.currentUser;

      try {
        const data = await RestApiClient.getCurrentUser();
        if (data) {
          setUser(data);
        }
      } catch (error: any) {
        if (error) {
          error.message && setError(error.message);
          error.data && error.data?.length > 0 && setError(error.data[0]?.msg);
        }
      }
    },

    async updateUser(payload: User, state) {
      const { setError, setLoading } = dispatch.currentUser;
      const { id, firstName, lastName, role } = payload;
      const body = {
        firstName,
        lastName,
        role,
      }

      /** Reset */
      setError('');

      setLoading(true);

      try {
        const data = await RestApiClient.updateUser(id, body);
        if (data) {
          dispatch.currentUser.setUser(data);
        }
      } catch (error: any) {
        if (error) {
          error.message && setError(error.message);
          error.data && error.data?.length > 0 && setError(error.data[0]?.msg);
        }
      }
      setLoading(false);
    }
  }),
});
