import React, { useState, useEffect } from "react";
import { CHAINS, transferFromEthNative } from "@certusone/wormhole-sdk";
import { Container, Typography, Button, FormControl, Box, Card, CardContent } from "@mui/material";
import createMRLPayload, { MOONBEAM_ROUTED_LIQUIDITY_PRECOMPILE, Parachain, ETHEREUM_ACCOUNT_PARACHAINS } from "./MoonbeamRoutedLiquidityPayloads";
import { FantomTestnet, useEtherBalance, useEthers } from '@usedapp/core'
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
    transferFromEthNative(
      "0x599CEa2204B4FaECd584Ab1F2b6aCA137a0afbE8",
      l.getSigner(),
      parseEther("0.1"),
      CHAINS.moonbeam,
      MOONBEAM_ROUTED_LIQUIDITY_PRECOMPILE,
      0, // relayerFee, will be increased later
      undefined,
      payload
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
            Transfer 0.1 FTM from <b>Fantom Testnet</b> ► Moonbase Alpha ► {ParachainEntries.find(([k, v]) => v === selectedNetwork)?.[0]}
          </Typography>
          <Box>
            <FormControl fullWidth variant="outlined">
              {/* ... (code remains unchanged) */}
            </FormControl>
          </Box>
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
              <Button variant="contained" onClick={handleXCMTransfer}>
                Click to Transfer
              </Button>
            </>
          )}
          <p>Ensure that you are connected to the Fantom Testnet.</p>
          <ConnectButton />
        </CardContent>
      </Card>
    </Container>
  );

};

const ConnectButton = () => {
  const { account, deactivate, activateBrowserWallet, switchNetwork, chainId } = useEthers()

  const style: React.CSSProperties = { position: 'absolute', top: 40, right: 40 };

  if (chainId && chainId != FantomTestnet.chainId) switchNetwork(FantomTestnet.chainId);

  // 'account' being undefined means that we are not connected.
  if (account) return <Button style={style} onClick={deactivate}>Disconnect</Button>
  else return <Button style={style} onClick={activateBrowserWallet}>Connect</Button>
}