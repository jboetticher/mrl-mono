import { CHAINS, tryNativeToUint8Array } from '@certusone/wormhole-sdk';
import { ApiPromise, WsProvider } from '@polkadot/api';

/**The parachain IDs of each parachain. Rarely subject to change */
export enum Parachain {
  MoonbaseBeta = 888,
  HydraDX = 2034,
  // Interlay = 2032,
  // Manta = 2104
}

/**List of parachains that use ethereum (20) accounts */
export const ETHEREUM_ACCOUNT_PARACHAINS = [
  Parachain.MoonbaseBeta
];

/**List of parachains that use substrate (32) accounts */
export const SUBSTRATE_ACCOUNT_PARACHAINS = [
  Parachain.HydraDX,
  // Parachain.Interlay,
  // Parachain.Manta
];

/**The Uint8Array format of the MRL precompile */
export const MOONBEAM_ROUTED_LIQUIDITY_PRECOMPILE = tryNativeToUint8Array("0x0000000000000000000000000000000000000816", CHAINS.moonbeam);

/**
 * The runtime defined names for Substrate types relevant to MRL.  
 * https://github.com/moonbeam-foundation/moonbeam/blob/acbd4e4f9e56b03563652d6e073ff0d0ff2ad98c/precompiles/gmp/src/types.rs#L25C1-L48C2
*/
enum MRLTypes {
  /**Runtime defined MultiLocation. Allows for XCM versions 2 and 3. */
  XcmVersionedMultiLocation = "XcmVersionedMultiLocation",
  /**MRL payload (V1) that only defines the destination MultiLocation. */
  XcmRoutingUserAction = "XcmRoutingUserAction",
  /**MRL payload (V2) that defines the destination MultiLocation and a fee for the relayer. */
  XcmRoutingUserActionWithFee = "XcmRoutingUserActionWithFee",
  /**Wrapper object for the MRL payload. */
  VersionedUserAction = "VersionedUserAction",
};

/**
 * Creates a payload that can instruct Moonbeam's Routed Liquidity precompile where to send data
 * @param {Parachain} parachainId The parachain ID of the parachain you wish to send tokens to
 * @param {string} account The account that you wish to send tokens to
 * @returns {Uint8Array} A Uint8Array that defines the 
 */
export default async function createMRLPayload(parachainId: Parachain, account: string): Promise<Uint8Array> {
  // Create a multilocation object based on the target parachain's account type
  const isEthereum = ETHEREUM_ACCOUNT_PARACHAINS.includes(parachainId);
  console.log("parachain: ", parachainId)
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

  // Creates an API for Moonbeam that defines MRL's special types
  // 
  const wsProvider = new WsProvider('wss://wss.api.moonbase.moonbeam.network');
  const api = await ApiPromise.create({
    provider: wsProvider, types: {
      [MRLTypes.XcmRoutingUserAction]: { destination: MRLTypes.XcmVersionedMultiLocation },
      [MRLTypes.XcmRoutingUserActionWithFee]: { destination: MRLTypes.XcmVersionedMultiLocation, fee: 'U256' },
      [MRLTypes.VersionedUserAction]: { _enum: { V1: MRLTypes.XcmRoutingUserAction, V2: MRLTypes.XcmRoutingUserActionWithFee } }
    }
  });

  // Format multilocation object as a Polkadot.js type
  const versionedMultilocation = api.createType(MRLTypes.XcmVersionedMultiLocation, multilocation);
  const userAction = api.createType(MRLTypes.XcmRoutingUserActionWithFee, { destination: versionedMultilocation, fee: 10000 });

  // Wrap and format the MultiLocation object into the precompile's input type
  const versionedUserAction = api.createType(MRLTypes.VersionedUserAction, { V2: userAction });
  console.log("Versioned User Action JSON:", versionedUserAction.toJSON());
  console.log("Versioned User Action SCALE:", versionedUserAction.toHex());

  // SCALE encode resultant precompile formatted objects
  return versionedUserAction.toU8a();
}


