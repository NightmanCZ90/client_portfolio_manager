import { createModel } from "@rematch/core";

import { RootModel } from "../../../store";

interface PortfoliosState {
  investorCheckError: string;
  investorId: number | null;
}

export const portfolios = createModel<RootModel>()({
  state: {
    investorCheckError: '',
    investorId: null,
  } as PortfoliosState,
  reducers: {
    setInvestorCheckError: (state, investorCheckError: string) => ({ ...state, investorCheckError }),
    setInvestorId: (state, investorId: number | null) => ({ ...state, investorId }),
  },
});
