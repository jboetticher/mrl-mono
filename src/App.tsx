import React, { useState, useEffect } from "react";
import { CHAIN_ID_TO_NAME, CHAINS, ChainId, transferFromEthNative, TokenBridgeGovernanceAction } from "@certusone/wormhole-sdk";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Button
} from "@mui/material";
import scaleEncodePayload from "./ScaleEncodePayload";



const App: React.FC = () => {
  const [selectedNetwork, setSelectedNetwork] = useState<ChainId | "">("");

  const handleChange = (event: { target: { value: any; }; }) => {
    setSelectedNetwork(event.target.value as ChainId);
  };

  async function handleXCMTransfer() {
    let multilocation = { parents: 1, interior: { X2: [ { Parachain: 123 }, { AccountId32: { network: 'Any', id: 0 } } ] } };
    scaleEncodePayload(multilocation);
  }

  return (
    <Container style={{ margin: 20 }}>
      <Typography variant="h4" gutterBottom>
        Wormhole Network Selector
      </Typography>
      <FormControl fullWidth variant="outlined">
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
      </FormControl>
      <Typography variant="h6" gutterBottom>
        to Moonbase Beta
      </Typography>
      <Button onClick={handleXCMTransfer}>
        do the thing
      </Button>
    </Container>
  );

};

export default App;
