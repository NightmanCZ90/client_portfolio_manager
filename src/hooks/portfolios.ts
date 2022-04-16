import { useQuery } from 'react-query'
import { QueryKeys } from '../constants/queryKeys'
import { splitPortfolios } from '../pages/Portfolios/models/portfolios'
import { RestApiError } from '../services/ApiClient'
import RestApiClient from '../services/RestApiClient'
import { PortfolioPageTypes, PortfolioTypes } from '../types/portfolio'

export const usePortfolios = () => {
  return useQuery<PortfolioTypes, RestApiError, PortfolioPageTypes>(QueryKeys.Portfolios, () => RestApiClient.getUsersPortfolios(), {
    onError: (err) => { console.dir(err) },
    select: (data) => splitPortfolios(data),
  })
}
