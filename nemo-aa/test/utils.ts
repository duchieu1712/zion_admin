import { BigNumber, Wallet, constants, providers } from "ethers"
import { arrayify, hexlify, keccak256, randomBytes, sha256, solidityPack, toUtf8Bytes } from "ethers/lib/utils"

export const CHAIN_ID = 5555
export const RPC_URL = "https://rpc.nemoverse.io/cogi-testnet"

const provider = new providers.JsonRpcProvider(
    RPC_URL,
    CHAIN_ID
)

export const SOMEBODY = new Wallet("0xa71c8ba83ccd7cddb0e6ae2afde10bb4cff7022464d55b8152ee323a4d47c581", provider)