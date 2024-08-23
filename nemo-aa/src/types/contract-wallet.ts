"use strict"

export type ContractWalletOperator = {
  chainId: number
  entrypointAddress: string
  factoryAddress: string
  verifyingPaymasterAddress?: string
}
