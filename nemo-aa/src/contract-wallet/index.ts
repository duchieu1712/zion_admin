"use strict"

import { ContractWalletOperator, JWTOptions, UserOperation } from "../types"
import { KeyJWT, PINCode } from "../signer"
import {
  Contract,
  PopulatedTransaction,
  Wallet,
  BigNumber,
  Signer,
  constants,
  PayableOverrides,
  CallOverrides,
  ethers,
} from "ethers"
import FactoryAbi from "../abi/Factory"
import EntryPointAbi from "../abi/EntryPoint"
import AccountAbi from "../abi/Account"
import {
  hexlify,
  randomBytes,
  solidityPack,
  toUtf8Bytes,
} from "ethers/lib/utils"
import { DefaultsForUserOp } from "../constants"
import { fillAndSign } from "./sign"
import { TransactionResponse } from "@ethersproject/abstract-provider"
import {
  makePINCodeHolder,
  getProviderHashed,
  isSameAddress,
  fillUserOp,
} from "../utils"
import { AddressZero, Zero } from "@ethersproject/constants"

export class Operator {
  private _factory
  private _entrypoint

  constructor(
    operator: ContractWalletOperator,
    signer: Signer,
    readonly beneficiaries: string[],
  ) {
    this._factory = new Contract(operator.factoryAddress, FactoryAbi, signer)
    this._entrypoint = new Contract(
      operator.entrypointAddress,
      EntryPointAbi,
      signer,
    )
  }

  static getEphemeralKeyPair(endpoint: string, privateKey?: string) {
    if (!endpoint) throw new Error("Endpoint is required")
    if (!privateKey) {
      const ephemeralKeyPair = Wallet.createRandom().connect(
        new ethers.providers.JsonRpcProvider(endpoint),
      )
      return ephemeralKeyPair
    } else {
      const ephemeralKeyPair = new Wallet(privateKey).connect(
        new ethers.providers.JsonRpcProvider(endpoint),
      )
      return ephemeralKeyPair
    }
  }

  public getInitCode(
    sub: string,
    salt: string,
    iss: string,
    aud: string,
  ): string {
    const subInHex = hexlify(toUtf8Bytes(sub))
    const provider = getProviderHashed(iss, aud)
    const callData = this.factory.interface.encodeFunctionData(
      "createAccount",
      [subInHex, salt, provider],
    )
    const ret = solidityPack(
      ["address", "bytes"],
      [this.factory.address, callData],
    )
    return ret
  }

  public async getAddress(
    sub: string,
    salt: string,
    iss: string,
    aud: string,
    options?: CallOverrides,
  ): Promise<string> {
    const subInHex = hexlify(toUtf8Bytes(sub))
    const provider = getProviderHashed(iss, aud)
    const args = options
      ? [subInHex, salt, provider, options]
      : [subInHex, salt, provider]
    return await this._factory.getAddress(...args)
  }

  public async createWallet(
    sub: string,
    salt: string,
    iss: string,
    aud: string,
    options?: PayableOverrides,
  ): Promise<string> {
    const provider = getProviderHashed(iss, aud)
    const args = options
      ? [hexlify(toUtf8Bytes(sub)), salt, provider, options]
      : [hexlify(toUtf8Bytes(sub)), salt, provider]
    const receipt = await this._factory
      .createAccount(...args)
      .then((tx: any) => tx.wait())

    return receipt.events.find(
      ({ event }: { event: string }) => event === "NemoAccountCreated",
    ).args[0]
  }

  public connect(signer: Signer): Operator {
    this._factory = this._factory.connect(signer)
    this._entrypoint = this._entrypoint.connect(signer)
    return this
  }

  public async isCreated(
    address: string,
    options?: CallOverrides,
  ): Promise<boolean> {
    try {
      const contract = new Contract(address, AccountAbi, this._factory.signer)
      const args = options ? [options] : []
      return (
        this._factory.address.toLowerCase() ==
        (await contract.factory(...args)).toLowerCase()
      )
    } catch (error) {
      return false
    }
  }

  public get signer(): Signer {
    return this.entryPoint.signer
  }

  public get entryPoint(): Contract {
    return this._entrypoint
  }

  public get factory(): Contract {
    return this._factory
  }

  public pickUpBeneficiary(): string {
    return this.beneficiaries[
      Math.floor(Math.random() * (this.beneficiaries.length - 1))
    ]
  }
}

export class ContractWallet {
  private _contract: Contract
  private pinCode: PINCode
  private jwtProof: KeyJWT

  constructor(
    contractWalletAddress: string,
    readonly operator: Operator,
  ) {
    this._contract = new Contract(
      contractWalletAddress,
      AccountAbi,
      this.entryPoint.signer,
    )
  }

