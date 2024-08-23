import { ChainConfig, getChainId } from "../modules/wallet/utilities";
import { ENUM_ENDPOINT_RPC, NAMESPACE_DEPOSIT_WITHDRAW, SERVICE_ID } from "./enum";
import {
  IAssetData,
  IBalanceData,
  IChainData,
  ICollection,
  IContract,
  IEnpoint,
  IHotwallet,
  IMarket,
} from "./types";
import {
  IPFS_GATEWAY_9DNFT,
  IPFS_GATEWAY_GALIX,
  IPFS_ORIGIN_9DNFT,
  IPFS_ORIGIN_GALIX,
} from "../config/ipfs";
import {
  endpoints_GaliXCity,
  endpoints_NEMOWallet,
  endpoints_rpcAA,
  hotwallets,
} from "../config/kogi-api";

import { assets as Assets } from "../config/assets";
import { CHAINID_ETH_AA } from "./constants";
import Chains from "../config/chains";
import { ChainsRouter } from "../config/chains_routers";
import { ClassWithStaticMethod } from "./static";
import { Collections } from "../config/collections";
import { Nft } from "../modules/graphql/types/generated";
import coins from "../config/coins";
import contracts from "../config/contracts";
import { graphGateways } from "../config/graph-gateway";
import { isArray } from "lodash";

export const toIpfsGatewayUrl = (origin: string, serviceID: string | any): string => {
  if (
    serviceID == SERVICE_ID._9DNFT ||
    serviceID == SERVICE_ID._SOUL_REALM ||
    serviceID == SERVICE_ID._NARUTO
  ) {
    return origin
      .replace(IPFS_ORIGIN_9DNFT, IPFS_GATEWAY_9DNFT)
      .replace("ipfs://", IPFS_GATEWAY_9DNFT);
  } else if (serviceID == SERVICE_ID._GALIXCITY) {
    return origin
      .replace(IPFS_ORIGIN_GALIX, IPFS_GATEWAY_GALIX)
      .replace("ipfs://", IPFS_GATEWAY_GALIX);
  } else if (serviceID == SERVICE_ID._MARSWAR) {
    return origin
      .replace(IPFS_ORIGIN_GALIX, IPFS_GATEWAY_GALIX)
      .replace("ipfs://", IPFS_GATEWAY_GALIX);
  }
  return origin
    .replace(IPFS_ORIGIN_GALIX, IPFS_GATEWAY_GALIX)
    .replace("ipfs://", IPFS_GATEWAY_GALIX);
};

export const graphGatewayEndpointFromNamespace = (namespace: string): IEnpoint => {
  const chainId = getChainId();
  let ret;
  for (let i = 0; i < graphGateways.length; i++) {
    if (graphGateways[i].namespace == namespace) {
      for (let j = 0; j < graphGateways[i].endpoints.length; j++) {
        if (graphGateways[i].endpoints[j].chainId == chainId) {
          ret = graphGateways[i].endpoints[j];
        }
      }
    }
  }
  return ret;
};

export const endpointFromChainId = (chainId: number): IEnpoint => {
  for (let i = 0; i < endpoints_NEMOWallet.length; i++) {
    if (endpoints_NEMOWallet[i].chainId == chainId) return endpoints_NEMOWallet[i];
  }
  return {
    chainId: 0,
    endpoint: "",
  };
};

export const endpointContractFromChainIdRpc = (
  endpoint: ENUM_ENDPOINT_RPC,
  chainId: number,
): IEnpoint | undefined => {
  if (endpoint == ENUM_ENDPOINT_RPC._NEMO_WALLET) {
    return endpointContractFromChainId(chainId);
  } else if (endpoint == ENUM_ENDPOINT_RPC._GALIXCITY) {
    return endpointContractFromChainIdGaliXCity(chainId);
  }
};

export const endpointContractFromChainId = (chainId: number): IEnpoint => {
  for (let i = 0; i < endpoints_NEMOWallet.length; i++) {
    if (endpoints_NEMOWallet[i].chainId == chainId) return endpoints_NEMOWallet[i];
  }
  return {
    chainId: 0,
    endpoint: "",
  };
};

