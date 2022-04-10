import { createModel } from "@rematch/core";

import { RootModel } from "../../../store";
import RestApiClient from '../../../services/rest_api_client';
import { Portfolio } from '../../../types/portfolio';

interface PortfoliosState {
  error: string;
  loading: boolean;
  personal: Portfolio[];
  managed: Portfolio[];
  investorCheckError: string;
  investorCheckLoading: boolean;
  investorId: number | null;
}

export const portfolios = createModel<RootModel>()({
  state: {
    error: '',
    loading: false,
    personal: [],
    managed: [],
    investorCheckError: '',
    investorCheckLoading: false,
    investorId: null,
  } as PortfoliosState,
  reducers: {
    setError: (state, error: string) => ({ ...state, error }),
    setLoading: (state, loading: boolean) => ({ ...state, loading }),
    setPortfolios: (state, portfolios: { personal: Portfolio[], managed: Portfolio[] }) => ({
      ...state,
      personal: portfolios.personal,
      managed: portfolios.managed,
    }),
    setInvestorCheckError: (state, investorCheckError: string) => ({ ...state, investorCheckError }),
    setInvestorCheckLoading: (state, investorCheckLoading: boolean) => ({ ...state, investorCheckLoading }),
    setInvestorId: (state, investorId: number | null) => ({ ...state, investorId }),
  },
  effects: (dispatch) => ({
    async getPortfolios() {
      const { setError, setLoading, setPortfolios } = dispatch.portfolios;

      /** Reset */
      setError('');
      setLoading(true);

      const { data, error } = await RestApiClient.getUsersPortfolios();
      if (data) {
        setPortfolios(data);
      }
      if (error) {
        error.message && setError(error.message);
        error.data && error.data?.length > 0 && setError(error.data[0]?.msg);
      }
      setLoading(false);
    },

    async checkInvestor(payload: { investorEmail: string }, state) {
      const { investorEmail } = payload;
      const { setInvestorCheckError, setInvestorCheckLoading, setInvestorId } = dispatch.portfolios;

      /** Reset */
      setInvestorCheckError('');
      setInvestorCheckLoading(true);
      setInvestorId(null);

      const { data, error } = await RestApiClient.confirmInvestor(investorEmail);
      if (data) {
        setInvestorId(data.id);
      }
      if (error) {
        error.message && setInvestorCheckError(error.message);
        error.data && error.data?.length > 0 && setInvestorCheckError(error.data[0]?.msg);
      }
      setInvestorCheckLoading(false);
    }
  }),
});
