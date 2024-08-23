import { BigNumberish, type Contract } from "ethers";
import { TYPE_DEPOSIT_WITHDRAW } from "./enum";

export interface IError {
  code: number;
  message: string;
  data?: {
    code: number;
    data: string;
    message: string;
  };
}

export interface IApprove {
  contract: Contract;
  owner: string;
  spender: string;
  amount: BigNumberish; //in wei
}

export interface ICogiId {
  chainId: number;
  endpoint: string;
}

export interface ILotteryId {
  chainId: number;
  endpoint: string;
}

export interface IMarket {
  contractNamespace: string;
  contractNamespace_ZIONxService: string;
  currencyNamespace: string;
  currencyNamespaceCogi: string;
}

export interface INFT {
  id: string;
  tokenUri?: string;
  metadata?: INFTMetaData;
  contractNamespace: string;
}

export interface INFTMetaData {
  name: string | null;
  description: string | null;
  image: string | null;
  attributes: any[] | null;
}

export const iNFTMetaDataInitial: INFTMetaData = {
  name: null,
  description: null,
  image: null,
  attributes: null,
};

export interface ICollection {
  name: string | null;
  symbol: string | null;
  contractNamespace: string | null;
  icon?: any;
  slug?: string;
  metadataNftType?: string;
  isBurnToUse: boolean;
  serviceID: any;
}

export interface IContractRelay {
  method: string;
  namespace: string;
  params: any[];
}

export interface IEnpoint {
  chainId: number;
  endpoint: string;
  endpointWs?: string;
}

export interface IGraphGateway {
  namespace: string;
  endpoints: IEnpoint[];
}

export interface IHotwallet {
  namespace: string | null;
  contractNamespace: string | null;
  assetContractNamespace: string | null;
}

export interface IContract {
  chainId: number | null;
  namespace: string | null;
  address: string | null;
  abi: string | Array<string> | null;
  service_id?: string;
}

// export interface ISignature {
//   nonce: number
//   deadline: number
//   signature: string
// }

export interface ISignaturePersonal {
  nonce?: number;
  deadline?: number;
  message?: string;
  signature?: string;
}

export interface IAssetData {
  symbol: string | null;
  name: string | null;
  decimals: number | null;
  contractNamespace: string | null;
  contractBridge?: string | null;
  icon?: any | null;
  icon_9d?: any | null;
  native?: boolean | null;
  isErc404?: boolean | null;
  allowSwap?: boolean | null;
  typeDeposit_Withdraw?: TYPE_DEPOSIT_WITHDRAW[];
}

export interface IAssetDataNFT {
  symbol: string | null;
  name: string | null;
  decimals: number | null;
  contractNamespace: string | null;
  contractBridge?: string | null;
  icon?: any | null;
  icon_9d?: any | null;
  serviceID?: any | null;
}

export interface IChainData {
  name: string | null;
  shortName: string | null;
  chain: string | null;
  network: string | null;
  chainId: number | null;
  networkId: number | null;
  rpcUrl: string | null;
  blockTime?: number | null;
  explorer?: string | null;
  nativeCurrency: IAssetData | null;
}

export interface ITokenVestingConfig {
  namespace: string;
  chainId: number;
  name: string;
  shortName: string;
  address: string;
  tokenAddress: string;
  symbol: string;
}

export interface IClaimState {
  available: string;
  claimed: string;
  claimable: string;
  total: string;
  symbol: string;
}

export const claimStateInitial: IClaimState = {
  available: "0.0",
  claimed: "0.0",
  claimable: "0.0",
  total: "0.0",
  symbol: "COGI",
};

export interface ITransactionData {
  hash: string;
  timestamp: number;
  kind: number;
  method: number;
  amount: number;
  status: number;
  assetData: IAssetData;
  hotwalletNamespace?: string; //same as hotwallet contract namespace
  sender_or_receiver?: string;
}

