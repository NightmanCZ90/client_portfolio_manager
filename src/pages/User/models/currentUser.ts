import { createModel } from "@rematch/core";

import { RootModel } from "../../../store";
import { CurrentUser, Token } from '../../../types/user';
import { SignUpFormData } from '../SignUp';
import RestApiClient from '../../../services/rest_api_client';
import { SignInFormData } from '../SignIn';

interface CurrentUserState {
  error: string;
  loading: boolean;
  token: Token | null;
  user: CurrentUser | null;
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
    setUser: (state, user: CurrentUser | null) => ({ ...state, user }),
  },
  effects: (dispatch) => ({
    async signIn(payload: SignInFormData) {
      const { setError, setLoading, setToken, setUser } = dispatch.currentUser;

      /** Reset */
      setError('');
      setUser(null);
      setToken(null);
      localStorage.removeItem('jwt_token');

      try {
        setLoading(true);
        const data = await RestApiClient.signIn(payload);
        if (data) {
          const { accessToken, refreshToken, expiresIn } = data;
          const tokenData = JSON.stringify({ accessToken, refreshToken, expiresIn });
          localStorage.setItem('jwt_token', tokenData);
          setToken(data);
        }
      } catch(err: any) {
        setError(err.data?.data?.[0]?.msg);
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

      try {
        setLoading(true);
        const data = await RestApiClient.signUp(payload);
        if (data) {
          const { accessToken, refreshToken, expiresIn } = data;
          const tokenData = JSON.stringify({ accessToken, refreshToken, expiresIn });
          localStorage.setItem('jwt_token', tokenData);
          setToken(data);
        }
      } catch(err: any) {
        setError(err.data?.data?.[0]?.msg);
      }
      setLoading(false);
    },

    signOut() {
      localStorage.removeItem('jwt_token');
      dispatch.currentUser.setToken(null);
      dispatch.currentUser.setUser(null);
      window.location.reload();
    },

    async getCurrentUser(accessToken: string, state) {
      try {
        if (accessToken) {
          const data = await RestApiClient.getCurrentUser(accessToken);

          if (data) {
            dispatch.currentUser.setUser(data);
          }
        }
      } catch(err: any) {
        // TODO: Remove sign out once token refresh is implemented
        dispatch.currentUser.signOut();
      }
    }
  }),
});
