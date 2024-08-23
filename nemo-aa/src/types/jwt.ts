"use strict"

import { Signer } from "ethers"

export interface ProofPoints {
  pi_a: string[]
  pi_b: string[][]
  pi_c: string[]
  protocol?: string
}
export interface JWTHeader {
  alg?: string
  typ?: string
  kid?: string
}

export interface JWTPayload {
  sub: string
  iss: string
  aud: string
  exp: number
  iat?: number
  at_hash?: string
}

export interface JWTOptions {
  header: JWTHeader
  payload: JWTPayload
  proof: ProofPoints
  ephemeralKeyPair: Signer
  deadline: number
  salt: string
}
