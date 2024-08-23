import { CHAINID_ETH_AA as DEFAULT_CHAINID_ETH_AA } from "../common/constants";
import { IChainDataRouter } from "../common/types";

export enum ChainIDs {
  _preAvax = 43113,
  _avax = 43114,
  _prebsc = 97,
  _bsc = 56,
  preCogi = 5555,
  Cogi = 76923,
  rinkBy = 4,
  Ether = 1,
}

export const ChainsRouter: IChainDataRouter[] = [
  {
    pathname: "/about-us",
    chainids: Object.entries(ChainIDs).map(([_, value]) => value),
    default_chain: DEFAULT_CHAINID_ETH_AA,
  },
  {
    pathname: "/dashboard",
    chainids: Object.entries(ChainIDs).map(([_, value]) => value),
    default_chain: DEFAULT_CHAINID_ETH_AA,
  },
  {
    pathname: "/",
    chainids: Object.entries(ChainIDs).map(([_, value]) => value),
    default_chain: DEFAULT_CHAINID_ETH_AA,
  },
  {
    pathname: "/inventory",
    chainids: Object.entries(ChainIDs).map(([_, value]) => value),
    default_chain: DEFAULT_CHAINID_ETH_AA,
  },
  {
    pathname: "/marketplace",
    chainids: Object.entries(ChainIDs).map(([_, value]) => value),
    default_chain: DEFAULT_CHAINID_ETH_AA,
  },
  {
    pathname: "/marketplace/[collection]/[id]",
    chainids: Object.entries(ChainIDs).map(([_, value]) => value),
    default_chain: DEFAULT_CHAINID_ETH_AA,
  },
  {
    pathname: "/ZIONXWallet",
    chainids: Object.entries(ChainIDs).map(([_, value]) => value),
    default_chain: DEFAULT_CHAINID_ETH_AA,
  },
  {
    pathname: "/news/[news]",
    chainids: Object.entries(ChainIDs).map(([_, value]) => value),
    default_chain: DEFAULT_CHAINID_ETH_AA,
  },
  {
    pathname: "/news",
    chainids: Object.entries(ChainIDs).map(([_, value]) => value),
    default_chain: DEFAULT_CHAINID_ETH_AA,
  },
  {
    pathname: "/privacy_policy",
    chainids: Object.entries(ChainIDs).map(([_, value]) => value),
    default_chain: DEFAULT_CHAINID_ETH_AA,
  },
  {
    pathname: "/product",
    chainids: Object.entries(ChainIDs).map(([_, value]) => value),
    default_chain: DEFAULT_CHAINID_ETH_AA,
  },

  {
    pathname: "/security",
    chainids: Object.entries(ChainIDs).map(([_, value]) => value),
    default_chain: DEFAULT_CHAINID_ETH_AA,
  },
  {
    pathname: "/term",
    chainids: Object.entries(ChainIDs).map(([_, value]) => value),
    default_chain: DEFAULT_CHAINID_ETH_AA,
  },
  {
    pathname: "/transfer_token",
    chainids: Object.entries(ChainIDs).map(([_, value]) => value),
    default_chain: DEFAULT_CHAINID_ETH_AA,
  },
];