export const endpointContractFromChainIdGaliXCity = (chainId: number): IEnpoint => {
  for (let i = 0; i < endpoints_GaliXCity.length; i++) {
    if (endpoints_GaliXCity[i].chainId == chainId) return endpoints_GaliXCity[i];
  }
  return {
    chainId: 0,
    endpoint: "",
  };
};

export const endpoints_FetchrpcAA = (chainId: number): IEnpoint => {
  for (let i = 0; i < endpoints_rpcAA.length; i++) {
    if (endpoints_rpcAA[i].chainId == chainId) return endpoints_rpcAA[i];
  }
  return {
    chainId: 0,
    endpoint: "",
  };
};

export const contractConfigFromAddress = (address: string | any): IContract => {
  const chainId = getChainId();
  for (let i = 0; i < contracts.length; i++) {
    if (
      (contracts[i].address == address || contracts[i].address?.toLowerCase() == address) &&
      contracts[i].chainId == chainId
    )
      return contracts[i];
  }
  return {
    chainId: null,
    namespace: null,
    address: null,
    abi: null,
  };
};

export const collectionSlugFromAddress = (address: string): string => {
  const c = contractConfigFromAddress(address);
  for (let i = 0; i < Collections.length; i++) {
    if (Collections[i].contractNamespace == c.namespace) {
      return Collections[i].slug || "";
    }
  }
  return "";
};

export const graphGatewayEndpointFromNamespace_v2 = (
  namespace: string,
  serviceID: string | number,
): any => {
  // Disable multi Change
  const chainId = ClassWithStaticMethod.STATIC_DEFAULT_CHAINID;
  let ret: any = {
    chainId: 0,
    endpoint: null,
    serviceID: null,
    serviceName: "",
  };
  for (let i = 0; i < graphGateways.length; i++) {
    if (graphGateways[i].namespace == namespace) {
      for (let j = 0; j < graphGateways[i].endpoints.length; j++) {
        if (graphGateways[i].endpoints[j].chainId == chainId) {
          const e = graphGateways[i].endpoints[j];
          if (!isArray(e.endpoint)) continue;
          for (let it = 0; it < e.endpoint.length; it++) {
            if (e.endpoint[it].serviceID == serviceID) {
              ret = {
                ...e.endpoint[it],
                chainId: graphGateways[i].endpoints[j].chainId,
              };
            }
          }
        }
      }
    }
  }
  return ret;
};

export const contractConfigFromNamespace = (namespace: string | any): IContract => {
  const chainId = getChainId();
  for (let i = 0; i < contracts.length; i++) {
    if (contracts[i].namespace == namespace && contracts[i].chainId == chainId) return contracts[i];
  }
  return {
    chainId: null,
    namespace: null,
    address: null,
    abi: null,
  };
};

export const hotwalletConfigFromNamespace = (namespace: string | any): IHotwallet => {
  for (let i = 0; i < hotwallets.length; i++) {
    if (hotwallets[i].namespace == namespace) return hotwallets[i];
  }
  return {
    namespace: null,
    contractNamespace: null,
    assetContractNamespace: null,
  };
};

export const balancesFromWalletSaga = (res: any | unknown): IBalanceData[] => {
  const ret: IBalanceData[] = [];
  for (const namespace in res) {
    const asset: IAssetData = assetFromNamespace(namespace);
    if (res[namespace].balanceOf == undefined) continue;
    ret.push({
      assetData: asset,
      balance: res[namespace].balanceOf,
    });
  }
  return ret;
};

export function assetFromNamespace(namespace: any | unknown): IAssetData {
  for (let i = 0; i < Assets.length; i++) {
    if (Assets[i].contractNamespace == namespace) return Assets[i];
  }
  return {
    symbol: "",
    name: "",
    decimals: 0,
    contractNamespace: "",
    contractBridge: "",
    icon: null,
  };
}

export function explorerFromTxhashCogiChain(txHash: string): string {
  return ChainConfig(CHAINID_ETH_AA).explorer + "tx/" + txHash;
}

export function explorerFromAddress(address: any | unknown, chain_Id = null): string {
  return ChainConfig(chain_Id).explorer + "address/" + address;
}

export function explorerFromAddressCogiChain(address: any | unknown): string {
  return ChainConfig(ClassWithStaticMethod.ETH_AA_CHAINID).explorer + "address/" + address;
}

export function explorerFromTx(address: any | unknown): string {
  return ChainConfig().explorer + "tx/" + address;
}

