import React, { useState, useEffect } from "react";
import { CHAIN_ID_TO_NAME, CHAINS, ChainId, transferFromEthNative } from "@certusone/wormhole-sdk";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const App: React.FC = () => {
  const [selectedNetwork, setSelectedNetwork] = useState<ChainId | "">("");

  const handleChange = (event: { target: { value: any; }; }) => {
    setSelectedNetwork(event.target.value as ChainId);
  };

  return (
    <Container>
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
    </Container>
  );
};

export default App;
