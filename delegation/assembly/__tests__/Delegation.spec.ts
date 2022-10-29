import { Delegation } from '../Delegation';
import { delegation } from '../proto/delegation';

const TEST_ADDRESS = new Uint8Array(0);

describe('contract', () => {
  // it("should whitelist correctly", () => {
  //   const contract = new Delegation();

  //   const args1 = new delegation.is_whitelisted_arguments(TEST_ADDRESS);
  //   const res1 = contract.is_whitelisted(args1);
  //   expect(res1.value).toStrictEqual(false);

  //   const args2 = new delegation.add_to_whitelist_arguments(TEST_ADDRESS);
  //   const res2 = contract.add_to_whitelist(args2);
  //   expect(res2.value).toStrictEqual(true);

  //   const args3 = new delegation.is_whitelisted_arguments(TEST_ADDRESS);
  //   const res3 = contract.is_whitelisted(args3);
  //   expect(res3.value).toStrictEqual(true);

  //   const args4 = new delegation.remove_from_whitelist_arguments(TEST_ADDRESS);
  //   const res4 = contract.remove_from_whitelist(args4);
  //   expect(res4.value).toStrictEqual(true);

  //   const args5 = new delegation.is_whitelisted_arguments(TEST_ADDRESS);
  //   const res5 = contract.is_whitelisted(args5);
  //   expect(res5.value).toStrictEqual(false);
  // });
});
