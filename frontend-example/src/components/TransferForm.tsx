// React components & structure
import {
  Box, Button, Divider, FormControl, Grid, InputLabel,
  MenuItem, Select, SelectChangeEvent, TextField, Typography
} from "@mui/material";
import DarkCard from "./DarkCard";

// DApp
import { FantomTestnet, useEtherBalance, useEthers } from '@usedapp/core'
import { parseEther } from '@ethersproject/units'
import { providers } from 'ethers'

// Interactivity
import { CHAINS, transferFromEth, transferFromEthNative, approveEth } from "@certusone/wormhole-sdk";
import createMRLPayload, { MOONBEAM_ROUTED_LIQUIDITY_PRECOMPILE, Parachain, ETHEREUM_ACCOUNT_PARACHAINS } from "../MoonbeamRoutedLiquidityPayloads";
import MonitorParachain, { Tokens } from "../MonitorParachain";
import PolkadotConnector from "../PolkadotConnector";
import { useState } from "react";

// Constants
const FANTOM_TESTNET_TOKEN_BRIDGE = "0x599CEa2204B4FaECd584Ab1F2b6aCA137a0afbE8";
const FANTOM_TESTNET_MANTA = "0x04f4670D817B21b652FC51ea0f4f74836D7f6db5";
const AMOUNT = "3";

type TransferFormProps = {
  setSnackOpen: (open: boolean) => void,
  setSnackMessage: (msg: string) => void
};

/**
 * WORKFLOW:
 * 1. Select a token
 * 2. Display the chains that the token can be transferred to.
 * 3. Connect polkadot wallet to select the destination chain.
 * 4. Transfer
 * 5. Wait for wormhole to relay the VAA, then present the button for manual transfer (the relayer might not be up)
 * 
 */

export default ({ setSnackOpen, setSnackMessage }: TransferFormProps) => {
  const { account, library, chainId } = useEthers();
  const etherBalance = useEtherBalance(account)
  const [selectedNetwork, setSelectedNetwork] = useState(Parachain.MoonbaseBeta);
  const [selectedToken, setSelectedToken] = useState<Tokens>(Tokens.FTM);
  const [amount, setAmount] = useState(0.0);
  const [acc32, setAcc32] = useState("");

  const ParachainEntries = Object.entries(Parachain);
  const isEthereumStyledParachain = (x: Parachain) => ETHEREUM_ACCOUNT_PARACHAINS.includes(x);

  // Callback to send an MRL transaction
  async function handleXCMTransfer() {
    if (account === undefined) {
      alert("No account connected!");
      return;
    }
    const l = library as providers.JsonRpcProvider;

    // Create the payload that we will send over
    let payload = await createMRLPayload(selectedNetwork, isEthereumStyledParachain(selectedNetwork) ? account : acc32);

    // Transfer with payload
    switch (selectedToken) {
      case Tokens.FTM:
        transferFromEthNative(
          FANTOM_TESTNET_TOKEN_BRIDGE,
          l.getSigner(),
          parseEther(AMOUNT),
          CHAINS.moonbeam,
          MOONBEAM_ROUTED_LIQUIDITY_PRECOMPILE,
          0, // relayerFee, doesn't matter because it's contract controlled
          undefined,
          payload
        );
        break;
      /* NOTE: the MANTA chain has stalled, so the MANTA token is disabled
      case Tokens.MANTA:
        transferFromEth(
          FANTOM_TESTNET_TOKEN_BRIDGE,
          l.getSigner(),
          FANTOM_TESTNET_MANTA,
          "5000000000000000000",
          CHAINS.moonbeam,
          MOONBEAM_ROUTED_LIQUIDITY_PRECOMPILE,
          0,
          undefined,
          payload
        );
        break;
      */
    }

    // Monitor parachain
    await MonitorParachain(
      selectedNetwork,
      isEthereumStyledParachain(selectedNetwork) ? account : acc32,
      selectedToken,
      (message) => {
        setSnackOpen(true);
        setSnackMessage("Transaction finished! " + message)
      }
    );
  }

  // NOTE: MANTA has stalled, so the MANTA token has been disabled
  // Callback to send an approve message for MANTA token
  async function handleMANTAApprove() {
    if (account === undefined) {
      alert("No account connected!");
      return;
    }
    const l = library as providers.JsonRpcProvider;
    approveEth(FANTOM_TESTNET_TOKEN_BRIDGE, FANTOM_TESTNET_MANTA, l.getSigner(), "5000000000000000000");
  }

  const sendingAmount = selectedToken === Tokens.FTM ? AMOUNT : '0.5';

  return (
    <>
      <Typography variant="h4" textAlign='center'>
        Moonbeam Routed Liquidity
      </Typography>
      <Typography gutterBottom textAlign='center'>
        {"[FORWARD]"}
      </Typography>
      <Divider />
      <DarkCard style={{ marginBottom: '1rem' }}>
        <Typography marginBottom={'2rem'} textAlign='center'>
          Token
        </Typography>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth variant="outlined">
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
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth variant="outlined">
              <TextField type="number" value={amount} label="Amount" onChange={(e) => setAmount(parseFloat(e.target.value))}></TextField>
            </FormControl>
          </Grid>
        </Grid>
      </DarkCard>
      <DarkCard style={{ marginBottom: '1rem' }}>
        <Typography marginBottom={'2rem'} textAlign='center'>
          Origin & Destination
        </Typography>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth variant="outlined" style={{ marginBottom: 12 }}>
              <InputLabel htmlFor="network">Select an Origin Network</InputLabel>
              <Select
                value={"Fantom Testnet"}
                label="Select an Origin Network"
                inputProps={{ name: "network", id: "network" }}
                disabled={true}
              >
                <MenuItem value={"Fantom Testnet"}>Fantom Testnet</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth variant="outlined" style={{ marginBottom: 12 }}>
              <InputLabel htmlFor="network">Select a Destination Network</InputLabel>
              <Select
                value={selectedNetwork}
                onChange={(e: SelectChangeEvent<Parachain>) => setSelectedNetwork(e.target.value as Parachain)}
                label="Select a Destination Network"
                inputProps={{ name: "network", id: "network" }}
              >
                {ParachainEntries.filter(x => isNaN(parseInt(x[0]))).map(x => (
                  <MenuItem key={x[0]} value={x[1]}>
                    {x[0]} ({isEthereumStyledParachain(x[1] as Parachain) ? 'AccountKey20' : 'AccountId32'})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {!isEthereumStyledParachain(selectedNetwork as Parachain) &&
          <Grid item xs={12}>
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
          </Grid>
        }
      </DarkCard>
      {etherBalance && (
        <Box display="flex" justifyContent="space-evenly" alignItems="center" marginTop={'2rem'}>
          {selectedToken !== Tokens.FTM &&
            <Button variant="contained" onClick={handleMANTAApprove}>
              Approve Token
            </Button>
          }
          <Button variant="contained"
            onClick={handleXCMTransfer}
            disabled={amount == 0 || (!isEthereumStyledParachain(selectedNetwork) && acc32.length == 0)}
          >
            Click to Transfer
          </Button>
        </Box>
      )}
      {chainId !== FantomTestnet.chainId && <p>Ensure that you are connected to the Fantom Testnet.</p>}
    </>
  )
}