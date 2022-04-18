import { createModel } from "@rematch/core";

import { RootModel } from "../../../store";
import { User, Token } from '../../../types/user';

interface CurrentUserState {
  token: Token | null;
  user: User | null;
}

export const currentUser = createModel<RootModel>()({
  state: {
    token: null,
    user: null,
  } as CurrentUserState,
  reducers: {
    setToken: (state, token: Token | null) => ({ ...state, token }),
    setUser: (state, user: User | null) => ({ ...state, user }),
  },
});
