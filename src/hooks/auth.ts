import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';

import { SignInFormData } from '../pages/User/SignIn';
import { SignUpFormData } from '../pages/User/SignUp';
import axios from '../services/axios';
import RestApiClient from '../services/RestApiClient';
import { Token } from '../types/user';
import { RestApiError } from '../services/ApiClient';
import { Dispatch } from '../store/store';

const setTokenToLocalStorage = (token: Token) => {
  const { accessToken, refreshToken, expiresIn } = token;
  const tokenData = JSON.stringify({ accessToken, refreshToken, expiresIn });
  localStorage.setItem('jwt_token', tokenData);
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}

export const useSignIn = () => {
  const dispatch = useDispatch<Dispatch>();
  const { setToken } = dispatch.currentUser;

  return useMutation<Token, RestApiError, SignInFormData>((formData) => {
    return RestApiClient.signIn(formData)
  }, {
    onSuccess: (data) => {
      if (data) {
        setTokenToLocalStorage(data);
        setToken(data);
      }
    }
  });
}

export const useSignUp = () => {
  const dispatch = useDispatch<Dispatch>();
  const { setToken } = dispatch.currentUser;

  return useMutation<Token, RestApiError, SignUpFormData>((formData) => {
    return RestApiClient.signUp(formData)
  }, {
    onSuccess: (data) => {
      if (data) {
        setTokenToLocalStorage(data);
        setToken(data);
      }
    }
  });
}

export const useSignOut = () => {
  const dispatch = useDispatch<Dispatch>();
  const { setUser, setToken } = dispatch.currentUser;

  const signout = () => {
    localStorage.removeItem('jwt_token');
    setToken(null);
    setUser(null);
    window.location.reload();
  }
  return {
    signout
  }
}
