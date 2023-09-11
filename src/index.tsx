import React from 'react';
import ReactDOM from "react-dom";
import './index.css';
import App from './App';
import { Config, DAppProvider, FantomTestnet, Mainnet, MoonbaseAlpha } from '@usedapp/core';
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
    },
    text: {
      primary: '#C1C2C5'
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(37, 38, 43)',
          // color: '#C1C2C5'
        },
      }
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginBottom: '2rem'
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#C1C2C5',
          fontWeight: 700
        }
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 'bold'
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(100, 208, 206, 0.12)', 
          marginBottom: '1rem'
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          // Change color of the label
          color: '#C1C2C5',
          "&.Mui-disabled": {
            color: '#85878c', // Change to your desired color for disabled label
          }
        },
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& $notchedOutline': {
            borderColor: '#C1C2C5', // Change border color
          }
        },
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#C1C2C5',
        },
        input: {
          "&.MuiOutlinedInput-input.Mui-disabled": {
            opacity: 1,
            WebkitTextFillColor: '#85878c', // Change to your desired color for disabled input text
          },
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          "&.MuiInputBase-input.MuiOutlinedInput-input.Mui-disabled": {
            opacity: 1,
            WebkitTextFillColor: '#85878c', // Change to your desired color for disabled input text
          },
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: 'rgb(37, 38, 43)'
        }
      }
    }
  }
});

const config: Config = {
  readOnlyChainId: MoonbaseAlpha.chainId,
  readOnlyUrls: {
    [FantomTestnet.chainId]: getDefaultProvider("https://fantom-testnet.blastapi.io/adafb88b-6012-4705-8aed-eeabbeed35da"),
    [MoonbaseAlpha.chainId]: getDefaultProvider()
  },
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <img src='moonbeam-bg.webp' alt="moonbeam nebulous background" className='bg-img' />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);
