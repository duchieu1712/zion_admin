"use strict"

import { ZkLeafBuidler, ZkOTPInput, ZkProof, ZkRoot } from "../types"
import { DEFAULT_LAYER_MERKLE_TREE } from "../constants"
import { buildPoseidon } from "circomlibjs"
import { groth16 } from "snarkjs"
import totp from "totp-generator"

export async function generateZkOTPInput(
  otp: string,
  time: number,
  hashes: bigint[],
  layer = DEFAULT_LAYER_MERKLE_TREE,
): Promise<ZkOTPInput> {
  const poseidon = await buildPoseidon()

  let currentNode = poseidon.F.toObject(poseidon([BigInt(time), BigInt(otp)]))

  if (hashes.indexOf(currentNode) < 0) {
    throw new Error("Invalid OTP")
  }

  const pathElements = []
  const pathIndex = []

  for (let i = 0; i < layer; i++) {
    if (hashes.indexOf(currentNode) % 2 === 0) {
      pathIndex.push(0)
      let currentIndex = hashes.indexOf(currentNode) + 1
      pathElements.push(hashes[currentIndex])
      currentNode = poseidon.F.toObject(
        poseidon([hashes[currentIndex - 1], hashes[currentIndex]]),
      )
    } else {
      pathIndex.push(1)
      let currentIndex = hashes.indexOf(currentNode) - 1
      pathElements.push(hashes[currentIndex])
      currentNode = poseidon.F.toObject(
        poseidon([hashes[currentIndex], hashes[currentIndex + 1]]),
      )
    }
  }

  return {
    time: time,
    otp: otp,
    pathElements: pathElements,
    pathIndex: pathIndex,
  }
}

export async function generateZkProof(
  input: any,
  pathWasm: string,
  pathZkey: string,
): Promise<ZkProof> {
  const { proof, publicSignals } = await groth16.fullProve(
    input,
    pathWasm,
    pathZkey,
  )
  const calldata = await groth16.exportSolidityCallData(proof, publicSignals)
  const argv = calldata
    .replace(/["[\]\s]/g, "")
    .split(",")
    .map((x) => BigInt(x).toString())

  const a = [argv[0], argv[1]]
  const b = [
    [argv[2], argv[3]],
    [argv[4], argv[5]],
  ]
  const c = [argv[6], argv[7]]
  const Input = argv.slice(8)

  return {
    pA: a,
    pB: b,
    pC: c,
    pubSignals: Input,
  }
}

export async function computeRoot(
  builder: ZkLeafBuidler,
  layer: number = DEFAULT_LAYER_MERKLE_TREE,
): Promise<ZkRoot> {
  const poseidon = await buildPoseidon()
  const hashes = []

  for (let i = 0; i < 2 ** layer; i++) {
    const { left, right } = builder(i)
    hashes.push(poseidon.F.toObject(poseidon([left, right])))
  }

  let k = 0

  for (let i = 2 ** layer; i < 2 ** (layer + 1) - 1; i++) {
    hashes.push(
      poseidon.F.toObject(poseidon([hashes[k * 2], hashes[k * 2 + 1]])),
    )
    k++
  }
  const root = hashes[2 ** (layer + 1) - 2]
  return {
    root,
    hashes,
  }
}

export async function computeRecoveryOTPRoot(
  code: bigint,
  layer: number = DEFAULT_LAYER_MERKLE_TREE,
): Promise<ZkRoot> {
  return computeRoot((leaf) => {
    return {
      left: BigInt(leaf),
      right: code,
    }
  }, layer)
}

export async function computeTOTPRoot(
  secret: string,
  startTimeInMilliseconds: number,
  layer: number = DEFAULT_LAYER_MERKLE_TREE,
): Promise<{ startTime: number; endTime: number; root: ZkRoot }> {
  const modulus = Math.floor(startTimeInMilliseconds / 30000 - 1) * 30000
  const deadline = modulus + (2 ** layer - 1) * 30000
  const res = await computeRoot((leaf) => {
    const _st = modulus + leaf * 30000
    return {
      left: BigInt(_st),
      right: BigInt(totp(secret, { timestamp: _st })),
    }
  }, layer)

  return {
    startTime: modulus / 1000,
    endTime: deadline / 1000,
    root: res,
  }
}
