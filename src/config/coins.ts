import { CHAINID_ETH_AA, DEFAULT_CHAINID } from "../common/constants";

import { ICONS } from "../theme/theme";
import { TYPE_DEPOSIT_WITHDRAW } from "../common/enum";
import { assets } from "./assets";

const coins = [
  {
    chainID: 176923,
    contract: "0x00000000000000000000000000000000000000",
    symbol: "zETH",
    namespace: "eth_coin",
    name: "zETH",
    decimals: 18,
    contractBridge: "erc20_bridge",
    native: true,
    offchain: false,
    hot_wallet: "",
  },
  // {
  //   chainID: 176923,
  //   contract: '0x61fBbDfd6EE187d8e86692292Dd4703Af3F81881',
  //   symbol: 'TST3',
  //   namespace: 'tst3_coin',
  //   name: 'TestToken3 Coin',
  //   decimals: 18,
  //   contractBridge: 'erc20_bridge',
  //   native: false,
  //   offchain: false,
  //   hot_wallet: '',
  // },
  {
    chainID: 176923,
    contract: "0x8AE2c8F89A63FC6bADB8cC3bF9489D6Ef64e2526",
    symbol: "zUSDC",
    namespace: "usdc_coin",
    name: "zUSDC",
    decimals: 18,
    contractBridge: "erc20_bridge",
    native: false,
    offchain: false,
    hot_wallet: "",
  },
  {
    chainID: 176923,
    contract: "0x7e701A98D9408c5609D0a409723A313D3739f721",
    symbol: "NEMO",
    namespace: "nemo_coin",
    name: "NEMO",
    decimals: 18,
    contractBridge: "erc20_bridge",
    native: false,
    offchain: false,
    hot_wallet: "",
  },
  {
    chainID: 176923,
    contract: "0xb3FB3fD03b2F48a07f0dBA717Ecc0084995795a3",
    symbol: "ZION",
    namespace: "zion_coin",
    name: "ZION",
    decimals: 6,
    contractBridge: "erc20_bridge",
    native: false,
    isErc404: false,
    offchain: false,
    hot_wallet: "",
  },
  {
    chainID: 176923,
    contract: "0x9C7CaFA89Ef572Bf4B34CF67445C8119537ba71e",
    symbol: "wZION",
    namespace: "wzion_coin",
    name: "wZION",
    decimals: 6,
    contractBridge: "erc20_bridge",
    native: false,
    isErc404: true,
    offchain: false,
    hot_wallet: "",
  },
];

export default coins;

export interface TokenInfo {
  id: string;
  name: string;
  symbol: string;
  logo: string | any;
  balance?: number;
  decimals?: number;
  native?: boolean;
  offchain?: boolean;
  common?: boolean;
  allowSwap?: boolean | any;
  typeDeposit_Withdraw?: TYPE_DEPOSIT_WITHDRAW[] | any;
  namespace?: any;
  contract?: any;
}

export type ChainTokens = Record<number, TokenInfo[]>;

export interface ChainInfo {
  id: number;
  name: string;
  logo: string;
}

export class ChainManager {
  private static readonly CHAINS: ChainInfo[] = [
    {
      id: DEFAULT_CHAINID,
      name: "COGI Chain",
      logo: "/tokens/cogi.png",
    },
    // {
    //   id: 1,
    //   name: 'Ethereum',
    //   logo: '/ethereum.png'
    // },
  ];

  public static list(): ChainInfo[] {
    return this.CHAINS;
  }
}

export class TokenManager {
  private static readonly TOKENS: ChainTokens = {
    [CHAINID_ETH_AA]: coins
      .filter((e: any) => e.chainID == CHAINID_ETH_AA)
      .map((e: any) => {
        return {
          ...e,
          id: e.contract,
          name: e.name,
          symbol: e.symbol,
          decimals: e.decimals,
          logo: ICONS[e.symbol.toLowerCase()],
          native: e.native,
          offchain: e.offchain,
          common: e.common,
          contract: e.contract,
          allowSwap: assets.find((v) => v.symbol == e.symbol)?.allowSwap,
          typeDeposit_Withdraw: assets.find((v) => v.symbol == e.symbol)?.typeDeposit_Withdraw,
          namespace: e.namespace,
        };
      }),
  };

  public static list(chainId: number): TokenInfo[] {
    return this.TOKENS[chainId];
  }

  public static getToken(chainId: number, tokenId: string): TokenInfo | null {
    const tokens = this.TOKENS[chainId] || [];
    const found = tokens.filter((i) => i.id === tokenId);
    return found.length > 0 ? found[0] : null;
  }
}
