import { PROD } from "@/common/constants";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import type { Chain } from "@web3modal/scaffold-utils/ethers";

export const cf_Chains = [
  {
    name: "Testnet Avalanche C-Chain",
    shortName: "avax_testnet",
    chain: "smartchain",
    network: "testnet",
    chainId: 43113,
    networkId: 43113,
    rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
    blockTime: 3,
    explorer: "https://testnet.snowtrace.io/",
    nativeCurrency: {
      symbol: "AVAX",
      name: "AVAX",
      decimals: 18,
      contractNamespace: "",
    },
  },
  {
    name: "Avalanche C-Chain",
    shortName: "avax",
    chain: "smartchain",
    network: "mainnet",
    chainId: 43114,
    networkId: 43114,
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
    blockTime: 3,
    explorer: "https://snowtrace.io/",
    nativeCurrency: {
      symbol: "AVAX",
      name: "AVAX",
      decimals: 18,
      contractNamespace: "",
    },
  },
  {
    name: "BNB Smart Chain",
    shortName: "bsc",
    chain: "smartchain",
    network: "mainnet",
    chainId: 56,
    networkId: 56,
    rpcUrl: "https://bsc-dataseed.binance.org",
    blockTime: 3,
    explorer: "https://bscscan.com/",
    nativeCurrency: {
      symbol: "BNB",
      name: "BNB",
      decimals: 18,
      contractNamespace: "",
    },
  },
  {
    name: "BNB Smart Chain Testnet",
    shortName: "bsc",
    chain: "smartchain",
    network: "testnet",
    chainId: 97,
    networkId: 97,
    rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    blockTime: 3,
    explorer: "https://testnet.bscscan.com/",
    nativeCurrency: {
      symbol: "BNB",
      name: "BNB",
      decimals: 18,
      contractNamespace: "",
    },
  },
  {
    name: "Sepolia",
    shortName: "Sepolia",
    chain: "smartchain",
    network: "testnet",
    chainId: 11155111,
    networkId: 11155111,
    rpcUrl: "https://eth-sepolia.public.blastapi.io",
    blockTime: 3,
    explorer: "https://sepolia.etherscan.io/",
    nativeCurrency: {
      symbol: "ETH",
      name: "ETH",
      decimals: 18,
      contractNamespace: "",
    },
  },
  {
    name: "ZION Testnet",
    shortName: "zion",
    chain: "smartchain",
    network: "testnet",
    chainId: 176923,
    networkId: 176923,
    rpcUrl: "https://torii.zionx.network",
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

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "7df138699f4be6a5abd5f67a225dde0d";

// 2. Set chains

// const mainnet = {
//   chainId: 1,
//   name: 'Ethereum',
//   currency: 'ETH',
//   explorerUrl: 'https://etherscan.io',
//   rpcUrl: 'https://cloudflare-eth.com',
// }

const chainList: Chain[] = cf_Chains.map((e) => ({
  chainId: e.chainId,
  name: e.name,
  currency: e.nativeCurrency.symbol,
  explorerUrl: e.explorer,
  rpcUrl: e.rpcUrl,
}));

// 3. Create a metadata object
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: PROD ? "http://localhost:3000" : "", // origin must match your domain & subdomain
  icons: ["/images/metamask.png"],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  defaultChainId: 1,
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: chainList,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

export function Web3Modal({ children }: React.PropsWithChildren) {
  return children;
}
