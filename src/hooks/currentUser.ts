import { useQuery } from 'react-query'
import { QueryKeys } from '../constants/queryKeys'
import { RestApiError } from '../services/ApiClient'
import RestApiClient from '../services/RestApiClient'
import { User } from '../types/user'

export const useCurrentUser = () => {
  return useQuery<User, RestApiError>(QueryKeys.CurrentUser, () => RestApiClient.getCurrentUser())
}