  public get signer(): Signer {
    return this.operator.signer
  }

  public get address(): string {
    return this.contract.address
  }

  public get entryPoint(): Contract {
    return this.operator.entryPoint
  }

  public get factory(): Contract {
    return this.operator.factory
  }

  public get contract(): Contract {
    return this._contract
  }

  public get sub(): string {
    return this.jwtProof.inner.payload.sub
  }

  public get salt(): string {
    return this.jwtProof.inner.salt
  }

  public get iss(): string {
    return this.jwtProof.inner.payload.iss
  }

  public get aud(): string {
    return this.jwtProof.inner.payload.aud
  }

  public async getRequiredPrefund(): Promise<BigNumber> {
    const requiredGas = DefaultsForUserOp.verificationGasLimit.add(
      DefaultsForUserOp.preVerificationGas,
    )
    const ret = requiredGas.mul(DefaultsForUserOp.maxFeePerGas)

    return ret
  }

  public async isReadonly(): Promise<boolean> {
    return !(await this.isWriteable())
  }

  public async isWriteable(): Promise<boolean> {
    return this.operator.isCreated(this.contract.address)
  }

  public async nonce(): Promise<BigNumber> {
    return await this.contract.nonce()
  }

  public async getPINCodeHolder(): Promise<string> {
    return await this.contract.pinCode()
  }

  public async hasPINCode(): Promise<boolean> {
    return !isSameAddress(await this.getPINCodeHolder(), AddressZero)
  }

  public async validateAndSetPINCode(
    code: string,
    setOnchain = true,
    options?: PayableOverrides,
  ) {
    if (!this.jwtProof) throw new Error("Uninitialized JWT")
    if (!(await this.operator.isCreated(this.address)))
      throw new Error("Wallet not created")

    const pinCodeHolder = makePINCodeHolder(code, this.jwtProof.inner.salt)
    let pinCodeOnchain = await this.getPINCodeHolder()

    if (setOnchain && !isSameAddress(pinCodeHolder.address, pinCodeOnchain)) {
      const tx = await this.onchainUpdatePINCode(code, options)
      await tx.wait()
      pinCodeOnchain = await this.getPINCodeHolder()
    }

    if (!isSameAddress(pinCodeHolder.address, pinCodeOnchain)) {
      throw new Error("Invalid PIN Code")
    }

    this.pinCode = new PINCode(pinCodeHolder)

    return this
  }

  public setJWT(options: JWTOptions): ContractWallet {
    this.jwtProof = new KeyJWT(options)
    return this
  }

  public async create(
    options?: PayableOverrides,
    chainId?: number,
  ): Promise<TransactionResponse> {
    if (!chainId) {
      chainId = (await this.entryPoint.provider.getNetwork()).chainId
    }

    if (!this.jwtProof) throw new Error("Uninitialized JWT")
    if (await this.isWriteable()) throw new Error("Wallet already exists")

    const op1: UserOperation = {
      sender: this.contract.address,
      nonce: Zero,
      initCode: this.operator.getInitCode(
        this.sub,
        this.salt,
        this.iss,
        this.aud,
      ),
      signature: randomBytes(1),
    }

    if (options) {
      if (options.maxFeePerGas)
        op1.maxFeePerGas = BigNumber.from(options.maxFeePerGas)
      if (options.maxPriorityFeePerGas)
        op1.maxPriorityFeePerGas = BigNumber.from(options.maxPriorityFeePerGas)
    }

    const op = await fillUserOp(op1, this.entryPoint)

    const handleOpsTransaction =
      await this.entryPoint.populateTransaction.handleOps(
        [op],
        this.operator.pickUpBeneficiary(),
      )

    if (options) {
      if (options.gasLimit)
        handleOpsTransaction.gasLimit = BigNumber.from(options.gasLimit)
      if (options.gasPrice)
        handleOpsTransaction.gasPrice = BigNumber.from(options.gasPrice)
    }

    try {
      return await this.signer.sendTransaction(handleOpsTransaction)
    } catch (error: any) {
      const hash = error.returnedHash
      return <TransactionResponse>{
        hash: hash,
        nonce: null,
        gasLimit: null,
        gasPrice: null,
        data: null,
        value: null,
        chainId: null,
        confirmations: 0,
        from: null,
        wait: (confirmations?: number) => {
          return this.signer.provider.waitForTransaction(hash, confirmations)
        },
      }
    }
  }

