# Moonbeam Routed Liquidity Frontend Example

Super simple example that sends testnet FTM to Moonbeam and then to another parachain.

```
npm install
npm start
```

- The code related to creating payloads from a Wormhole chain to a Parachain is within `MoonbeamRoutedLiquidityPayloads.ts`. 
- The code related to Polkadot wallets is within `PolkadotConnector.tsx`.

## TODO

Add an issue if there's something missing that's relevant to using the Polkadot JS API and/or communicating with the Moonbeam Routed Liquidity (GMP) precompile.  

- A way to validate if a parachain has an asset registered
- Sending tokens backward
