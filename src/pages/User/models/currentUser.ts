import { createModel } from "@rematch/core";

import { RootModel } from "../../../store";
import { CurrentUser } from '../../../types/user';
import { SignUpFormData } from '../SignUp';
import RestApiClient from '../../../services/rest_api_client';
import { SignInFormData } from '../SignIn';

interface CurrentUserState {
  error: string;
  loading: boolean;
  token: string;
  user: CurrentUser | null;
}

export const currentUser = createModel<RootModel>()({
  state: {
    error: '',
    loading: false,
    token: '',
    user: null,
  } as CurrentUserState,
  reducers: {
    setError: (state, error: string) => ({ ...state, error }),
    setLoading: (state, loading: boolean) => ({ ...state, loading }),
    setToken: (state, token: string) => ({ ...state, token }),
    setUser: (state, user: CurrentUser | null) => ({ ...state, user }),
  },
  effects: (dispatch) => ({
    async signIn(payload: SignInFormData, state) {
      const { setError, setLoading, setToken, setUser } = dispatch.currentUser;

      /** Reset */
      setError('');
      setUser(null);
      localStorage.removeItem('access_token');

      try {
        setLoading(true);
        const data = await RestApiClient.signIn(payload);
        if (data?.token) {
          localStorage.setItem('access_token', data?.token);
          setToken(data.token);
        }
      } catch(err: any) {
        setError(err.data?.data?.[0]?.msg);
      }
      setLoading(false);
    },

    async signUp(payload: SignUpFormData, state) {
      const { setError, setLoading, setToken, setUser } = dispatch.currentUser;

      /** Reset */
      setError('');
      setUser(null);
      localStorage.removeItem('access_token');

      try {
        setLoading(true);
        const data = await RestApiClient.signUp(payload);
        if (data?.token) {
          localStorage.setItem('access_token', data?.token);
          setToken(data.token);
        }
      } catch(err: any) {
        setError(err.data?.data?.[0]?.msg);
      }
      setLoading(false);
    },

    signOut(payload: number, state) {
      // TODO: sign out
    },
  }),
});
