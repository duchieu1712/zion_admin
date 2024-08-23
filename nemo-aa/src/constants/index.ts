"use strict"

import { BigNumber, constants } from "ethers/lib/ethers"
import { Networkish } from "@ethersproject/networks"
import { ContractWalletOperator, RoleWeight, UserOperation } from "../types"

export const DEFAULT_LAYER_MERKLE_TREE = 14 //2^14 = 16384 ~ 5 days
export const VERIFIER_EMAIL_ADDRESS = "support@nemoverse.io"
export const HTML_CONTENT_MAIL = "<b>NEMO wallet</b>"

export const OWNER_ROLE_WEIGHT = 0x646400
export const OwnerRoleWeight: RoleWeight = {
  ownerWeight: 100,
  assetsOpWeight: 100,
  guardianWeight: 0,
}
export const GuardianRoleWeight: RoleWeight = {
  ownerWeight: 0,
  assetsOpWeight: 0,
  guardianWeight: 100,
}

export const DefaultsForUserOp: UserOperation = {
  sender: constants.AddressZero,
  nonce: constants.Zero,
  initCode: "0x",
  callData: "0x",
  callGasLimit: constants.Zero,
  verificationGasLimit: BigNumber.from(700000), // default verification gas. will add create2 cost (3200+200*length) if initCode exists
  preVerificationGas: BigNumber.from(21000), // should also cover calldata cost.
  maxFeePerGas: BigNumber.from(2e6),
  maxPriorityFeePerGas: BigNumber.from(2e6),
  paymasterAndData: "0x",
  signature: "0x",
}

const nemotestnet: ContractWalletOperator = {
  chainId: 25555,
  entrypointAddress: "0x1c753dD9955782aC974798A6f65dfFe03f217841",
  factoryAddress: "0xA70f2726eaB0E94d9c3EFbd525021e30eB6f8DE3",
}
const cogitestnet: ContractWalletOperator = {
  chainId: 5555,
  entrypointAddress: "0x997BA705FedF1DeAB2a37864EEbB850232cE56B1",
  factoryAddress: "0x592775270DabDE18AFa6122a84E6112dfEE61042",
}
const localhost: ContractWalletOperator = {
  chainId: 15555,
  entrypointAddress: "0x1c753dD9955782aC974798A6f65dfFe03f217841",
  factoryAddress: "0xea6ed16F1274aDf30181307a7e6284073fF84FDB",
}
const ziontestnet: ContractWalletOperator = {
  chainId: 176923,
  entrypointAddress: "0xBDFa286897F86CD02b7916BC1E9aAdc1f09da842",
  factoryAddress: "0xEfE40749F5A7476045B045BE499706B9A06d55D7",
}

const contractWalletOperators: { [name: string]: ContractWalletOperator } = {
  unspecified: {
    chainId: 0,
    entrypointAddress: constants.AddressZero,
    factoryAddress: constants.AddressZero,
  },
  nemotestnet: nemotestnet,
  cogitestnet: cogitestnet,
  localhost: localhost,
  ziontestnet: ziontestnet,
}

export function getContractWalletOperator(
  network: Networkish,
): ContractWalletOperator {
  if (network == null) {
    return { ...contractWalletOperators.unspecified }
  }
  if (typeof network == "number") {
    for (const name in contractWalletOperators) {
      const standard = contractWalletOperators[name]
      if (standard.chainId == network) {
        return {
          chainId: standard.chainId,
          entrypointAddress: standard.entrypointAddress,
          factoryAddress: standard.factoryAddress,
        }
      }
    }
    return {
      chainId: network,
      entrypointAddress: constants.AddressZero,
      factoryAddress: constants.AddressZero,
    }
  }
  const networkName = typeof network == "string" ? network : network.name

  const standard = contractWalletOperators[networkName]
  if (standard == null) {
    return { ...contractWalletOperators.unspecified }
  }
  return {
    chainId: standard.chainId,
    entrypointAddress: standard.entrypointAddress,
    factoryAddress: standard.factoryAddress,
  }
}
