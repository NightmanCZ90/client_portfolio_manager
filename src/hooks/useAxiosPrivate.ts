import axios from '../services/axios';
import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const currentUser = useSelector((state: RootState) => state.currentUser);

  useEffect(() => {
    const requestIntercept = axios.interceptors.request.use(
      (config) => {
        if (!config.headers?.Authorization) {
          // @ts-ignore
          config.headers.Authorization = `Bearer ${currentUser.token?.accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    )

    const responseIntercept = axios.interceptors.response.use(
      (response) => {
        return response
      },
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(prevRequest);
        }
        return Promise.reject(error);
      }
    )

    return () => {
      axios.interceptors.request.eject(requestIntercept);
      axios.interceptors.response.eject(responseIntercept);
    }
  }, [currentUser.token, refresh]);

  return axios;
}

export default useAxiosPrivate;
