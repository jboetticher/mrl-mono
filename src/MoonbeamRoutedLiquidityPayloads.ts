import { CHAINS, tryNativeToUint8Array } from '@certusone/wormhole-sdk';
import { TypeRegistry, Enum, Struct } from '@polkadot/types';
import { ApiPromise, WsProvider } from '@polkadot/api';

const registry = new TypeRegistry();

/**Moonbeam's MRL precompile expects a VersionedUserAction object as a payload.*/
// class VersionedUserAction extends Enum {
//   constructor(value?: any) {
//     super(registry, { V1: XcmRoutingUserAction }, value);
//   }
// }
// class XcmRoutingUserAction extends Struct {
//   constructor(value?: any) {
//     super(registry, { destination: "XcmVersionedMultilocation" }, value);
//   }
// }

/**The parachain IDs of each parachain. Rarely subject to change */
export enum Parachain {
  MoonbaseBeta = 888,
  Interlay = 2032,
  HydraDX = 2034,
  Manta = 2104
}

/**List of parachains that use ethereum (20) accounts */
export const ETHEREUM_ACCOUNT_PARACHAINS = [
  Parachain.MoonbaseBeta
];

/**List of parachains that use substrate (32) accounts */
export const SUBSTRATE_ACCOUNT_PARACHAINS = [
  Parachain.Interlay,
  Parachain.HydraDX,
  Parachain.Manta
];

/**The Uint8Array format of the MRL precompile */
export const MOONBEAM_ROUTED_LIQUIDITY_PRECOMPILE = tryNativeToUint8Array("0x0000000000000000000000000000000000000816", CHAINS.moonbeam);

/**
 * Creates a payload that can instruct Moonbeam's Routed Liquidity precompile where to send data
 * @param {Parachain} parachainId The parachain ID of the parachain you wish to send tokens to
 * @param {string} account The account that you wish to send tokens to
 * @returns {Uint8Array} A Uint8Array that defines the 
 */
export default async function createMRLPayload(parachainId: Parachain, account: string): Promise<Uint8Array> {
  // Create a multilocation object based on the target parachain's account type
  const isEthereum = ETHEREUM_ACCOUNT_PARACHAINS.includes(parachainId);
  let multilocation = {
    V3: {
      parents: 1,
      interior: {
        X2: [
          { Parachain: parachainId },
          isEthereum ?
            { AccountKey20: { key: account } } :
            { AccountId32: { id: account } }
        ]
      }
    }
  };


  const wsProvider = new WsProvider('wss://wss.api.moonbase.moonbeam.network');
  const api = await ApiPromise.create({ provider: wsProvider, types: {
    XcmRoutingUserAction: { destination: "XcmVersionedMultilocation" },
    VersionedUserAction: { V1: "XcmRoutingUserAction" }
  }});

  // Format multilocation object as a Polkadot.js type
  const versionedMultilocation = api.createType('XcmVersionedMultiLocation', multilocation);
  console.log('XcmVersionedMultiLocation', versionedMultilocation.toHex())
  const routingUserAction = api.createType('XcmRoutingUserAction', { destination: versionedMultilocation });
  console.log('XcmRoutingUserAction', routingUserAction.toHex())

  // Wrap and format the MultiLocation object into the precompile's input type
  // const userAction = new XcmRoutingUserAction({ versionedMultilocation });
  // const versionedUserAction = new VersionedUserAction({ V1: userAction });
  // console.log("Versioned User Action JSON:", versionedUserAction.toJSON());
  // console.log("Versioned User Action SCALE:", versionedUserAction.toHex());

  // SCALE encode resultant precompile formatted objects
  return routingUserAction.toU8a();
}