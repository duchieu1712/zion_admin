"use strict"

import { BigNumber, BytesLike } from "ethers"

export interface UserOperation {
  sender?: string
  nonce?: BigNumber
  initCode?: BytesLike
  callData?: BytesLike
  callGasLimit?: BigNumber
  verificationGasLimit?: BigNumber
  preVerificationGas?: BigNumber
  maxFeePerGas?: BigNumber
  maxPriorityFeePerGas?: BigNumber
  paymasterAndData?: BytesLike
  signature?: BytesLike
}
