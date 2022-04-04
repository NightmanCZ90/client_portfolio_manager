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
  userId: number | null;
}

export const currentUser = createModel<RootModel>()({
  state: {
    error: '',
    loading: false,
    token: '',
    user: null,
    userId: null,
  } as CurrentUserState,
  reducers: {
    setError: (state, error: string) => ({ ...state, error }),
    setLoading: (state, loading: boolean) => ({ ...state, loading }),
    setToken: (state, token: string) => ({ ...state, token }),
    setUser: (state, user: CurrentUser | null) => ({ ...state, user }),
    setUserId: (state, userId: number | null) => ({ ...state, userId }),
  },
  effects: (dispatch) => ({
    async signIn(payload: SignInFormData) {
      const { setError, setLoading, setToken, setUser, setUserId } = dispatch.currentUser;

      /** Reset */
      setError('');
      setUser(null);
      setUserId(null);
      localStorage.removeItem('access_token');

      try {
        setLoading(true);
        const data = await RestApiClient.signIn(payload);
        if (data?.token && data.userId) {
          localStorage.setItem('access_token', data?.token);
          setToken(data.token);
          setUserId(data.userId);
        }
      } catch(err: any) {
        setError(err.data?.data?.[0]?.msg);
      }
      setLoading(false);
    },

    async signUp(payload: SignUpFormData) {
      const { setError, setLoading, setToken, setUser, setUserId } = dispatch.currentUser;

      /** Reset */
      setError('');
      setUser(null);
      setUserId(null);
      localStorage.removeItem('access_token');

      try {
        setLoading(true);
        const data = await RestApiClient.signUp(payload);
        if (data?.token && data?.userId) {
          localStorage.setItem('access_token', data?.token);
          setToken(data.token);
          setUserId(data.userId);
        }
      } catch(err: any) {
        setError(err.data?.data?.[0]?.msg);
      }
      setLoading(false);
    },

    signOut() {
      localStorage.removeItem('access_token');
      dispatch.currentUser.setToken('');
      dispatch.currentUser.setUser(null);
      window.location.reload();
    },

    async getCurrentUser(payload: any, state) {
      const { token } = state.currentUser;
      try {
        // setLoading(true);
        const data = await RestApiClient.getUser(payload, token);
        console.log(data)
        // if (data?.token) {
        //   localStorage.setItem('access_token', data?.token);
        //   setToken(data.token);
        // }
      } catch(err: any) {
        console.log(err.data)
        // setError(err.data?.data?.[0]?.msg);
      }
    }
  }),
});
