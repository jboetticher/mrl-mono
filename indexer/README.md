# indexer

Provides data about MRL.

## totalLiquidityForward

```bash
https://mrl-indexer.projk.net/totalLiquidityForward
```

Returns the USD of all of the tokens sent from a Wormhole connected chain to all parachains.

## getTokens

```bash
https://mrl-indexer.projk.net/getTokens
```

Returns all of the different tokens sent (and indexed) by MRL.

## liquidityForward

```
https://mrl-indexer.projk.net/liquidityForward/:contract?timestamp=TIMESTAMP
```

Returns the USD of a specific token sent from a Wormhole connected chain to all parachains.

- **contract**: the contract address of the token being sent (includes 0x)
- **timestamp** (optional): the timestamp cutoff of the data you wish to query