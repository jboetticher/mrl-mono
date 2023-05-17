import { ApiPromise, WsProvider } from '@polkadot/api';
import { Parachain } from './MoonbeamRoutedLiquidityPayloads';

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
  [Parachain.Interlay]: '',
  [Parachain.HydraDX]: 'wss://hydradx-moonbase-rpc.play.hydration.cloud',
  [Parachain.Manta]: 'wss://c1.manta.moonsea.systems',
  [Parachain.MoonbaseBeta]: 'wss://frag-moonbase-beta-rpc-ws.g.moonbase.moonbeam.network',
}

/**
 * Monitors asset issuance events on a parachain to react in the frontend with
 * 
 * @param parachain The destination parachain to monitor asset issuances
 * @param account The account we should be monitoring for asset issuance
 * @param onFound A callback function with a message string
 */
export default async function MonitorParachain(parachain: Parachain, account: String, onFound: (message: string) => void) {
  // Create our API with a default connection to the local node
  const provider = new WsProvider(PARACHAIN_WSS[parachain]);
  const api = await ApiPromise.create({ provider });

  // Subscribe to system events via storage
  api.query.system.events((events: any[]) => {
    console.log(`\nReceived ${events.length} events:`);
    console.log(events)

    // Loop through the Vec<EventRecord>
    for (let record of events) {
      const { event } = record;

      // Filter for the 'Issued' event, which indicates that assets were minted
      console.log("Event Method: ", event.method);
      if (event.method !== 'Issued') continue;

      console.log('AccountId20:', event.data.owner.toString(), 'Connected:', account)
      console.log(event.data);

      /* 
      Here we are only filtering to ensure that some sort of token was sent to the user specified.
      If you wanted to also filter for the asset type, you would have to either:
      1. Maintain a list of asset ID => Multilocations
      2. Maintain a query & subsequent logic per parachain that would help decipher if an asset ID => Multilocation
      */
      if (event.data.owner.toString() == account) {
        onFound(event.data[0] + ", " + event.data[1])
      }
    };
  });
}