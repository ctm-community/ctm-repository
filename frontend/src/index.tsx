import { ThemeProvider } from '@mui/material/styles';
import App from 'App';
import 'index.scss';
import React from 'react';
import ReactDOMClient from 'react-dom/client';
import theme from 'theme';


const rootContainer = document.getElementById('root');
if (!rootContainer) {
  throw new Error("Missing root container element");
}

// Main render function
export const root = ReactDOMClient.createRoot(rootContainer);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

