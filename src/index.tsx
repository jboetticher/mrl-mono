import React from 'react';
import ReactDOM from "react-dom";
import './index.css';
import App from './App';
import { Config, DAppProvider, FantomTestnet, Mainnet } from '@usedapp/core';
import { getDefaultProvider } from 'ethers';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: 'Open Sans'
  },
  palette: {
    primary: {
      main: 'rgb(100, 208, 206)'
    },
    secondary: {
      main: 'rgb(225, 20, 123)'
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(37, 38, 43)',
          color: '#C1C2C5'
        },
      }
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginBottom: '2rem'
        }
      }
    }
  }
});

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [FantomTestnet.chainId]: getDefaultProvider("https://fantom-testnet.blastapi.io/adafb88b-6012-4705-8aed-eeabbeed35da"),
  },
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <img src='moonbeam-bg.webp' className='bg-img' />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);
