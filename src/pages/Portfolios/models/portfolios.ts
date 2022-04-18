import { createModel } from "@rematch/core";

import { RootModel } from "../../../store";
import RestApiClient from '../../../services/RestApiClient';
import { Portfolio } from '../../../types/portfolio';

interface PortfoliosState {
  error: string;
  loading: boolean;
  investorCheckError: string;
  investorId: number | null;
}

export const portfolios = createModel<RootModel>()({
  state: {
    error: '',
    loading: false,
    investorCheckError: '',
    investorId: null,
  } as PortfoliosState,
  reducers: {
    setError: (state, error: string) => ({ ...state, error }),
    setLoading: (state, loading: boolean) => ({ ...state, loading }),
    setPortfolios: (state, portfolios: { managed: Portfolio[], managing: Portfolio[], personal: Portfolio[], unconfirmed: Portfolio[] }) => ({
      ...state,
      managed: portfolios.managed,
      managing: portfolios.managing,
      personal: portfolios.personal,
      unconfirmed: portfolios.unconfirmed,
    }),
    setInvestorCheckError: (state, investorCheckError: string) => ({ ...state, investorCheckError }),
    setInvestorCheckLoading: (state, investorCheckLoading: boolean) => ({ ...state, investorCheckLoading }),
    setInvestorId: (state, investorId: number | null) => ({ ...state, investorId }),
  },
  effects: (dispatch) => ({

    async createPortfolio(payload: { name: string, description: string, color: string, url: string, investorId: number | null }, state) {
      const { setError, setLoading } = dispatch.portfolios;

      /** Reset */
      setError('');
      setLoading(true);

      try {
        const data = await RestApiClient.createPortfolio(payload);
        if (data) {
          setLoading(false);
          return data;
        }
      } catch (error: any) {
        if (error) {
          error.statusText && setError(error.statusText);
          error.data && error.data?.length > 0 && setError(error.data[0]?.msg);
          error.message && setError(error.message);
          setLoading(false);
          return null;
        }
      }
    },
  }),
});
