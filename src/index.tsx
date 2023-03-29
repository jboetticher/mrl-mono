import React from 'react';
import ReactDOM from "react-dom";
import './index.css';
import App from './App';
import { Config, DAppProvider, FantomTestnet, Mainnet } from '@usedapp/core';
import { getDefaultProvider } from 'ethers';

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [FantomTestnet.chainId]: getDefaultProvider("https://fantom-testnet.blastapi.io/adafb88b-6012-4705-8aed-eeabbeed35da"),
  },
}

const root = ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);
