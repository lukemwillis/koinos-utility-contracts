import { System, Protobuf, authority } from "@koinos/sdk-as";
import { delegation } from "./proto/delegation";

export class Delegation {
  authorize(args: authority.authorize_arguments): authority.authorize_result {
    // const call = args.call;
    // const type = args.type;

    // YOUR CODE HERE

    const res = new authority.authorize_result();
    res.value = true;

    return res;
  }

  is_whitelisted(
    args: delegation.is_whitelisted_arguments
  ): delegation.is_whitelisted_result {
    // const address = args.address;

    // YOUR CODE HERE

    const res = new delegation.is_whitelisted_result();
    // res.value = ;

    return res;
  }

  add_to_whitelist(
    args: delegation.add_to_whitelist_arguments
  ): delegation.add_to_whitelist_result {
    // const address = args.address;

    // YOUR CODE HERE

    const res = new delegation.add_to_whitelist_result();
    // res.value = ;

    return res;
  }

  remove_from_whitelist(
    args: delegation.remove_from_whitelist_arguments
  ): delegation.remove_from_whitelist_result {
    // const address = args.address;

    // YOUR CODE HERE

    const res = new delegation.remove_from_whitelist_result();
    // res.value = ;

    return res;
  }
}
