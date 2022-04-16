import { CircularProgress, TextField } from '@mui/material';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { SmallLinkButton, SubmitButton } from '../../constants/components';
import { useSignIn } from '../../hooks/auth';
import { Dispatch, RootState } from '../../store/store';
import { StyledSignIn, StyledSignInForm } from './SignIn.styles';

export type SignInFormData = {
  email: string;
  password: string;
}

const initialFormData = {
  email: '',
  password: '',
}

interface SignInProps extends SignInConnect {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignIn: React.FC<SignInProps> = (props) => {
  const [formData, setFormData] = useState<SignInFormData>(initialFormData);
  const { mutate: signIn, isLoading, isError, error } = useSignIn();

  const { setShowLogin } = props;

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    signIn(formData);
  }

  return (
    <StyledSignIn>
      <StyledSignInForm>
        <h1>port/fall.io</h1>
        <br/>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            id="email-input"
            label="E-mail"
            name="email"
            error={!Boolean(formData.email)}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            id="password-input"
            label="Password"
            type="password"
            name="password"
            error={!Boolean(formData.password)}
            onChange={handleChange}
          />
          <div className="signin-form--button">
            <SubmitButton
              type="submit"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? (<CircularProgress size={24} />) : "Sign in"}
            </SubmitButton>
          </div>
          {isError && <span>{error.message}</span>}
          <div className="signin-form--buttons">
            <SmallLinkButton onClick={() => setShowLogin(false)}>
              Create new account
            </SmallLinkButton>
            <SmallLinkButton>Forgot Password?</SmallLinkButton>
          </div>
        </form>
      </StyledSignInForm>
    </StyledSignIn>
  )
}

type SignInConnect = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const mapState = (state: RootState) => ({

});

const mapDispatch = (dispatch: Dispatch) => ({

});

export default connect(mapState, mapDispatch)(SignIn);
