import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { userRegistrationFormSchema } from '../../constants/validations';
import { StyledSignUp, StyledSignUpForm, SubmitButton } from './SignUp.styles';

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
}

const initialFormData = {
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formDataErrors, setFormDataErrors] = useState<FormData>(initialFormData);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    userRegistrationFormSchema(event.target.name).validate({[event.target.name]: event.target.value}).catch((err) => {
      setFormDataErrors({ ...formDataErrors, [event.target.name]: err.message});
    });

    await userRegistrationFormSchema(event.target.name).isValid({[event.target.name]: event.target.value}).then((valid) => {
      if (valid) setFormDataErrors({ ...formDataErrors, [event.target.name]: ''});
    });

    if (event.target.name === 'confirmPassword' && formData.password === event.target.value) {
      setFormDataErrors({ ...formDataErrors, [event.target.name]: ''});
    }

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <StyledSignUp>
      <StyledSignUpForm>
        <h1>port/fall.io</h1>
        <br/>
        <form>
          <TextField
            required
            fullWidth
            id="email-input"
            label="E-mail"
            name="email"
            // type="email"
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
          <div>
            <Button>Forgot Password?</Button>
            <SubmitButton type="submit">Sign Up</SubmitButton>
          </div>
        </form>
      </StyledSignUpForm>
    </StyledSignUp>
  )
}

export default SignUp;
