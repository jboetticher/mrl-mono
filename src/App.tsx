import React, { useState, useEffect } from "react";
import { CHAINS, transferFromEth, transferFromEthNative, approveEth } from "@certusone/wormhole-sdk";
import {
  Container, Typography, Button, Box, Card, CardContent,
  FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, TextField
} from "@mui/material";
import createMRLPayload, { MOONBEAM_ROUTED_LIQUIDITY_PRECOMPILE, Parachain, ETHEREUM_ACCOUNT_PARACHAINS } from "./MoonbeamRoutedLiquidityPayloads";
import { FantomTestnet, useEtherBalance, useEthers } from '@usedapp/core'
import { parseEther } from '@ethersproject/units'
import { providers } from 'ethers'
import PolkadotConnector from "./PolkadotConnector";

enum Tokens {
  FTM,
  USDC
}

const FANTOM_TESTNET_TOKEN_BRIDGE = "0x599CEa2204B4FaECd584Ab1F2b6aCA137a0afbE8";
const FANTOM_TESTNET_USDC = "0xDF7928AF5B33F7de592594958D8d6Ff8472Eb407";

export default function App() {
  const { account, library, chainId } = useEthers();
  const etherBalance = useEtherBalance(account)
  const [selectedNetwork, setSelectedNetwork] = useState(Parachain.MoonbaseBeta);
  const [selectedToken, setSelectedToken] = useState<Tokens>(Tokens.FTM);
  const [acc32, setAcc32] = useState("");

  const ParachainEntries = Object.entries(Parachain);
  const isEthereumStyledParachain = (x: Parachain) => ETHEREUM_ACCOUNT_PARACHAINS.includes(x);

  async function handleXCMTransfer() {
    if (account === undefined) {
      alert("No account connected!");
      return;
    }
    const l = library as providers.JsonRpcProvider;

    // Create the payload that we will send over
    let payload = createMRLPayload(selectedNetwork, isEthereumStyledParachain(selectedNetwork) ? account : acc32);

    // Transfer with payload
    switch (selectedToken) {
      case Tokens.FTM:
        transferFromEthNative(
          FANTOM_TESTNET_TOKEN_BRIDGE,
          l.getSigner(),
          parseEther("0.1"),
          CHAINS.moonbeam,
          MOONBEAM_ROUTED_LIQUIDITY_PRECOMPILE,
          0, // relayerFee, doesn't matter because it's contract controlled
          undefined,
          payload
        );
        break;
      case Tokens.USDC:
        transferFromEth(
          FANTOM_TESTNET_TOKEN_BRIDGE,
          l.getSigner(),
          FANTOM_TESTNET_USDC,
          "500000",
          CHAINS.moonbeam,
          MOONBEAM_ROUTED_LIQUIDITY_PRECOMPILE,
          0,
          undefined,
          payload
        );
        break;
    }
  }

  async function handleUSDCApprove() {
    if (account === undefined) {
      alert("No account connected!");
      return;
    }
    const l = library as providers.JsonRpcProvider;
    approveEth(FANTOM_TESTNET_TOKEN_BRIDGE, FANTOM_TESTNET_USDC, l.getSigner(), "500000");
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
        {!ETHEREUM_ACCOUNT_PARACHAINS.includes(selectedNetwork as Parachain) &&
          <FormControl fullWidth variant="outlined" style={{ marginBottom: 12 }}>
            <Box display="flex" justifyContent="space-between">
              <PolkadotConnector setAcc32={setAcc32} />
              <TextField
                value={acc32}
                onChange={(e) => setAcc32(e.target.value)}
                label="AccountId32 Address"
                inputProps={{ name: "acc32", id: "acc32" }}
                disabled={true}
                style={{ flexGrow: 1 }}
              />
            </Box>
          </FormControl>
        }
      </Box>
    );
  }

  const sendingAmount = selectedToken === Tokens.FTM ? '0.1' : '0.5';

  return (
    <Container maxWidth="md" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card style={{ width: '100%', borderRadius: 15, overflow: 'hidden' }}>
        <CardContent>
          <Typography variant="h4" gutterBottom textAlign='center'>
            Wormhole Network Selector
          </Typography>
          <Typography variant="h6" gutterBottom textAlign='center'>
            Transfer {sendingAmount} {Tokens[selectedToken]} from <b>Fantom Testnet</b> ► Moonbase Alpha ► {ParachainEntries.find(([k, v]) => v === selectedNetwork)?.[0]}
          </Typography>
          <SendTokensForm />
          {etherBalance && (
            <Box display="flex" justifyContent="space-evenly" alignItems="center">
              {selectedToken !== Tokens.FTM &&
                <Button variant="contained" onClick={handleUSDCApprove}>
                  Approve Token
                </Button>
              }
              <Button variant="contained" onClick={handleXCMTransfer}>
                Click to Transfer
              </Button>
            </Box>
          )}
          {chainId !== FantomTestnet.chainId && <p>Ensure that you are connected to the Fantom Testnet.</p>}
          <ConnectButton />
          <AddNetworkButton />
        </CardContent>
      </Card>
    </Container>
  );

};

const AddNetworkButton = () => {
  const { switchNetwork, chainId } = useEthers()

  useEffect(() => {
    if (chainId && chainId !== FantomTestnet.chainId) { switchNetwork(FantomTestnet.chainId); }
  }, [chainId, switchNetwork]);

  if (chainId !== FantomTestnet.chainId) return (
    <Box position="absolute" top={20} right={230}>
      <Button variant="contained" onClick={() => switchNetwork(FantomTestnet.chainId)}>
        Switch to Fantom
      </Button>
    </Box>
  )
  else return (
    <Box position="absolute" top={20} right={230}>
      <Button variant="contained" onClick={() => window.open('https://faucet.fantom.network/','_blank')}>
        Go to Faucet
      </Button>
    </Box>
  );
}

const ConnectButton = () => {
  const { account, deactivate, activateBrowserWallet } = useEthers()

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
