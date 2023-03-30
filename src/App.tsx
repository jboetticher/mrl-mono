import React, { useState, useEffect } from "react";
import { CHAINS, transferFromEthNative } from "@certusone/wormhole-sdk";
import { Container, Typography, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, TextField } from "@mui/material";
import createMRLPayload, { MOONBEAM_ROUTED_LIQUIDITY_PRECOMPILE, Parachain, ETHEREUM_ACCOUNT_PARACHAINS } from "./MoonbeamRoutedLiquidityPayloads";
import { useEtherBalance, useEthers } from '@usedapp/core'
import { formatEther, parseEther } from '@ethersproject/units'
import { providers } from 'ethers'

export default function () {
  const { account, library } = useEthers();
  const etherBalance = useEtherBalance(account)
  const [selectedNetwork, setSelectedNetwork] = useState(Parachain.MoonbaseBeta);
  const [acc32, setAcc32] = useState("");

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
    // transferFromEthNative(
    //   "0x599CEa2204B4FaECd584Ab1F2b6aCA137a0afbE8",
    //   l.getSigner(),
    //   parseEther("0.1"),
    //   CHAINS.moonbeam,
    //   MOONBEAM_ROUTED_LIQUIDITY_PRECOMPILE,
    //   0, // relayerFee, will be increased later
    //   undefined,
    //   payload
    // );
  }


  return (
    <Container style={{ marginTop: 50 }}>
      <Typography variant="h4" gutterBottom textAlign='center'>
        Wormhole Network Selector
      </Typography>
      <Typography variant="h6" gutterBottom textAlign='center'>
        Transfer 0.1 FTM from <b>Fantom Testnet</b> ► Moonbase Alpha ► {ParachainEntries.find(([k, v]) => v === selectedNetwork)?.[0]}
      </Typography>
      <Container>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="network">Select a Network</InputLabel>
          <Select
            value={selectedNetwork}
            onChange={(e) => setSelectedNetwork(e.target.value as Parachain)}
            label="Select a Network"
            inputProps={{
              name: "network",
              id: "network",
            }}
          >
            {ParachainEntries.filter(x => isNaN(parseInt(x[0]))).map(x => (
              <MenuItem key={x[0]} value={x[1]}>
                {x[0]} ({isEthereumStyledParachain(x[1] as Parachain) ? 'AccountKey20' : 'AccountId32'})
              </MenuItem>
            ))}
          </Select>
          {!isEthereumStyledParachain(selectedNetwork) &&
            <>
              <TextField value={acc32} 
                style={{ marginTop: 20 }}
                label="Input your Account32 Address"
                onChange={(e) => { setAcc32(e.target.value) }} 
                inputProps={{ name: "account", id: "account" }} 
              />
            </>
          }
        </FormControl>
      </Container>
      {etherBalance && (
        <>
          <div className="balance">
            <br />
            Address:
            <p className="bold">{account}</p>
            <br />
            Balance:
            <p className="bold">{formatEther(etherBalance)}</p>
          </div>
          <Button onClick={handleXCMTransfer}>
            Click to Transfer
          </Button>
        </>
      )}
      <p>Ensure that you are connected to the Fantom Testnet.</p>
      <ConnectButton />
    </Container>
  );

};

const ConnectButton = () => {
  const { account, deactivate, activateBrowserWallet } = useEthers()

  const style: React.CSSProperties = { position: 'absolute', top: 40, right: 40 };

  // 'account' being undefined means that we are not connected.
  if (account) return <Button style={style} onClick={deactivate}>Disconnect</Button>
  else return <Button style={style} onClick={activateBrowserWallet}>Connect</Button>
}