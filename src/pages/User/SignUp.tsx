import { CircularProgress, TextField } from '@mui/material';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { userRegistrationFormSchema } from '../../constants/validations';
import { SmallLinkButton, PrimaryButton } from '../../constants/components';
import { Dispatch, RootState } from '../../store/store';
import { StyledSignUp, StyledSignUpForm } from './SignUp.styles';
import { useSignUp } from '../../hooks/auth';

export type SignUpFormData = {
  email: string;
  password: string;
  confirmPassword: string;
}

const initialFormData = {
  email: '',
  password: '',
  confirmPassword: '',
}

interface SignUpProps extends SignUpConnect {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp: React.FC<SignUpProps> = (props) => {
  const [formData, setFormData] = useState<SignUpFormData>(initialFormData);
  const [formDataErrors, setFormDataErrors] = useState<SignUpFormData>(initialFormData);
  const { mutate: signUp, isLoading, isError, error } = useSignUp();

  const { setShowLogin } = props;

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    await userRegistrationFormSchema(event.target.name).validate({[event.target.name]: event.target.value})
      .then((value) => {
        setFormDataErrors({ ...formDataErrors, [event.target.name]: ''});
      })
      .catch((err) => {
        setFormDataErrors({ ...formDataErrors, [event.target.name]: err.message});
      });

    if (event.target.name === 'confirmPassword' && formData.password === event.target.value) {
      setFormDataErrors({ ...formDataErrors, [event.target.name]: ''});
    }

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  const { email, password, confirmPassword } = formDataErrors;
  const isFormDataInvalid = Boolean(email) || Boolean(password) || Boolean(confirmPassword);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (isFormDataInvalid) return;

    signUp(formData);
  }

  return (
    <StyledSignUp>
      <StyledSignUpForm>
        <h1>port/fall.io</h1>
        <br/>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            id="email-input"
            label="E-mail"
            name="email"
            error={Boolean(formDataErrors.email)}
            helperText={formDataErrors.email}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            id="password-input"
            label="Password"
            type="password"
            name="password"
            error={Boolean(formDataErrors.password)}
            helperText={formDataErrors.password}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            id="confirm-password-input"
            label="Confirm password"
            type="password"
            name="confirmPassword"
            error={Boolean(formDataErrors.confirmPassword)}
            helperText={formDataErrors.confirmPassword}
            onChange={handleChange}
          />
          <div className="signup-form--buttons">
            <SmallLinkButton onClick={() => setShowLogin(true)}>
              Already have an account?
            </SmallLinkButton>
            <PrimaryButton
              type="submit"
              disabled={isFormDataInvalid || isLoading}
            >
              {isLoading ? (<CircularProgress size={24} />) : "Sign up"}
            </PrimaryButton>
          </div>
          {isError && <span>{error.message}</span>}
        </form>
      </StyledSignUpForm>
    </StyledSignUp>
  )
}

type SignUpConnect = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const mapState = (state: RootState) => ({

});

const mapDispatch = (dispatch: Dispatch) => ({

});

export default connect(mapState, mapDispatch)(SignUp);
