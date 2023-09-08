import { Box, Button } from "@mui/material";
import { FantomTestnet, useEthers } from "@usedapp/core";
import { useEffect } from "react";

export const AddNetworkButton = () => {
  const { switchNetwork, chainId } = useEthers()

  useEffect(() => {
    if (chainId && chainId !== FantomTestnet.chainId) { switchNetwork(FantomTestnet.chainId); }
  }, [chainId, switchNetwork]);

  if (chainId !== FantomTestnet.chainId) return (
    <Box position="absolute" top={20} right={'16rem'}>
      <Button variant="contained" onClick={() => switchNetwork(FantomTestnet.chainId)}>
        Switch to Fantom
      </Button>
    </Box>
  )
  else return (
    <Box position="absolute" top={20} right={'16rem'}>
      <Button variant="contained" onClick={() => window.open('https://faucet.fantom.network/', '_blank')}>
        Go to Faucet
      </Button>
    </Box>
  );
}

export const ConnectButton = () => {
  const { account, deactivate, activateBrowserWallet } = useEthers()

  // Connecting to the wallet
  const handleWalletConnection = () => {
    if (account) deactivate();
    else activateBrowserWallet();
  };

  return (
    <Box position="absolute" top={20} right={'4rem'}>
      <Button variant="contained" onClick={handleWalletConnection}>
        {account ? `Disconnect ${account.substring(0, 5) + '...'}` : 'Connect Wallet'}
      </Button>
    </Box>
  );
}