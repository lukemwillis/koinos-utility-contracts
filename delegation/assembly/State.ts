import { chain, System } from "@koinos/sdk-as";
import { delegation } from "./proto/delegation";

export namespace State {
  const WHITELIST_SPACE_ID = 0;

  let whitelistSpace: chain.object_space | null = null;

  function WhitelistSpace(): chain.object_space {
    if (whitelistSpace == null) {
      whitelistSpace = new chain.object_space(
        false,
        System.getContractId(),
        WHITELIST_SPACE_ID
      );
    }
    return whitelistSpace!;
  }

  export function IsWhitelisted(address: Uint8Array): boolean {
    const whitelistObj = System.getObject<Uint8Array, delegation.whitelist_object>(WhitelistSpace(), address, delegation.whitelist_object.decode);

    if (whitelistObj) {
      return whitelistObj.value;
    }

    return false;
  }

  export function AddToWhitelist(address: Uint8Array): void {
    System.putObject(WhitelistSpace(), address, new delegation.whitelist_object(true), delegation.whitelist_object.encode);
  }

  export function RemoveFromWhitelist(address: Uint8Array): void {
    System.putObject(WhitelistSpace(), address, new delegation.whitelist_object(false), delegation.whitelist_object.encode);
  }
}
