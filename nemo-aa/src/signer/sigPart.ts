"use strict"

import { Signer } from "ethers"
import { arrayify } from "ethers/lib/utils"

export async function signerSign(
  hash: string,
  signer: Signer,
): Promise<string> {
  return await signer.signMessage(arrayify(hash))
}
