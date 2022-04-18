import { useDispatch, useSelector } from 'react-redux';
import axios from '../services/axios';
import { Dispatch, RootState } from '../store/store';
import { useSignOut } from './auth';

const useRefreshToken = () => {
  const { signout } = useSignOut();

  const dispatch = useDispatch<Dispatch>();
  const currentUser = useSelector((state: RootState) => state.currentUser);

  const refresh = async () => {
    try {
      const response = await axios.post('/refresh', { email: currentUser.user?.email, refreshToken: currentUser.token?.refreshToken });

      if (response?.data) {
        const { accessToken } = response.data;

        if (currentUser.token) dispatch.currentUser.setToken({ ...currentUser.token, accessToken });
      }
      return response?.data?.accessToken;
    } catch (err) {
      signout();
    }
  }
  return refresh;
}

export default useRefreshToken;
