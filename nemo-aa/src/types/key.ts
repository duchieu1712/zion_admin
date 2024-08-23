"use strict"

export enum KeyType {
  Secp256k1,
  ERC1271Wallet,
  OpenIDWithEmail,
  OTP,
  RecoveryOTP,
  JWTZKProof,
  PINCode,
  None,
}

export interface RoleWeight {
  ownerWeight: number
  assetsOpWeight: number
  guardianWeight: number
}
