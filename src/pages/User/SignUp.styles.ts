import { Card } from '@mui/material';
import { styled } from '@mui/system';

export const StyledSignUp = styled('div')`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    width: 20rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .signup-form--buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 2rem;
    }
  }
`;

export const StyledSignUpForm = styled(Card)`
  padding: 3rem 5rem;
`;
