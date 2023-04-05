import { CHAINS, tryNativeToUint8Array } from '@certusone/wormhole-sdk';
import { TypeRegistry, Enum, Struct } from '@polkadot/types';

const registry = new TypeRegistry();

/**Moonbeam's MRL precompile expects a VersionedUserAction object as a payload.*/
class VersionedUserAction extends Enum {
  constructor(value?: any) {
    super(registry, { V1: XcmRoutingUserAction }, value);
  }
}
class XcmRoutingUserAction extends Struct {
  constructor(value?: any) {
    super(registry, { destination: 'MultiLocation' }, value);
  }
}

/**The parachain IDs of each parachain. Rarely subject to change */
export enum Parachain {
  MoonbaseBeta = 888,
  Interlay = 2032,
  HydraDX = 2034
}

/**List of parachains that use ethereum (20) accounts */
export const ETHEREUM_ACCOUNT_PARACHAINS = [
  Parachain.MoonbaseBeta
];

/**List of parachains that use substrate (32) accounts */
export const SUBSTRATE_ACCOUNT_PARACHAINS = [
  Parachain.Interlay,
  Parachain.HydraDX
];

/**The Uint8Array format of the MRL precompile */
export const MOONBEAM_ROUTED_LIQUIDITY_PRECOMPILE = tryNativeToUint8Array("0x0000000000000000000000000000000000000816", CHAINS.moonbeam);

/**
 * Creates a payload that can instruct Moonbeam's Routed Liquidity precompile where to send data
 * @param {Parachain} parachainId The parachain ID of the parachain you wish to send tokens to
 * @param {string} account The account that you wish to send tokens to
 * @returns {Uint8Array} A Uint8Array that defines the 
 */
export default function createMRLPayload(parachainId: Parachain, account: string): Uint8Array {
  // Create a multilocation object & scale encode it to get the right payload
  let multilocation;
  if(ETHEREUM_ACCOUNT_PARACHAINS.includes(parachainId)) {
    multilocation = { 
      parents: 1, 
      interior: { 
        X2: [
          { Parachain: parachainId }, 
          { AccountKey20: { network: 'Any', key: account } 
        }] 
      }
    };
  }
  else {
    multilocation = { 
      parents: 1, 
      interior: { 
        X2: [
          { Parachain: parachainId }, 
          { AccountId32: { network: 'Any', id: account } 
        }] 
      }
    };
  }

  // Format objects as polkadotjs types
  multilocation = registry.createType('MultiLocation', multilocation);
  const userAction = new XcmRoutingUserAction({
    destination: multilocation,
  });
  const versionedUserAction = new VersionedUserAction({ V1: userAction });
  console.log("Versioned User Action JSON:", versionedUserAction.toJSON());
  console.log("Versioned User Action SCALE:", versionedUserAction.toHex());

  // SCALE encode
  return versionedUserAction.toU8a();
}