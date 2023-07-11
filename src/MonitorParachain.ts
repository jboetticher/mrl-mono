import { ApiPromise, WsProvider } from '@polkadot/api';
import { Parachain } from './MoonbeamRoutedLiquidityPayloads';
import { u8aToHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';

/*
README: So, you want to read events?

Each chain has their own ID for each asset, their own way of specifying ID to an asset, and their own events. 
There is no standard, so you will have to write a NEW filtering method for each chain.

What's possible to check:
  - That assets were issued to specific accounts
  - The type of asset issued 
  - Amount of the asset issued - fee

There will likely be issues with conflicting transfers to the same account in the same session.

*/

export const PARACHAIN_WSS = {
  [Parachain.Interlay]: 'wss://interlay-moonbeam-alphanet.interlay.io/parachain',
  [Parachain.HydraDX]: 'wss://hydradx-moonbase-rpc.play.hydration.cloud',
  [Parachain.Manta]: 'wss://c1.manta.moonsea.systems',
  [Parachain.MoonbaseBeta]: 'wss://frag-moonbase-beta-rpc-ws.g.moonbase.moonbeam.network',
}

export enum Tokens {
  FTM,
  USDC
}

const MANTA_TOKENS = {
  [Tokens.FTM]: '9',
  [Tokens.USDC]: '8',
}

const INTERLAY_TOKENS = {
  [Tokens.FTM]: '{"foreignAsset":2}',
  [Tokens.USDC]: '-1'
}

/**
 * Monitors asset issuance events on a parachain to react in the frontend with
 * 
 * @param parachain The destination parachain to monitor asset issuances
 * @param account The account we should be monitoring for asset issuance
 * @param onFound A callback function with a message string
 */
export default async function MonitorParachain(parachain: Parachain, account: string, token: Tokens, onFound: (message: string) => void) {
  // Create our API with a default connection to the local node
  const provider = new WsProvider(PARACHAIN_WSS[parachain]);
  const api = await ApiPromise.create({ provider });

  // Subscribe to system events via storage
  let unsub = api.query.system.events((events: any[]) => {
    console.log(`\nReceived ${events.length} events:`);
    console.log(events)

    // Loop through the Vec<EventRecord>
    for (let record of events) {
      const { event } = record;

      /* 
      Here we are only filtering to ensure that some sort of token was sent to the user specified.
      If you wanted to also filter for the asset type, you would have to either:
      1. Maintain a list of asset ID => Multilocations
      2. Maintain a query & subsequent logic per parachain that would help decipher if an asset ID => Multilocation
      */

      // This works for Moonbase Beta
      if (parachain === Parachain.MoonbaseBeta) {
        // Filter for the 'Issued' event, which indicates that assets were minted
        console.log("Event Method: ", event.method);
        if (event.method !== 'Issued') continue;

        // Print data for debug purposes
        console.log('AccountId20:', event.data.owner.toString(), 'Connected:', account)
        console.log(event.data);

        // Check if destination account = account provided
        if (event.data.owner.toString() === account) {
          onFound(event.data[0] + ", " + event.data[1])
        }
      }

      if (parachain === Parachain.Manta) {
        // Filter for the 'Issued' event, which indicates that assets were minted
        console.log("Event Method: ", event.method);
        if (event.method !== 'Issued') continue;

        // Filter for the asset type, which is hardcoded into the SDK
        if (event.data.assetId.toString() !== MANTA_TOKENS[token]) continue;

        // Normalize accounts to HEX, bc same accounts are represented differently on each parachain
        const destAcc = u8aToHex(decodeAddress(account));
        const eventAcc = u8aToHex(decodeAddress(event.data.owner.toString()));

        console.log(destAcc === eventAcc, destAcc, eventAcc)

        // Check if destination account = account provided
        if (destAcc === eventAcc) {
          console.log('what is unsub? ', unsub)
          // @ts-ignore
          if (!!unsub) unsub();
          onFound(event.data[0] + ", " + event.data[1])
        }
      }

      // TODO (HydraDX stalled)
      if (parachain === Parachain.HydraDX) {
        // Filter for the 'Issued' event, which indicates that assets were minted
        console.log("Event Method: ", event.method);
        if (event.method !== 'Issued') continue;

        // Filter for the asset type, which is hardcoded into the SDK
        if (event.data.assetId.toString() !== MANTA_TOKENS[token]) continue;

        // Normalize accounts to HEX, bc same accounts are represented differently on each parachain
        const destAcc = u8aToHex(decodeAddress(account));
        const eventAcc = u8aToHex(decodeAddress(event.data.owner.toString()));

        console.log(destAcc === eventAcc, destAcc, eventAcc)

        // Check if destination account = account provided
        if (destAcc === eventAcc) {
          console.log('what is unsub? ', unsub)
          // @ts-ignore
          if (!!unsub) unsub();
          onFound(event.data[0] + ", " + event.data[1])
        }
      }

      // TODO
      if (parachain === Parachain.Interlay) {
        // Filter for the 'Deposited' event, which indicates that assets were transfered
        console.log("Event Method: ", event.method);
        if (event.method !== 'Deposited') continue;

        // Print data for debug purposes
        console.log(event.data);

        // Normalize accounts to HEX, bc same accounts are represented differently on each parachain
        const destAcc = u8aToHex(decodeAddress(account));
        const eventAcc = u8aToHex(decodeAddress(event.data.who.toString()));
        console.log("Token: ", event.data.currencyId.toString(), INTERLAY_TOKENS[token], event.data.currencyId.toString() !== INTERLAY_TOKENS[token]);
        console.log("Who: ", destAcc, eventAcc, destAcc === eventAcc);

        // Filter for the asset type, which is hardcoded into the SDK
        if (event.data.currencyId.toString() !== INTERLAY_TOKENS[token]) continue;

        // Check if destination account = account provided
        if (destAcc === eventAcc) {
          onFound(event.data[0] + ", " + event.data[1])
        }
      }
    };
  });
}
