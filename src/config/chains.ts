import { IChainData } from "../common/types";

const Chains: IChainData[] = [
  {
    name: "ZION Network Testnet",
    shortName: "zion",
    chain: "smartchain",
    network: "testnet",
    chainId: 176923,
    networkId: 176923,
    rpcUrl: "https://devnet-rpc.zionx.network",
    blockTime: 3,
    explorer: "https://devnet-explorer.zionx.network/",
    nativeCurrency: {
      symbol: "zETH",
      name: "zETH",
      decimals: 18,
      contractNamespace: "",
    },
  },
];

export const ChainsWallet = [
  {
    name: "ZION Testnet",
    shortName: "zion",
    chain: "smartchain",
    network: "testnet",
    chainId: 176923,
    networkId: 176923,
    rpcUrl: "https://devnet-rpc.zionx.network",
    blockTime: 3,
    explorer: "https://devnet-explorer.zionx.network/",
    nativeCurrency: {
      symbol: "ETH",
      name: "ETH",
      decimals: 18,
      contractNamespace: "",
    },
  },
];

export default Chains;
