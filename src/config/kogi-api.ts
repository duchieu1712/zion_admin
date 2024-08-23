import { IEnpoint, IHotwallet } from "../common/types";

export const endpoints_NEMOWallet: IEnpoint[] = [
  // NEMO Wallet
  {
    chainId: 176923,
    endpoint: "https://rpc.nemoverse.io/nemo-wallet-testnet",
  },
  {
    chainId: 76923,
    endpoint: "https://rpc.nemoverse.io/nemo-wallet",
  },
];

export const endpoints_GaliXCity: IEnpoint[] = [
  // COGI
  {
    chainId: 5555,
    endpoint: "https://rpc.nemoverse.io/galixcity-v2-testnet",
  },
  {
    chainId: 76923,
    endpoint: "https://rpc.nemoverse.io/galixcity-v2",
  },
];

export const endpoints_rpcAA: IEnpoint[] = [
  {
    chainId: 176923,
    // endpoint: 'https://devnet-rpc.zionx.network',
    endpoint: "https://torii.zionx.network",
  },
];

export const hotwallets: IHotwallet[] = [
  {
    namespace: "nemo_hotwallet",
    contractNamespace: "erc20_bridge",
    assetContractNamespace: "nemo_coin",
  },
  {
    namespace: "gosu_hotwallet",
    contractNamespace: "erc20_bridge",
    assetContractNamespace: "gosu_coin",
  },
];

export const hotwalletsReceiveToken: IHotwallet[] = [
  {
    namespace: "nemo_hotwallet",
    contractNamespace: "erc20_bridge",
    assetContractNamespace: "nemo_coin",
  },
  {
    namespace: "",
    contractNamespace: "erc20_bridge",
    assetContractNamespace: "eth_coin",
  },
  {
    namespace: "",
    contractNamespace: "erc20_bridge",
    assetContractNamespace: "usdt_coin",
  },
];

export const hotwalletsErc20: IHotwallet[] = [
  {
    namespace: "usdt_hotwallet",
    contractNamespace: "erc20_bridge",
    assetContractNamespace: "usdt_coin",
  },
  {
    namespace: "tst3_hotwallet",
    contractNamespace: "erc20_bridge",
    assetContractNamespace: "tst3_coin",
  },
];
