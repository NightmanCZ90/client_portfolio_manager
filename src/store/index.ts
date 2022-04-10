import { Models } from "@rematch/core";
import { portfolios } from '../pages/Portfolios/models/portfolios';
import { currentUser } from '../pages/User/models/currentUser';

export interface RootModel extends Models<RootModel> {
  currentUser: typeof currentUser;
  portfolios: typeof portfolios;
}
export const models: RootModel = {
  currentUser,
  portfolios,
};
