// import { avalanche, bsc, mainnet, polygon, goerli } from 'wagmi/chains'
import { avalanche, avalancheFuji, bsc, bscTestnet, mainnet } from "wagmi/chains";
import { configureChains, createConfig } from "wagmi";

import { INFURA_ID } from "../common/constants";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WalletConnectLegacyConnector } from "@wagmi/core/connectors/walletConnectLegacy";
import { infuraProvider } from "@wagmi/core/providers/infura";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, avalanche, avalancheFuji, bsc, bscTestnet],
  [infuraProvider({ apiKey: INFURA_ID }), publicProvider()],
);

// Set up wagmi config
export const configWagmi = createConfig({
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({
      chains,
      options: {
        shimDisconnect: true,
        UNSTABLE_shimOnConnectSelectAccount: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: process.env.WALLET_CONNECTION_PROJECTID,
        showQrModal: true,
      },
    }),
    new WalletConnectLegacyConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});
