# Moonbeam Routed Liquidity

This repository contains much of the relevant code and information that @jboetticher wrote while working on Moonbeam Routed Liquidity.  

## frontend-example

A TypeScript React project that was used to send an MRL message across chains on TestNet. There is currently no live relayer, so relaying the message will have to be done manually through the Wormhole recovery process.  

Also displays some statistics and information about MRL.  

## reverse-demo

The canonical method to use Polkadot.js in a TypeScript node project to send tokens from a parachain back to a Wormhole destination chain.