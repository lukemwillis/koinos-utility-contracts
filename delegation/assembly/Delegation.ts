import { System, authority } from "@koinos/sdk-as";
import { Constants } from "./Constants";
import { delegation } from "./proto/delegation";
import { State } from "./State";

export class Delegation {
  authorize(args: authority.authorize_arguments): authority.authorize_result {
    // Override the "authorize" entrypoint for the "transaction_application" check
    // Since we're only overriding "transaction_application" when uploading the contract
    // no need to check the type of override here

    const payee = System.getTransactionField("header.payee");
    const result =
      payee.bytes_value! == Constants.ContractId() ||
      State.IsWhitelisted(payee.bytes_value!);
    return new authority.authorize_result(result);
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
      Constants.ContractId()
    );

    State.AddToWhitelist(args.address!);
    return new delegation.add_to_whitelist_result(true);
  }

  remove_from_whitelist(
    args: delegation.remove_from_whitelist_arguments
  ): delegation.remove_from_whitelist_result {
    System.requireAuthority(
      authority.authorization_type.contract_call,
      Constants.ContractId()
    );

    State.RemoveFromWhitelist(args.address!);
    return new delegation.remove_from_whitelist_result(true);
  }
}
