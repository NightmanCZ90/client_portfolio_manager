import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';

import { Dispatch } from '../store/store'
import { SignInFormData } from '../pages/User/SignIn';
import { SignUpFormData } from '../pages/User/SignUp';
import axios from '../services/axios';
import RestApiClient from '../services/RestApiClient';
import { Token } from '../types/user';
import { RestApiError } from '../services/ApiClient';

export const useSignIn = () => {
  const dispatch = useDispatch<Dispatch>();
  const { setToken, setUser } = dispatch.currentUser;

  return useMutation<Token, RestApiError, SignInFormData>((formData) => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('jwt_token');
    return RestApiClient.signIn(formData)
  }, {
    onSuccess: (data) => {
      if (data) {
        const { accessToken, refreshToken, expiresIn } = data;
        const tokenData = JSON.stringify({ accessToken, refreshToken, expiresIn });
        localStorage.setItem('jwt_token', tokenData);
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        setToken(data);
      }
    }
  });
}

export const useSignUp = () => {
  const dispatch = useDispatch<Dispatch>();
  const { setToken, setUser } = dispatch.currentUser;

  return useMutation<Token, RestApiError, SignUpFormData>((formData) => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('jwt_token');
    return RestApiClient.signUp(formData)
  }, {
    onSuccess: (data) => {
      if (data) {
        const { accessToken, refreshToken, expiresIn } = data;
        const tokenData = JSON.stringify({ accessToken, refreshToken, expiresIn });
        localStorage.setItem('jwt_token', tokenData);
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        setToken(data);
      }
    }
  });
}
