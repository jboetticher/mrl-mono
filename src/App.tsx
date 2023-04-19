import React, { useState, useEffect } from "react";
import { CHAINS, transferFromEthNative } from "@certusone/wormhole-sdk";
import { Container, Typography, Button, FormControl, Box, Card, CardContent, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import createMRLPayload, { MOONBEAM_ROUTED_LIQUIDITY_PRECOMPILE, Parachain, ETHEREUM_ACCOUNT_PARACHAINS } from "./MoonbeamRoutedLiquidityPayloads";
import { FantomTestnet, useEtherBalance, useEthers } from '@usedapp/core'
import { formatEther, parseEther } from '@ethersproject/units'
import { providers } from 'ethers'

enum Tokens {
  FTM,
  USDC
}

export default function () {
  const { account, library, chainId } = useEthers();
  const etherBalance = useEtherBalance(account)
  const [selectedNetwork, setSelectedNetwork] = useState(Parachain.MoonbaseBeta);
  const [selectedToken, setSelectedToken] = useState<Tokens>(Tokens.FTM);
  const [acc32, setAcc32] = useState(""); // TODO: input for Polkadot account

  const ParachainEntries = Object.entries(Parachain);
  const isEthereumStyledParachain = (x: Parachain) => ETHEREUM_ACCOUNT_PARACHAINS.includes(x);

  async function handleXCMTransfer() {
    if (account == undefined) {
      alert("No account connected!");
      return;
    }
    const l = library as providers.JsonRpcProvider;

    // Create the payload that we will send over
    let payload = createMRLPayload(selectedNetwork, isEthereumStyledParachain(selectedNetwork) ? account : acc32);

    // Transfer with payload
    transferFromEthNative(
      "0x599CEa2204B4FaECd584Ab1F2b6aCA137a0afbE8",
      l.getSigner(),
      parseEther("1"),
      CHAINS.moonbeam,
      MOONBEAM_ROUTED_LIQUIDITY_PRECOMPILE,
      0, // relayerFee, doesn't matter because it's contract controlled
      undefined,
      payload
    );
  }

  function SendTokensForm() {
    return (
      <Box>
        <FormControl fullWidth variant="outlined" style={{ marginBottom: 12 }}>
          <InputLabel htmlFor="network">Select a Network</InputLabel>
          <Select
            value={selectedNetwork}
            onChange={(e: SelectChangeEvent<Parachain>) => setSelectedNetwork(e.target.value as Parachain)}
            label="Select a Network"
            inputProps={{ name: "network", id: "network" }}
          >
            {ParachainEntries.filter(x => isNaN(parseInt(x[0]))).map(x => (
              <MenuItem key={x[0]} value={x[1]}>
                {x[0]} ({ETHEREUM_ACCOUNT_PARACHAINS.includes(x[1] as Parachain) ? 'AccountKey20' : 'AccountId32'})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined" style={{ marginBottom: 12 }}>
          <InputLabel htmlFor="token">Select a Token</InputLabel>
          <Select
            value={selectedToken}
            onChange={(e: SelectChangeEvent<Tokens>) => setSelectedToken(e.target.value as Tokens)}
            label="Select a Token"
            inputProps={{ name: "token", id: "token" }}
          >
            {Object.entries(Tokens)
              .filter(([key, value]) => isNaN(Number(key)))
              .map(([key, value]) => (
                <MenuItem key={key} value={value}>
                  {key}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card style={{ width: '100%', borderRadius: 15, overflow: 'hidden' }}>
        <CardContent>
          <Typography variant="h4" gutterBottom textAlign='center'>
            Wormhole Network Selector
          </Typography>
          <Typography variant="h6" gutterBottom textAlign='center'>
            Transfer 0.1 {Tokens[selectedToken]} from <b>Fantom Testnet</b> ► Moonbase Alpha ► {ParachainEntries.find(([k, v]) => v === selectedNetwork)?.[0]}
          </Typography>
          <SendTokensForm />
          {etherBalance && (
            <Box display="flex" justifyContent="center" alignItems="center">
              <Button variant="contained" onClick={handleXCMTransfer}>
                Click to Transfer
              </Button>
            </Box>
          )}
          {chainId != FantomTestnet.chainId && <p>Ensure that you are connected to the Fantom Testnet.</p>}
          <ConnectButton />
        </CardContent>
      </Card>
    </Container>
  );

};

const ConnectButton = () => {
  const { account, deactivate, activateBrowserWallet, switchNetwork, chainId } = useEthers()

  const style: React.CSSProperties = { position: 'absolute', top: 40, right: 40 };

  useEffect(() => {
    if (chainId && chainId != FantomTestnet.chainId) switchNetwork(FantomTestnet.chainId);
    alert('awooga')
  }, [chainId]);

  // Connecting to the wallet
  const handleWalletConnection = () => {
    if (account) deactivate();
    else activateBrowserWallet();
  };

  return (
    <Box position="absolute" top={20} right={24}>
      <Button variant="contained" onClick={handleWalletConnection}>
        {account ? `Disconnect ${account.substring(0, 5) + '...'}` : 'Connect Wallet'}
      </Button>
    </Box>
  );
}

