import { useMutation, useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { QueryKeys } from '../constants/queryKeys'
import { RestApiError } from '../services/ApiClient'
import RestApiClient from '../services/RestApiClient'
import { Dispatch, RootState } from '../store/store'
import { Portfolio, PortfolioPageTypes, PortfolioTypes } from '../types/portfolio'

export const usePortfolios = () => {
  const currentUser = useSelector((state: RootState) => state.currentUser);

  return useQuery<PortfolioTypes, RestApiError, PortfolioPageTypes>(QueryKeys.Portfolios, () => RestApiClient.getUsersPortfolios(), {
    onError: (err) => { console.dir(err) },
    select: (data) => splitPortfolios(data),
    enabled: !!currentUser.token,
  })
}

export const useConfirmPortfolio = () => {
  const { refetch } = usePortfolios();

  return useMutation<Portfolio, RestApiError, number>((portfolioId) => {
    return RestApiClient.confirmPortfolio(portfolioId);
  }, {
    onSuccess: () => {
      refetch();
    }
  })
}

export const useCheckInvestor = () => {
  const dispatch = useDispatch<Dispatch>();

  return useMutation<{ id: number }, RestApiError, string>((investorEmail) => {
    dispatch.portfolios.setInvestorId(null);
    dispatch.portfolios.setInvestorCheckError('');
    return RestApiClient.confirmInvestor(investorEmail);
  }, {
    onSuccess: ({ id }) => {
      dispatch.portfolios.setInvestorId(id);
    },
    onError: (error) => {
      dispatch.portfolios.setInvestorCheckError(error.message);
    }
  })
}

export const useCreatePortfolio = () => {
  const navigate = useNavigate();

  return useMutation<Portfolio, RestApiError, { name: string, description: string, color: string, url: string, investorId: number | null }>((portfolioData) => {
    return RestApiClient.createPortfolio(portfolioData);
  }, {
    onSuccess: () => {
      navigate('/portfolios');
    },
  })
}

/**
 * Helper functions
 *
 */

const splitPortfolios = (data: PortfolioTypes) => ({
  managed: data.managed.filter(portfolio => portfolio.confirmed),
  managing: data.managing,
  personal: data.personal,
  unconfirmed: data.managed.filter(portfolio => !portfolio.confirmed),
});
