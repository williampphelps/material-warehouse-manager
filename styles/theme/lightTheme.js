import { createTheme } from '@mui/material/styles';
import { red, grey } from '@mui/material/colors';
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({
  typography: {
    fontFamily: [
      '"Saira"',
      'sans-serif',
    ].join(','),
  },
  palette: {
    mode: 'dark',
    primary: red,
    secondary: grey,
  },
});

export default darkTheme;
