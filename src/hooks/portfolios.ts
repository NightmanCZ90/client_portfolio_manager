import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { QueryKeys } from '../constants/queryKeys'
import { splitPortfolios } from '../pages/Portfolios/models/portfolios'
import { RestApiError } from '../services/ApiClient'
import RestApiClient from '../services/RestApiClient'
import { RootState } from '../store/store'
import { PortfolioPageTypes, PortfolioTypes } from '../types/portfolio'

export const usePortfolios = () => {
  const currentUser = useSelector((state: RootState) => state.currentUser);

  return useQuery<PortfolioTypes, RestApiError, PortfolioPageTypes>(QueryKeys.Portfolios, () => RestApiClient.getUsersPortfolios(), {
    onError: (err) => { console.dir(err) },
    select: (data) => splitPortfolios(data),
    enabled: !!currentUser.token,
  })
}
