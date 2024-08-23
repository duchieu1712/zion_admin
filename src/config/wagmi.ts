// import { avalanche, bsc, mainnet, polygon, goerli } from 'wagmi/chains'

import { avalanche, avalancheFuji, bsc, bscTestnet, mainnet } from "@wagmi/core/chains";
import { createConfig, http } from "@wagmi/core";
import { injected, metaMask, walletConnect } from "@wagmi/connectors";

import { INFURA_ID } from "@/common/constants";
import { createClient } from "viem";

// import { INFURA_ID } from "../common/constants";


// import { infuraProvider } from "wagmi/providers/infura";
// import { publicProvider } from "wagmi/providers/public";



// const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [mainnet, avalanche, avalancheFuji, bsc, bscTestnet],
//   [infuraProvider({ apiKey: INFURA_ID }), publicProvider()],
// );

// Set up wagmi config

const walletConnector = walletConnect({
  projectId: process.env.WALLET_CONNECTION_PROJECTID as string,
  showQrModal: true,
});

const metamaskConnector = metaMask({
  infuraAPIKey: INFURA_ID,
  injectProvider: true,
});

const injectedConnector = injected({
  shimDisconnect: true,
  target: "metaMask",
  unstable_shimAsyncInject:true
});

export const configWagmi = createConfig({
  chains: [mainnet, avalanche, avalancheFuji, bsc, bscTestnet],
  ssr: true,
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
  connectors: [metamaskConnector, injectedConnector, walletConnector],
  // publicClient,
  // webSocketPublicClient,
});
