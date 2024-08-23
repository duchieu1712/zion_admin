"use strict"

import { BytesLike, Wallet, ethers } from "ethers"
import {
  arrayify,
  joinSignature,
  keccak256,
  solidityPack,
  zeroPad,
} from "ethers/lib/utils"
import { signerSign } from "./sigPart"
import {
  JWTOptions,
  KeyType,
  OTPOptions,
  RecoveryOTPOptions,
  RoleWeight,
} from "../types"
import {
  GuardianRoleWeight,
  HTML_CONTENT_MAIL,
  OwnerRoleWeight,
  VERIFIER_EMAIL_ADDRESS,
} from "../constants"
import {
  generateZkOTPInput,
  generateZkProof,
  serializeRoleWeight,
} from "../utils"
import { groth16 } from "snarkjs"

export * from "./sigPart"

export abstract class KeyBase {
  constructor(readonly roleWeight: RoleWeight) {}
  public abstract generateSignature(digestHash: BytesLike): Promise<string>
  public abstract serialize(): string
  public abstract getHash(): string
  public serializeRoleWeight(): string {
    return solidityPack(
      ["uint8", "uint8", "uint8"],
      [
        this.roleWeight.ownerWeight,
        this.roleWeight.assetsOpWeight,
        this.roleWeight.guardianWeight,
      ],
    )
  }
  public weights(): number {
    const ret = serializeRoleWeight(this.roleWeight)
    return ret
  }
}

export class KeySecp256k1 extends KeyBase {
  constructor(
    readonly inner: Wallet,
    roleWeight: RoleWeight = OwnerRoleWeight,
  ) {
    super(roleWeight)
  }

  public async generateSignature(digestHash: string): Promise<string> {
    return solidityPack(
      ["uint8", "bytes"],
      [KeyType.Secp256k1, await signerSign(digestHash, this.inner)],
    )
  }

  public getHash(): string {
    return keccak256(
      solidityPack(
        ["uint8", "bytes32"],
        [KeyType.Secp256k1, zeroPad(this.inner.address, 32)],
      ),
    )
  }

  public serialize(): string {
    return solidityPack(
      ["uint8", "uint24", "bytes32"],
      [KeyType.Secp256k1, this.weights(), this.inner.address],
    )
  }
}

export class PINCode extends KeyBase {
  constructor(
    readonly inner: Wallet,
    roleWeight: RoleWeight = OwnerRoleWeight,
  ) {
    super(roleWeight)
  }

  public async generateSignature(digestHash: string): Promise<string> {
    return solidityPack(
      ["uint8", "bytes"],
      [KeyType.PINCode, await signerSign(digestHash, this.inner)],
    )
  }

  public getHash(): string {
    return keccak256(
      solidityPack(
        ["uint8", "bytes32"],
        [KeyType.PINCode, zeroPad(this.inner.address, 32)],
      ),
    )
  }

  public serialize(): string {
    return solidityPack(
      ["uint8", "uint24", "bytes32"],
      [KeyType.PINCode, this.weights(), this.inner.address],
    )
  }
}

export class KeyERC1271Wallet extends KeyBase {
  constructor(
    readonly walletAddr: BytesLike,
    readonly inner: Wallet,
    roleWeight: RoleWeight,
  ) {
    super(roleWeight)
  }

  public getHash(): string {
    return keccak256(
      solidityPack(
        ["uint8", "bytes32"],
        [KeyType.ERC1271Wallet, zeroPad(this.walletAddr, 32)],
      ),
    )
  }

  public async generateSignature(digestHash: string): Promise<string> {
    const sig = joinSignature(
      this.inner._signingKey().signDigest(arrayify(digestHash)),
    )
    return solidityPack(
      ["uint8", "address", "uint32", "bytes"],
      [KeyType.ERC1271Wallet, this.walletAddr, sig.length / 2 - 1, sig],
    )
  }

  public serialize(): string {
    return solidityPack(
      ["uint8", "address", "bytes"],
      [KeyType.ERC1271Wallet, this.walletAddr, this.serializeRoleWeight()],
    )
  }
}

export class KeyOTP extends KeyBase {
  private inner: OTPOptions
  constructor(inner: OTPOptions, roleWeight: RoleWeight = GuardianRoleWeight) {
    super(roleWeight)
    this.inner = inner
  }

