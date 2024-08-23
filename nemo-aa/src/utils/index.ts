"use strict"

import { ethers, constants, BigNumber, Wallet } from "ethers"
import { RoleWeight, UserOperation } from "../types"
import { Contract } from "ethers"
import {
  defaultAbiCoder,
  getAddress,
  keccak256,
  solidityPack,
  toUtf8Bytes,
} from "ethers/lib/utils"
import { DefaultsForUserOp } from "../constants"

export * from "./zero-knowledge"

const panicCodes: { [key: number]: string } = {
  // from https://docs.soliditylang.org/en/v0.8.0/control-structures.html
  0x01: "assert(false)",
  0x11: "arithmetic overflow/underflow",
  0x12: "divide by zero",
  0x21: "invalid enum value",
  0x22: "storage byte array that is incorrectly encoded",
  0x31: ".pop() on an empty array.",
  0x32: "array sout-of-bounds or negative index",
  0x41: "memory overflow",
  0x51: "zero-initialized variable of internal function type",
}

export function decodeRevertReason(
  data: string,
  nullIfNoMatch = true,
): string | null {
  const methodSig = data.slice(0, 10)
  const dataParams = "0x" + data.slice(10)

  if (methodSig === "0x08c379a0") {
    const [err] = ethers.utils.defaultAbiCoder.decode(["string"], dataParams)
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `Error(${err})`
  } else if (methodSig === "0x00fa072b") {
    const [opindex, paymaster, msg] = ethers.utils.defaultAbiCoder.decode(
      ["uint256", "address", "string"],
      dataParams,
    )
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `FailedOp(${opindex}, ${
      paymaster !== constants.AddressZero ? paymaster : "none"
    }, ${msg})`
  } else if (methodSig === "0x4e487b71") {
    const [code] = ethers.utils.defaultAbiCoder.decode(["uint256"], dataParams)
    return `Panic(${panicCodes[code] ?? code} + ')`
  }
  if (!nullIfNoMatch) {
    return data
  }
  return null
}

export function rethrow(): (e: Error) => void {
  const callerStack = new Error()
    .stack!.replace(/Error.*\n.*at.*\n/, "")
    .replace(/.*at.* \(internal[\s\S]*/, "")

  if (arguments[0] != null) {
    throw new Error("must use .catch(rethrow()), and NOT .catch(rethrow)")
  }
  return function (e: Error) {
    const solstack = e.stack!.match(/((?:.* at .*\.sol.*\n)+)/)
    const stack = (solstack != null ? solstack[1] : "") + callerStack
    // const regex = new RegExp('error=.*"data":"(.*?)"').compile()
    const found = /error=.*?"data":"(.*?)"/.exec(e.message)
    let message: string
    if (found != null) {
      const data = found[1]
      message =
        decodeRevertReason(data) ?? e.message + " - " + data.slice(0, 100)
    } else {
      message = e.message
    }
    const err = new Error(message)
    err.stack = "Error: " + message + "\n" + stack
    throw err
  }
}

export function fillUserOpDefaults(
  op: Partial<UserOperation>,
  defaults = DefaultsForUserOp,
): UserOperation {
  const partial: any = { ...op }
  // we want "item:undefined" to be used from defaults, and not override defaults, so we must explicitly
  // remove those so "merge" will succeed.
  for (const key in partial) {
    if (partial[key] == null) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete partial[key]
    }
  }
  const filled = { ...defaults, ...partial }
  return filled
}

function encode(
  typevalues: Array<{ type: string; val: any }>,
  forSignature: boolean,
): string {
  const types = typevalues.map((typevalue) =>
    typevalue.type === "bytes" && forSignature ? "bytes32" : typevalue.type,
  )
  const values = typevalues.map((typevalue) =>
    typevalue.type === "bytes" && forSignature
      ? keccak256(typevalue.val)
      : typevalue.val,
  )
  return defaultAbiCoder.encode(types, values)
}

export function callDataCost(data: string): BigNumber {
  return BigNumber.from(
    ethers.utils
      .arrayify(data)
      .map((x) => (x === 0 ? 4 : 16))
      .reduce((sum, x) => sum + x),
  )
}

