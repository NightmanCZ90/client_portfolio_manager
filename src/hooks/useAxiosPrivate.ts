import { axiosPrivate } from '../services/axios';
import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const currentUser = useSelector((state: RootState) => state.currentUser);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
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

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => {
        return response
      },
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();

          const savedToken = localStorage.getItem('jwt_token');
          if (savedToken) {
            const parsedToken = JSON.parse(savedToken);
            localStorage.setItem('jwt_token', JSON.stringify({ ...parsedToken, accessToken: newAccessToken }));
          }
          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    )

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    }
  }, [currentUser.token?.accessToken, refresh]);

  return axiosPrivate;
}

export default useAxiosPrivate;
