import { createModel } from "@rematch/core";

import { RootModel } from "../../../store";
import { User, Token } from '../../../types/user';
import RestApiClient from '../../../services/RestApiClient';

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
