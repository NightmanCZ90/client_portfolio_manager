import { Button, Card } from '@mui/material';
import { green } from '@mui/material/colors';
import { color, styled } from '@mui/system';

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
    gap: 2rem;

    div {
      display: flex;
      justify-content: space-between;
    }
  }
`;

export const StyledSignUpForm = styled(Card)`
  padding: 3rem 5rem;
`;

export const SubmitButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: '#151517',
  padding: '0.5rem 2rem',
  ".MuiTouchRipple-child": {
    color: theme.palette.primary.dark,
  },
  ":hover": {
    background: theme.palette.primary.light,
  },
}));
