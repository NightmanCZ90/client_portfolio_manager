import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <StyledSignUp>
      <StyledSignUpForm>
        <h1>PORT/FALL.IO</h1>
        <br/>
        <form>
          <TextField
            required
            fullWidth
            id="email-input"
            label="E-mail"
            name="email"
            type="email"
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            id="password-input"
            label="Password"
            type="password"
            name="password"
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            id="confirm-password-input"
            label="Confirm password"
            type="password"
            name="confirmPassword"
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
