import { TypeRegistry, Enum, Struct } from '@polkadot/types';
import { MultiLocation } from '@polkadot/types/interfaces';

const registry = new TypeRegistry();

class XcmRoutingUserAction extends Struct {
  constructor(value?: any) {
    super(
      registry,
      {
        destination: 'MultiLocation',
      },
      value
    );
  }
}
class VersionedUserAction extends Enum {
  constructor(value?: any) {
    super(
      registry,
      {
        V1: XcmRoutingUserAction,
      },
      value
    );
  }
}

export default function scaleEncodePayload(multilocation: any): Uint8Array {
  const multiLocation = registry.createType('MultiLocation', multilocation);
  const userAction = new XcmRoutingUserAction({
    destination: multiLocation,
  });
  const versionedUserAction = new VersionedUserAction({ V1: userAction });
  console.log("Versioned User Action JSON:", versionedUserAction.toJSON());
  console.log("Versioned User Action SCALE:", versionedUserAction.toHex());

  return versionedUserAction.toU8a();
}