function packUserOp(op: UserOperation, forSignature = true): string {
  if (forSignature) {
    // lighter signature scheme (must match UserOperation#pack): do encode a zero-length signature, but strip afterwards the appended zero-length value
    const userOpType = {
      components: [
        { type: "address", name: "sender" },
        { type: "uint256", name: "nonce" },
        { type: "bytes", name: "initCode" },
        { type: "bytes", name: "callData" },
        { type: "uint256", name: "callGasLimit" },
        { type: "uint256", name: "verificationGasLimit" },
        { type: "uint256", name: "preVerificationGas" },
        { type: "uint256", name: "maxFeePerGas" },
        { type: "uint256", name: "maxPriorityFeePerGas" },
        { type: "bytes", name: "paymasterAndData" },
        { type: "bytes", name: "signature" },
      ],
      name: "userOp",
      type: "tuple",
    }
    let encoded = defaultAbiCoder.encode(
      [userOpType as any],
      [{ ...op, signature: "0x" }],
    )
    // remove leading word (total length) and trailing word (zero-length signature)
    encoded = "0x" + encoded.slice(66, encoded.length - 64)
    return encoded
  }
  const typevalues = [
    { type: "address", val: op.sender },
    { type: "uint256", val: op.nonce },
    { type: "bytes", val: op.initCode },
    { type: "bytes", val: op.callData },
    { type: "uint256", val: op.callGasLimit },
    { type: "uint256", val: op.verificationGasLimit },
    { type: "uint256", val: op.preVerificationGas },
    { type: "uint256", val: op.maxFeePerGas },
    { type: "uint256", val: op.maxPriorityFeePerGas },
    { type: "bytes", val: op.paymasterAndData },
  ]
  if (!forSignature) {
    // for the purpose of calculating gas cost, also hash signature
    typevalues.push({ type: "bytes", val: op.signature })
  }
  return encode(typevalues, forSignature)
}

export async function fillUserOp(
  op: Partial<UserOperation>,
  entryPoint?: Contract,
): Promise<UserOperation> {
  const op1 = { ...op }
  const provider = entryPoint?.provider
  // if (op.initCode != null && op.initCode != "0x") {
  //   throw new Error("Account must be created independence")
  // }
  if (op1.nonce == null) {
    if (provider == null)
      throw new Error("must have entryPoint to autofill nonce")
    const c = new Contract(
      op.sender!,
      ["function nonce() view returns(address)"],
      provider,
    )
    op1.nonce = await c.nonce().catch(rethrow())
  }
  if (op1.callGasLimit == null && op.callData != null) {
    if (provider == null)
      throw new Error("must have entryPoint for callGasLimit estimate")
    const gasEtimated = await provider.estimateGas({
      from: entryPoint?.address,
      to: op1.sender,
      data: op1.callData,
    })

    // console.log('estim', op1.sender,'len=', op1.callData!.length, 'res=', gasEtimated)
    // estimateGas assumes direct call from entryPoint. add wrapper cost.
    op1.callGasLimit = gasEtimated // .add(55000)
  }
  if (op1.maxFeePerGas == null) {
    if (provider == null)
      throw new Error("must have entryPoint to autofill maxFeePerGas")
    const block = await provider.getBlock("latest")

    // Missing EIP-1559
    const baseFeePerGas = block.baseFeePerGas
      ? block.baseFeePerGas
      : constants.Zero
    op1.maxFeePerGas = baseFeePerGas.add(
      op1.maxPriorityFeePerGas ?? DefaultsForUserOp.maxPriorityFeePerGas,
    )
  }
  // TODO: this is exactly what fillUserOp below should do - but it doesn't.
  // adding this manually
  if (op1.maxPriorityFeePerGas == null) {
    op1.maxPriorityFeePerGas = DefaultsForUserOp.maxPriorityFeePerGas
  }
  const op2 = fillUserOpDefaults(op1)
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  if (op2.preVerificationGas.toString() === "0") {
    // TODO: we don't add overhead, which is ~21000 for a single TX, but much lower in a batch.
    op2.preVerificationGas = callDataCost(packUserOp(op2, false))
  }
  return op2
}

export function getUserOpHash(
  op: UserOperation,
  entryPoint: string,
  chainId: number,
): string {
  const userOpHash = keccak256(packUserOp(op, true))
  const enc = defaultAbiCoder.encode(
    ["bytes32", "address", "uint256"],
    [userOpHash, entryPoint, chainId],
  )
  return keccak256(enc)
}

export function serializeRoleWeight(roleWeight: RoleWeight): number {
  return (
    (roleWeight.ownerWeight << 16) |
    (roleWeight.assetsOpWeight << 8) |
    roleWeight.guardianWeight
  )
}

export function getProviderHashed(iss: string, aud: string) {
  const provider = keccak256(
    solidityPack(["bytes", "bytes"], [toUtf8Bytes(iss), toUtf8Bytes(aud)]),
  )
  return provider
}

export function isSameAddress(addressA: string, addressB: string): boolean {
  return (
    getAddress(addressA).toLowerCase() === getAddress(addressB).toLowerCase()
  )
}

export function makePINCodeHolder(code: string, salt: string) {
  const prv = keccak256(
    solidityPack(["bytes", "bytes32"], [toUtf8Bytes(code), salt]),
  )
  const ret = new Wallet(prv)
  return ret
}
