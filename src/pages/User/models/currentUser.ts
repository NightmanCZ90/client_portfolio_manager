import { createModel } from "@rematch/core";
import { RootModel } from "../../../store";
import { CurrentUser } from '../../../types/user';

interface CurrentUserState {
  user: CurrentUser | null;
}

export const currentUser = createModel<RootModel>()({
  state: {
    user: null,
  } as CurrentUserState,
  reducers: {
    setUser: (state, user: CurrentUser) => ({ ...state, user }),
  },
  effects: (dispatch) => ({
    async signIn(payload: number, state) {
      // TODO: sign in
    },

    async signUp(payload: number, state) {
      // TODO: sign up
    },

    signOut(payload: number, state) {
      // TODO: sign out
    },
  }),
});
