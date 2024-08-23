import { UserOperation } from "../types"
import { KeyBase } from "../signer"
import { Contract } from "ethers"
import { solidityPack } from "ethers/lib/utils"
import { fillUserOp, getUserOpHash } from "../utils"

export async function fillAndSign(
  op: UserOperation,
  signers: KeyBase[],
  entryPoint: Contract,
  chainId: number,
): Promise<UserOperation> {
  const op2 = await fillUserOp(op, entryPoint)
  const message = getUserOpHash(op2, entryPoint.address, chainId)
  let sig
  for (const key of signers) {
    if (!sig) {
      sig = await key.generateSignature(message)
    } else {
      sig = solidityPack(
        ["bytes", "bytes"],
        [sig, await key.generateSignature(message)],
      )
    }
  }
  return {
    ...op2,
    signature: sig,
  }
}
