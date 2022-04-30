import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f9ba48',
      light: '#f7dcaa',
      dark: '#f08f18',
    },
    background: {
      paper: '#3A3A3E',
      default: '#232325',
    }
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiAccordionSummary: {
      styleOverrides: {
        content: {
          margin: '1rem 0'
        },
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 2,
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          color: '#fff',
          colorScheme: 'dark',
        }
      }
    }
  }
});
