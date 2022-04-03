import { Button, Card } from '@mui/material';
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

export const SubmitButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: '#232325',
  padding: '0.5rem 2rem',
  ".MuiCircularProgress-root": {
    color: '#232325',
  },
  ".MuiTouchRipple-child": {
    color: theme.palette.primary.dark,
  },
  ":hover": {
    background: theme.palette.primary.light,
  },
}));
