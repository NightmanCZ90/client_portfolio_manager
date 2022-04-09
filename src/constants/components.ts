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

export const PrimaryButton = styled(Button)(({ theme }) => ({
  background: theme.palette.grey['800'],
  color: theme.palette.common.white,
  padding: '0.5rem 2rem',
  ".MuiTouchRipple-child": {
    color: theme.palette.grey['800'],
  },
  ":hover": {
    background: theme.palette.grey['700'],
  },
}));

export const SmallLinkButton = styled(Button)(({ theme }) => ({
  fontSize: '11px',
}));
