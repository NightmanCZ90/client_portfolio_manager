import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Dispatch, RootState } from '../store/store'

export function useBootstrap() {
  const dispatch = useDispatch<Dispatch>();
  const currentUser = useSelector((state: RootState) => state.currentUser);

  const { token } = currentUser;
  useEffect(() => {
    token?.accessToken && dispatch.currentUser.getCurrentUser(token?.accessToken);
  }, [token])
}

