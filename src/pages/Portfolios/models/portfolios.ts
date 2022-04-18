import { createModel } from "@rematch/core";

import { RootModel } from "../../../store";
import RestApiClient from '../../../services/RestApiClient';
import { Portfolio, PortfolioTypes } from '../../../types/portfolio';

interface PortfoliosState {
  error: string;
  loading: boolean;
  managed: Portfolio[];
  managing: Portfolio[];
  personal: Portfolio[];
  unconfirmed: Portfolio[];
  investorCheckError: string;
  investorCheckLoading: boolean;
  investorId: number | null;
}

export const portfolios = createModel<RootModel>()({
  state: {
    error: '',
    loading: false,
    managed: [],
    managing: [],
    personal: [],
    unconfirmed: [],
    investorCheckError: '',
    investorCheckLoading: false,
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
    async getPortfolios() {
      const { setError, setLoading, setPortfolios } = dispatch.portfolios;

      /** Reset */
      setError('');
      setLoading(true);

      try {
        const data = await RestApiClient.getUsersPortfolios();
        if (data) {
          setPortfolios({
            managed: data.managed.filter(portfolio => portfolio.confirmed),
            managing: data.managing,
            personal: data.personal,
            unconfirmed: data.managed.filter(portfolio => !portfolio.confirmed),
          });
        }
      } catch (error: any) {
        if (error) {
          error.message && setError(error.message);
          error.data && error.data?.length > 0 && setError(error.data[0]?.msg);
        }
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

      try {
        const data = await RestApiClient.confirmInvestor(investorEmail);
        if (data) {
          setInvestorId(data.id);
        }
      } catch (error: any) {
        if (error) {
          error.message && setInvestorCheckError(error.message);
          error.data && error.data?.length > 0 && setInvestorCheckError(error.data[0]?.msg);
        }
      }
      setInvestorCheckLoading(false);
    },

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

    async confirmPortfolio(payload: { portfolioId: number }, state) {
      const { setError, setLoading, setPortfolios } = dispatch.portfolios;
      const { managed, managing, personal, unconfirmed } = state.portfolios;

      /** Reset */
      setError('');
      setLoading(true);

      try {
        const data = await RestApiClient.confirmPortfolio(payload.portfolioId);
        if (data) {
          setPortfolios({
            managed: [...managed, data],
            managing,
            personal,
            unconfirmed: unconfirmed.filter(portfolio => portfolio.id !== payload.portfolioId),
          });
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

export const splitPortfolios = (data: PortfolioTypes) => ({
    managed: data.managed.filter(portfolio => portfolio.confirmed),
    managing: data.managing,
    personal: data.personal,
    unconfirmed: data.managed.filter(portfolio => !portfolio.confirmed),
  }
);
