import { Card } from '@mui/material';
import { styled } from '@mui/system';

export const StyledSignIn = styled('div')`
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

    .signin-form--button {
      display: flex;
      margin-top: 2rem;
    }

    .signin-form--buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 2rem;
    }
  }
`;

export const StyledSignInForm = styled(Card)`
  padding: 3rem 5rem;
`;
