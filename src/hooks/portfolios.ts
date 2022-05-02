import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { QueryKeys } from '../constants/queryKeys'
import { RestApiError } from '../services/ApiClient'
import RestApiClient from '../services/RestApiClient'
import { Dispatch, RootState } from '../store/store'
import { Portfolio, PortfolioOwnership, PortfolioPageTypes, PortfolioTypes } from '../types/portfolio'

export const usePortfolios = () => {
  const currentUser = useSelector((state: RootState) => state.currentUser);

  return useQuery<PortfolioTypes, RestApiError, PortfolioPageTypes>(QueryKeys.Portfolios, () => RestApiClient.getUsersPortfolios(), {
    onError: (err) => { console.dir(err) },
    select: (data) => {
      return splitPortfolios(data);
    },
    enabled: !!currentUser.token,
  })
}

export const usePortfolio = (portfolioId: number) => {
  const queryClient = useQueryClient();

  return useQuery<Portfolio, RestApiError>([QueryKeys.PortfolioDetail, portfolioId], () => RestApiClient.getPortfolio(portfolioId), {
    initialData: () => {
      const portfolios = queryClient.getQueryData<PortfolioPageTypes>(QueryKeys.Portfolios);
      if (!portfolios) return undefined;

      return findPortfolio(portfolioId, portfolios)?.portfolio;
    },
  });
}

export const useLinkPortfolio = (portfolioId: number) => {
  const { refetch } = usePortfolio(portfolioId);

  return useMutation<Portfolio, RestApiError, { portfolioId: number, email: string }>(({ portfolioId, email }) => {
    return RestApiClient.linkPortfolio(portfolioId, { email });
  }, {
    onSuccess: () => {
      refetch();
    }
  })
}

export const useUnlinkPortfolio = (portfolioId: number) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { refetch } = usePortfolio(portfolioId);
  const currentUser = useSelector((state: RootState) => state.currentUser);

  return useMutation<Portfolio, RestApiError>(() => {
    return RestApiClient.unlinkPortfolio(portfolioId);
  }, {
    onSuccess: (data) => {
      if (currentUser?.user?.id !== data.userId) {

        let portfolios = queryClient.getQueryData<PortfolioPageTypes>(QueryKeys.Portfolios);
        if (portfolios) {
          portfolios = removePortfolioFromPortfolios(data.id, portfolios)
        }

        queryClient.setQueryData(QueryKeys.Portfolios, portfolios);

        navigate('/portfolios');
      } else {
        refetch();
      }
    }
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

export const useUpdatePortfolio = () => {
  const queryClient = useQueryClient();

  return useMutation<Portfolio, RestApiError, { portfolioId: number, name: string, description: string, color: string, url: string }>((portfolioData) => {
    return RestApiClient.updatePortfolio(portfolioData.portfolioId, { ...portfolioData });
  }, {
    onSuccess: (data) => {
      queryClient.setQueryData([QueryKeys.PortfolioDetail, data.id], data);
    },
  })
}

/**
 * Helper functions
 */

const splitPortfolios = (data: PortfolioTypes) => ({
  managed: data.managed.filter(portfolio => portfolio.confirmed),
  managing: data.managing,
  personal: data.personal,
  unconfirmed: data.managed.filter(portfolio => !portfolio.confirmed),
});

const findPortfolio = (portfolioId: number, portfolios: PortfolioPageTypes): { ownership: PortfolioOwnership, portfolio: Portfolio } | null => {
  if (!portfolios) return null;

  const ownerships = Object.keys(portfolios) as PortfolioOwnership[];

  let foundPortfolio = null;
  ownerships.forEach((ownership) => {
    const portfolio = portfolios[ownership].find((portfolio: Portfolio) => portfolio.id === portfolioId);
    if (portfolio) {
      foundPortfolio = { ownership, portfolio };
    }
  })

  return foundPortfolio;
}

const removePortfolioFromPortfolios = (portfolioId: number, portfolios: PortfolioPageTypes): PortfolioPageTypes => {

  const portfolio = findPortfolio(portfolioId, portfolios);

  if (portfolio) {
    const filteredPortfolios = portfolios[portfolio.ownership].filter(p => p.id !== portfolioId)
    return {
      ...portfolios,
      [portfolio.ownership]: filteredPortfolios,
    }
  }

  return portfolios;
}