export interface IBalanceData {
  balance: string;
  pendingBalance?: string;
  avaiableBalance?: string;
  assetData: IAssetData;
  hotwalletNamespace?: string; //same as hotwallet contract namespace
  allowance?: Record<string, string>; //{spender: amount}
}

export interface IBalanceDataCountDowwn {
  balance: string;
  hotwalletNamespace?: string;
  timeCountDown?: number;
  isEdit?: boolean;
}

export const eip712SignatureToAccount = {
  types: {
    EIP712Domain: [
      {
        name: "name",
        type: "string",
      },
      {
        name: "version",
        type: "string",
      },
    ],
    SignatureToAccount: [
      {
        name: "nonce",
        type: "uint256",
      },
      {
        name: "deadline",
        type: "uint256",
      },
    ],
  },
  primaryType: "SignatureToAccount",
  domain: {
    name: "Signature To Account",
    version: "2",
  },
  message: {
    nonce: 0,
    deadline: 0,
  },
};

export interface DataAccount {
  user_id?: string;
  wallet_address?: string[];
  public_address?: string;
  nemo_address?: string;
  email?: string;
  telegram?: string;
  nonce?: string;
  metamask_linked?: boolean;
  email_verified?: boolean;
  my_refer_id?: string;
  refer_id?: string;
  phone?: string;
  phone_verified?: boolean;
  signature: any;
}

export interface IAssetBridge {
  image?: string;
  name?: string;
}

export interface IAssetStake {
  stake: string;
  reward: IAssetStakeReward[];
}

export interface IAssetStakeReward {
  type: string;
  name: string;
  description: string;
  image: string;
}

export interface IAssetBoxStake {
  id: string;
  symbol: string;
  name: string;
  chainID: number;
}

export interface IAssetMysteryBox {
  id: string;
  symbol: string;
  router: number;
  name: string;
  chainID: number;
  namespace: string;
}

export interface IAssetAirDrop {
  id: string;
  name: string;
  openTime: string;
  closeTime: string;
  chainID: number;
  image: string;
  token?: string;
  amount?: string;
  signature?: string;
  claimed?: number;
}

export type AssetInfo = {
  address?: string;
  bridge_address?: string;
  name?: string;
  symbol?: string;
  image?: string;
  kind?: string;
  decimals?: number;
};

export interface IAssetZap {
  address: string;
  chainID: number;
  ratio: number;
  coinZap: IAssetCoinZap[];
}

export interface IAssetCoinZap {
  address: string;
  symbol: string;
  decimals: number;
}

export interface LandInfo {
  color: string;
  comment: string;
  dev_point: string;
  icon: string;
  name: string;
  landid: number;
  level: number;
  nextsmtime: number;
  status: number;
  unclaimed_crytal: string;
  unclaimed_electricity: string;
  unclaimed_fuel: string;
  unclaimed_metal: string;
  unclaimed_tokens: string;
  cd_info: any;
  cid: string;
  sale_info: SaleInfo;
}

export interface SaleInfo {
  price: number;
  status: number;
}

export interface IAssetMysBox {
  symbol: string;
  reward: IAssetMysBoxReward[];
}

export interface IRuleMystery {
  levelMys: string;
  totalLevelLand: string;
  rate_SSS: string;
  rate_S: string;
  rate_A: string;
  rate_B: string;
  rate_C: string;
  rate_D: string;
  cooldown: string;
}
export interface IAssetMysBoxReward {
  type?: string;
  name?: string;
  description?: string;
  rarity?: string;
  ratio?: string;
  amount?: string;
  image?: string;
}

export interface IView {
  view: boolean;
  back?: boolean;
}

export interface IChainDataRouter {
  pathname: string;
  chainids: any[];
  default_chain?: number;
}

export type SymbolCoin = "zUSDC" | "USDC" | "NEMO" | "ZION" | "wZION" | "zETH";
