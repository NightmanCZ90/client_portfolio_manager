import { Button, ToggleButton } from '@mui/material';
import { styled } from '@mui/system';

export const PrimaryButton = styled(Button)(({ theme }) => ({
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
  ":disabled": {
    background: theme.palette.grey['600'],
  },
}));

export const SecondaryButton = styled(Button)(({ theme, size }) => ({
  background: theme.palette.grey['700'],
  color: theme.palette.common.white,
  padding: size === 'large' ? '0.9rem 2rem' : '0.5rem 2rem',
  ".MuiTouchRipple-child": {
    color: theme.palette.grey['800'],
  },
  ":hover": {
    background: theme.palette.grey['600'],
  },
}));

export const SmallLinkButton = styled(Button)(({ theme }) => ({
  fontSize: '11px',
}));

export const CustomToggleButton = styled(ToggleButton)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: '#232325',
    ":hover": {
      background: theme.palette.primary.light,
    },
    ".MuiTouchRipple-child": {
      color: theme.palette.primary.dark,
    },
  },
}));
