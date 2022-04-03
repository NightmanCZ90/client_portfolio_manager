import { CircularProgress, TextField } from '@mui/material';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { SmallLinkButton, SubmitButton } from '../../constants/components';
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

  const { error, loading, setShowLogin, signIn } = props;

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    await signIn(formData);
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
            <SubmitButton type="submit" fullWidth>
              {loading ? (<CircularProgress size={24} />) : "Sign in"}
            </SubmitButton>
          </div>
          {error && <span>{error}</span>}
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
  error: state.currentUser.error,
  loading: state.currentUser.loading,
});

const mapDispatch = (dispatch: Dispatch) => ({
  signIn: dispatch.currentUser.signIn,
});

export default connect(mapState, mapDispatch)(SignIn);
