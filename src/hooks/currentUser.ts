import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { QueryKeys } from '../constants/queryKeys'
import { RestApiError } from '../services/ApiClient'
import RestApiClient from '../services/RestApiClient'
import { Dispatch, RootState } from '../store/store'
import { User } from '../types/user'

export const useCurrentUser = () => {
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const dispatch = useDispatch<Dispatch>();
  return useQuery<User, RestApiError>(QueryKeys.CurrentUser, () => RestApiClient.getCurrentUser(), {
    enabled: !!currentUser.token,
    onSuccess: (data) => {
      if (data) {
        dispatch.currentUser.setUser(data);
      }
    }
  })
}

export const useUpdateCurrentUser = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<Dispatch>();

  return useMutation<User, RestApiError, User>((formData) => {
    const { id, firstName, lastName, role } = formData;
    const body = {
      firstName,
      lastName,
      role,
    }
    return RestApiClient.updateUser(id, body);
  }, {
    onSuccess: (data) => {
      if (data) {
        queryClient.setQueryData(QueryKeys.CurrentUser, data);
        dispatch.currentUser.setUser(data);
      }
    }
  })
}
