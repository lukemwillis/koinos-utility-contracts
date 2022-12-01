import { Arrays, System, authority, Protobuf, value, Crypto } from "@koinos/sdk-as";
import { delegation } from "./proto/delegation";
import { State } from "./State";

export class Delegation {
  authorize(args: authority.authorize_arguments): authority.authorize_result {
    const contractId = System.getContractId();

    const transactionId = System.getTransactionField('id')!.bytes_value!;
    const signatures = Protobuf.decode<value.list_type>(System.getTransactionField('signatures')!.message_value!.value!, value.list_type.decode);
    for (let i = 0; i < signatures.values.length; i++) {
      const signature = signatures.values[i].bytes_value!;
      let recoveredKey = System.recoverPublicKey(signature, transactionId)!;
      const addr = Crypto.addressFromPublicKey(recoveredKey);
      if (Arrays.equal(addr, contractId) || State.IsWhitelisted(addr)) {
        return new authority.authorize_result(true);
      }
    }

    return new authority.authorize_result(false);
  }

  is_whitelisted(
    args: delegation.is_whitelisted_arguments
  ): delegation.is_whitelisted_result {
    const result = State.IsWhitelisted(args.address!);
    return new delegation.is_whitelisted_result(result);
  }

  add_to_whitelist(
    args: delegation.add_to_whitelist_arguments
  ): delegation.add_to_whitelist_result {
    System.requireAuthority(
      authority.authorization_type.contract_call,
      System.getContractId()
    );

    State.AddToWhitelist(args.address!);
    return new delegation.add_to_whitelist_result(true);
  }

  remove_from_whitelist(
    args: delegation.remove_from_whitelist_arguments
  ): delegation.remove_from_whitelist_result {
    System.requireAuthority(
      authority.authorization_type.contract_call,
      System.getContractId()
    );

    State.RemoveFromWhitelist(args.address!);
    return new delegation.remove_from_whitelist_result(true);
  }
}