  public async onchainUpdatePINCode(
    code: string,
    options?: PayableOverrides,
    chainId?: number,
  ): Promise<TransactionResponse> {
    if (!chainId) {
      chainId = (await this.entryPoint.provider.getNetwork()).chainId
    }

    if (!this.jwtProof) throw new Error("Uninitialized JWT")
    if (!(await this.operator.isCreated(this.address)))
      throw new Error("Wallet not created")
    if ((await this.hasPINCode()) && !this.pinCode)
      throw new Error("Old PIN Code not setup")

    const pinCodeHolder = makePINCodeHolder(code, this.jwtProof.inner.salt)

    const txExecData = this.contract.interface.encodeFunctionData(
      "updatePinCode",
      [pinCodeHolder.address],
    )
    const signers = this.pinCode
      ? [this.pinCode, this.jwtProof]
      : [this.jwtProof]

    const op1: UserOperation = {
      sender: this.contract.address,
      nonce: await this.nonce(),
      callData: txExecData,
    }

    if (options) {
      if (options.maxFeePerGas)
        op1.maxFeePerGas = BigNumber.from(options.maxFeePerGas)
      if (options.maxPriorityFeePerGas)
        op1.maxPriorityFeePerGas = BigNumber.from(options.maxPriorityFeePerGas)
    }

    const op = await fillAndSign(op1, signers, this.entryPoint, chainId)

    const handleOpsTransaction =
      await this.entryPoint.populateTransaction.handleOps(
        [op],
        this.operator.pickUpBeneficiary(),
      )

    if (options) {
      if (options.gasLimit)
        handleOpsTransaction.gasLimit = BigNumber.from(options.gasLimit)
      if (options.gasPrice)
        handleOpsTransaction.gasPrice = BigNumber.from(options.gasPrice)
    }

    try {
      return await this.signer.sendTransaction(handleOpsTransaction)
    } catch (error: any) {
      const hash = error.returnedHash
      return <TransactionResponse>{
        hash: hash,
        nonce: null,
        gasLimit: null,
        gasPrice: null,
        data: null,
        value: null,
        chainId: null,
        confirmations: 0,
        from: null,
        wait: (confirmations?: number) => {
          return this.signer.provider.waitForTransaction(hash, confirmations)
        },
      }
    }
  }

  public async populateTransaction(
    transaction: PopulatedTransaction,
    chainId?: number,
  ): Promise<PopulatedTransaction> {
    if (!transaction.to) {
      throw new Error("Transaction to is undefined")
    }
    if (!chainId) {
      chainId = (await this.entryPoint.provider.getNetwork()).chainId
    }

    const txValue = transaction.value ? transaction.value : constants.Zero
    const txData = transaction.data ? transaction.data : "0x"
    const txExecData = this.contract.interface.encodeFunctionData("execute", [
      transaction.to,
      txValue,
      txData,
    ])

    const op1: UserOperation = {
      sender: this.contract.address,
      nonce: await this.nonce(),
      callData: txExecData,
    }

    if (transaction.maxFeePerGas) op1.maxFeePerGas = transaction.maxFeePerGas
    if (transaction.maxPriorityFeePerGas)
      op1.maxPriorityFeePerGas = transaction.maxPriorityFeePerGas

    const signers = this.pinCode
      ? [this.pinCode, this.jwtProof]
      : [this.jwtProof]
    const op = await fillAndSign(op1, signers, this.entryPoint, chainId)

    const ret = await this.entryPoint.populateTransaction.handleOps(
      [op],
      this.operator.pickUpBeneficiary(),
    )

    if (transaction.gasLimit) ret.gasLimit = transaction.gasLimit
    if (transaction.gasPrice) ret.gasPrice = transaction.gasPrice

    // eip-1559 transaction do not support in this version
    // if (transaction.maxFeePerGas) ret.maxFeePerGas = transaction.maxFeePerGas
    // if (transaction.maxPriorityFeePerGas) ret.maxPriorityFeePerGas = transaction.maxPriorityFeePerGas

    return ret
  }

  public async sendTransaction(
    transaction: PopulatedTransaction,
    chainId?: number,
  ): Promise<TransactionResponse> {
    // if (this.owner == null) {
    //   throw new Error("Owner is undefined")
    // }
    const handleOpsTransaction = await this.populateTransaction(
      transaction,
      chainId,
    )

    try {
      return await this.signer.sendTransaction(handleOpsTransaction)
    } catch (error: any) {
      const hash = error.returnedHash
      return <TransactionResponse>{
        hash: hash,
        nonce: null,
        gasLimit: null,
        gasPrice: null,
        data: null,
        value: null,
        chainId: null,
        confirmations: 0,
        from: null,
        wait: (confirmations?: number) => {
          return this.signer.provider.waitForTransaction(hash, confirmations)
        },
      }
    }
  }
}
