import React, { useState, useEffect } from "react";
import { CHAINS, tryNativeToUint8Array, transferFromEthNative } from "@certusone/wormhole-sdk";
import { Container, Typography, Button } from "@mui/material";
import scaleEncodePayload from "./ScaleEncodePayload";
import { useEtherBalance, useEthers, FantomTestnet } from '@usedapp/core'
import { formatEther, parseEther } from '@ethersproject/units'
import { providers } from 'ethers'

export default function () {
  const { account, chainId, library } = useEthers();
  const etherBalance = useEtherBalance(account)

  async function handleXCMTransfer() {
    // Create a multilocation object & scale encode it to get the right payload
    let multilocation = { parents: 1, interior: { X2: [{ Parachain: 123 }, { AccountId32: { network: 'Any', id: 0 } }] } };
    let payload = scaleEncodePayload(multilocation);

    if (account == undefined) {
      alert("No account connected!");
      return;
    }
    const l = library as providers.JsonRpcProvider;

    transferFromEthNative(
      "0x599CEa2204B4FaECd584Ab1F2b6aCA137a0afbE8",
      l.getSigner(),
      parseEther("0.1"),
      CHAINS.moonbeam,
      tryNativeToUint8Array("0x0000000000000000000000000000000000000815", CHAINS.fantom),
      0, // relayerFee
      undefined,
      payload
    );
  }

  return (
    <div style={{ margin: 40, width: '100%' }}>
      <Typography variant="h4" gutterBottom textAlign='center'>
        Wormhole Network Selector
      </Typography>
      <Typography variant="h6" gutterBottom textAlign='center'>
        Transfer 0.1 FTM from <b>Fantom Testnet</b> ► Moonbase Alpha ► Moonbase Beta
      </Typography>
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
    </div>
  );

};

const ConnectButton = () => {
  const { account, deactivate, activateBrowserWallet } = useEthers()

  const style: React.CSSProperties = { position: 'absolute', top: 40, right: 40 };

  // 'account' being undefined means that we are not connected.
  if (account) return <Button style={style} onClick={deactivate}>Disconnect</Button>
  else return <Button style={style} onClick={activateBrowserWallet}>Connect</Button>
}

// const handleChange = (event: { target: { value: any; }; }) => {
//   setSelectedNetwork(event.target.value as ChainId);
// };

{/* <FormControl fullWidth variant="outlined">
<InputLabel htmlFor="network">Select a Network</InputLabel>
<Select
  value={selectedNetwork}
  onChange={handleChange}
  label="Select a Network"
  inputProps={{
    name: "network",
    id: "network",
  }}
>
  {Object.entries(CHAINS).map(x => (
    <MenuItem key={x[0]} value={x[1]}>
      {CHAIN_ID_TO_NAME[x[1]]}
    </MenuItem>
  ))}
</Select>
</FormControl> */}