  public get root(): bigint {
    return this.inner.hashes[2 ** (this.inner.layer + 1) - 2]
  }

  public get rootInBytes32(): string {
    return ethers.utils.hexZeroPad(ethers.utils.hexValue(this.root), 32)
  }

  public getHash(): string {
    return keccak256(
      solidityPack(["uint8", "bytes32"], [KeyType.OTP, this.rootInBytes32]),
    )
  }

  public setOTP(code: string, timestamp: number): KeyOTP {
    this.inner.code = code
    this.inner.time = timestamp
    return this
  }

  public async generateSignature(_: string): Promise<string> {
    const input = await generateZkOTPInput(
      this.inner.code,
      this.inner.time,
      this.inner.hashes,
      this.inner.layer,
    )

    const proof = await generateZkProof(
      input,
      this.inner.pathWasm,
      this.inner.pathZkey,
    )

    return solidityPack(
      ["uint8", "uint256[2]", "uint256[2][2]", "uint256[2]", "uint256[2]"],
      [KeyType.OTP, proof.pA, proof.pB, proof.pC, proof.pubSignals],
    )
  }

  public serialize(): string {
    return solidityPack(
      ["uint8", "uint256", "bytes"],
      [KeyType.OTP, this.root, this.serializeRoleWeight()],
    )
  }
}

export class KeyRecoveryOTP extends KeyBase {
  constructor(
    readonly inner: RecoveryOTPOptions,
    roleWeight: RoleWeight = GuardianRoleWeight,
  ) {
    super(roleWeight)
  }

  public get root(): bigint {
    return this.inner.hashes[2 ** (this.inner.layer + 1) - 2]
  }

  public get rootInBytes32(): string {
    return ethers.utils.hexZeroPad(ethers.utils.hexValue(this.root), 32)
  }

  public getHash(): string {
    return keccak256(
      solidityPack(
        ["uint8", "bytes32"],
        [KeyType.RecoveryOTP, this.rootInBytes32],
      ),
    )
  }

  public async generateSignature(digestHash: string): Promise<string> {
    const modulus = this.inner.time % 2 ** this.inner.layer

    const input = await generateZkOTPInput(
      this.inner.code,
      modulus,
      this.inner.hashes,
      this.inner.layer,
    )

    const proof = await generateZkProof(
      input,
      this.inner.pathWasm,
      this.inner.pathZkey,
    )
    proof.pubSignals[1] = this.inner.time.toString()

    return solidityPack(
      ["uint8", "uint256[2]", "uint256[2][2]", "uint256[2]", "uint256[2]"],
      [KeyType.RecoveryOTP, proof.pA, proof.pB, proof.pC, proof.pubSignals],
    )
  }

  public serialize(): string {
    return solidityPack(
      ["uint8", "uint256", "bytes"],
      [KeyType.RecoveryOTP, this.root, this.serializeRoleWeight()],
    )
  }
}

export class KeyJWT extends KeyBase {
  constructor(
    readonly inner: JWTOptions,
    roleWeight: RoleWeight = OwnerRoleWeight,
  ) {
    super(roleWeight)
  }

  public async generateSignature(digestHash: string): Promise<string> {
    const signed = await signerSign(digestHash, this.inner.ephemeralKeyPair)
    const callData = await groth16.exportSolidityCallData(
      this.inner.proof as any,
      ["0"],
    )
    const argv = callData
      .replace(/["[\]\s]/g, "")
      .split(",")
      .map((x) => BigInt(x).toString())
    const a = [argv[0], argv[1]]
    const b = [
      [argv[2], argv[3]],
      [argv[4], argv[5]],
    ]
    const c = [argv[6], argv[7]]

    let sig = solidityPack(["uint8", "bytes"], [KeyType.JWTZKProof, signed])
    sig = solidityPack(
      ["bytes", "uint256", "uint256[2]", "uint256[2][2]", "uint256[2]"],
      [sig, this.inner.deadline, a, b, c],
    )
    return sig
  }

  public getHash(): string {
    return keccak256(
      solidityPack(
        ["uint8", "bytes"],
        [KeyType.JWTZKProof, Buffer.from(this.inner.payload.sub)],
      ),
    )
  }

  public serialize(): string {
    return solidityPack(
      ["uint8", "uint24", "bytes32"],
      [KeyType.JWTZKProof, this.weights(), this.getHash()],
    )
  }
}
