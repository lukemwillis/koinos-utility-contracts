import { System, Protobuf, authority } from "@koinos/sdk-as";
import { Delegation as ContractClass } from "./Delegation";
import { delegation as ProtoNamespace } from "./proto/delegation";

export function main(): i32 {
  const contractArgs = System.getArguments();
  let retbuf = new Uint8Array(1024);

  const c = new ContractClass();

  switch (contractArgs.entry_point) {
    case 0xd95d7ac7: {
      const args = Protobuf.decode<ProtoNamespace.is_whitelisted_arguments>(
        contractArgs.args,
        ProtoNamespace.is_whitelisted_arguments.decode
      );
      const res = c.is_whitelisted(args);
      retbuf = Protobuf.encode(
        res,
        ProtoNamespace.is_whitelisted_result.encode
      );
      break;
    }

    case 0xc9779851: {
      const args = Protobuf.decode<ProtoNamespace.add_to_whitelist_arguments>(
        contractArgs.args,
        ProtoNamespace.add_to_whitelist_arguments.decode
      );
      const res = c.add_to_whitelist(args);
      retbuf = Protobuf.encode(
        res,
        ProtoNamespace.add_to_whitelist_result.encode
      );
      break;
    }

    case 0x8d14175a: {
      const args =
        Protobuf.decode<ProtoNamespace.remove_from_whitelist_arguments>(
          contractArgs.args,
          ProtoNamespace.remove_from_whitelist_arguments.decode
        );
      const res = c.remove_from_whitelist(args);
      retbuf = Protobuf.encode(
        res,
        ProtoNamespace.remove_from_whitelist_result.encode
      );
      break;
    }

    default:
      System.exit(1);
      break;
  }

  System.exit(0, retbuf);
  return 0;
}

main();
