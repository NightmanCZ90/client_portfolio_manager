import { Models } from "@rematch/core";
import { currentUser } from '../pages/User/models/currentUser';

export interface RootModel extends Models<RootModel> {
  currentUser: typeof currentUser;
}
export const models: RootModel = {
  currentUser,
};
