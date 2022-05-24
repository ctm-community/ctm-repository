import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    //type: 'dark',   
    primary: {
      main: '#203864',
    },
    secondary:
    {
      main: '#FBC02D',
    },
  },
  shape: {
    borderRadius: 0
  }
});

export default theme;
