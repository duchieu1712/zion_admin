"use strict"

export interface ZkOTPInput {
  time: number
  otp: string
  pathElements: bigint[]
  pathIndex: number[]
}

export interface ZkProof {
  pA: string[]
  pB: string[][]
  pC: string[]
  pubSignals: string[]
}

export interface ZkPath {
  pathWasm: string
  pathZkey: string
}

export interface RecoveryOTPOptions extends ZkPath {
  layer: number
  hashes: bigint[]
  code?: string
  time?: number
}

export interface OTPOptions extends RecoveryOTPOptions {
  secret?: string
  hashesDeadline?: number
}

export interface ZkLeaf {
  left: bigint
  right: bigint
}

export interface ZkRoot {
  root: bigint
  hashes: bigint[]
}

export type ZkLeafBuidler = (leaf: number) => ZkLeaf