export function explorerFromTxhash(txHash: string, chain_Id = null): string {
  return ChainConfig(chain_Id).explorer + "tx/" + txHash;
}

export function explorerFromTxCogiChain(address: any | unknown): string {
  return ChainConfig(ClassWithStaticMethod.ETH_AA_CHAINID).explorer + "tx/" + address;
}

export function getSymbolCoin_Network(address: string | any, network: number): any {
  const coin = coins.find(
    (e) => e.contract?.toLowerCase() == address?.toLowerCase() && e.chainID == network,
  );
  if (coin) {
    return {
      symbolCoin: coin?.symbol,
      nameCoin: coin?.name,
      // image: coin?.icon,
      decimals: coin?.decimals,
      address: coin?.contract,
    };
  }
  return {
    symbolCoin: "",
    nameCoin: "",
    image: "",
    decimals: 0,
  };
}

export const getCollectionByType = async (type: string, service_id: string): Promise<string> => {
  const chainId = getChainId();
  const collection = Collections.find(
    (e) => e.metadataNftType?.toLowerCase() == type.toLowerCase() && e.serviceID == service_id,
  );
  if (collection) {
    for (let i = 0; i < contracts.length; i++) {
      if (
        contracts[i].namespace == collection.contractNamespace &&
        contracts[i].chainId == chainId &&
        contracts[i].service_id == service_id
      )
        return await contracts[i].address!.toLowerCase();
    }
  }
  return "";
};

export const collectionsAddressFromSlugs = (
  slugs: string[],
  serviceID: string | number,
): string[] => {
  const ret: string[] = [];
  for (let i = 0; i < Collections.length; i++) {
    if (
      slugs.some((e) => e.toLowerCase() == Collections[i].slug!.toLowerCase()) &&
      Collections[i].serviceID == serviceID
    ) {
      const c = contractConfigFromNamespace(Collections[i].contractNamespace);
      if (c.address != null) {
        ret.push(c.address);
      }
    }
  }
  return ret;
};

export const getChainConnect = (): IChainData | null => {
  const chainId = ClassWithStaticMethod.STATIC_DEFAULT_CHAINID;
  for (let i = 0; i < Chains.length; i++) {
    if (Chains[i].chainId == chainId) return Chains[i];
  }
  return null;
};

export const isAllowChainIdRouter = (chainId: number): boolean => {
  for (let i = 0; i < ChainsRouter.length; i++) {
    if (
      ChainsRouter[i].pathname == window.location.pathname &&
      ChainsRouter[i].chainids.includes(chainId)
    )
      return true;
  }
  return false;
};

export const collectionFromAddress = (address: string): ICollection => {
  for (let i = 0; i < Collections.length; i++) {
    if (
      address ==
      contractConfigFromNamespace(Collections[i].contractNamespace)?.address?.toLowerCase()
    ) {
      return Collections[i];
    }
  }
  return {
    name: null,
    symbol: null,
    contractNamespace: null,
    icon: null,
    isBurnToUse: false,
    serviceID: null,
  };
};

export const getContractNamespace = (market: IMarket, serviceID: number | string): any => {
  if (serviceID == SERVICE_ID._ZION_SERVICE) return market.contractNamespace_ZIONxService;
  return "";
};

export const getNamespaceWithdraw_Deposit = (chainID: number): NAMESPACE_DEPOSIT_WITHDRAW => {
  switch (chainID) {
    case 5555:
    case 76923:
      return NAMESPACE_DEPOSIT_WITHDRAW._NEMO;
    case 97:
    case 56:
      return NAMESPACE_DEPOSIT_WITHDRAW._BSC;
    case 43114:
    case 43113:
      return NAMESPACE_DEPOSIT_WITHDRAW._FUJI;
    default:
      return NAMESPACE_DEPOSIT_WITHDRAW._NEMO;
  }
};

export const getNetworkByChainID = (chainID: number): any => {
  let res;
  for (let i = 0; i < Chains.length; i++) {
    if (Chains[i].chainId == chainID) {
      res = Chains[i];
      break;
    }
  }
  return res;
};

export const getAddressOwnerNFT = (nft: Nft): string => {
  if (!nft) return "";
  if (nft?.isTradable) {
    return nft?.seller?.id;
  } else {
    return nft?.owner?.id;
  }
};
