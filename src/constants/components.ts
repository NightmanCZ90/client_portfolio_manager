import { Button } from '@mui/material';
import { styled } from '@mui/system';

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
