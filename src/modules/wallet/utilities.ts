import * as reducers from "./reducers";

import Chains from "../../config/chains";
import { ClassWithStaticMethod } from "../../common/static";
import { Contract } from "ethers";
import { IChainData } from "../../common/types";
import { WalletContract } from "./types";
import { appState } from "..";
import { cast } from "../../common/utilities";
import coins from "../../config/coins";
import contracts from "../../config/contracts";

export function providerCall(
  provider: any | unknown,
  method: any | unknown,
  params: any | unknown,
): Promise<any> {
  return new Promise((accept, reject) => {
    provider?.sendAsync({ method: method, params: params }, function (err, result) {
      if (err) {
        reject(err);
      } else if (result.error) {
        reject(result.error);
      } else {
        accept(result.result);
      }
    });
  });
}

// export const getChainId = (): number => {
//   return ClassWithStaticMethod.NEMO_WALLET_CHAINID
//   const ret = reducers.selectedChainId(appState())
//   // return ret > 0 ? ret : DEFAULT_CHAINID
//   return ret > 0 ? ret : ClassWithStaticMethod.STATIC_DEFAULT_CHAINID
// }

// export const getChainId_V2 = (): number => {
//   return ClassWithStaticMethod.STATIC_DEFAULT_CHAINID
//   const ret = reducers.selectedChainId(appState())
//   return ret > 0 ? ret : ClassWithStaticMethod.STATIC_DEFAULT_CHAINID
// }
export const getChainId = (): number => {
  return ClassWithStaticMethod.ETH_AA_CHAINID;
};

export const ChainConfig = (chain_Id: any = null): IChainData => {
  let chainId = ClassWithStaticMethod.STATIC_DEFAULT_CHAINID;
  if (chain_Id != null) {
    chainId = chain_Id;
  }

  for (let i = 0; i < Chains.length; i++) {
    if (Chains[i].chainId == chainId) return Chains[i];
  }
  return {
    name: null,
    shortName: null,
    chain: null,
    network: null,
    chainId: null,
    networkId: null,
    rpcUrl: null,
    nativeCurrency: {
      symbol: null,
      name: null,
      decimals: null,
      contractNamespace: null,
    },
  };
};

export const WalletContractFromAddress = async (address: string): Promise<WalletContract> => {
  const Contracts: WalletContract[] = reducers.contracts(appState());
  for (let i = 0; i < Contracts?.length; i++) {
    if (address.toLowerCase() == (await Contracts[i].contract.getAddress())?.toLowerCase())
      return Contracts[i];
  }
  return cast<WalletContract>(null);
};

export const WalletContractFromNamespace = (namespace: string): WalletContract => {
  const Contracts: WalletContract[] = reducers.contracts(appState());
  for (let i = 0; i < Contracts?.length; i++) {
    if (namespace == Contracts[i].namespace) return Contracts[i];
  }
  return cast<WalletContract>(null);
};

export const ContractFromAddressAllNetwork = async (namespace: string): Promise<Contract> => {
  if (ClassWithStaticMethod.STATIC_DEFAULT_CHAINID == ClassWithStaticMethod.ETH_AA_CHAINID) {
    return await ContractFromAddressCogiChain(namespace);
  } else {
    return await ContractFromAddress(namespace);
  }
};

export const ContractFromAddressCogiChain = async (address: string): Promise<Contract> => {
  const Contracts: WalletContract[] = reducers.contracts(appState());
  for (let i = 0; i < Contracts?.length; i++) {
    if (address.toLowerCase() == (await Contracts[i].contract.getAddress())?.toLowerCase())
      return Contracts[i].contract;
  }
  return cast<Contract>(null);
};

export const ContractFromAddress = async (address: string): Promise<Contract> => {
  const ContractsNetworkMetamask: WalletContract[] = reducers.contractsNetworkMetamask(appState());
  for (let i = 0; i < ContractsNetworkMetamask?.length; i++) {
    if (
      address.toLowerCase() ==
      (await ContractsNetworkMetamask[i].contract.getAddress())?.toLowerCase()
    )
      return ContractsNetworkMetamask[i].contract;
  }
  return cast<Contract>(null);
};

export const ContractFromNamespaceAllNetwork = (namespace: string): Contract => {
  if (ClassWithStaticMethod.STATIC_DEFAULT_CHAINID == ClassWithStaticMethod.ETH_AA_CHAINID) {
    return ContractFromNamespaceCogiChain(namespace);
  } else {
    return ContractFromNamespace(namespace);
  }
};

export const ContractFromNamespace = (namespace: string): Contract => {
  const ContractsNetworkMetamask: WalletContract[] = reducers.contractsNetworkMetamask(appState());
  for (let i = 0; i < ContractsNetworkMetamask?.length; i++) {
    if (namespace == ContractsNetworkMetamask[i].namespace)
      return ContractsNetworkMetamask[i].contract;
  }
  return cast<Contract>(null);
};

export const ContractFromNamespaceCogiChain = (namespace: string): Contract => {
  const Contracts = reducers.contracts(appState()) as WalletContract[];
  for (let i = 0; i < Contracts?.length; i++) {
    if (namespace == Contracts[i].namespace) {
      return Contracts[i].contract;
    }
  }
  return cast<Contract>(null);
};

export const ContractFromNamespaceConfig = (namespace: string, chainId: number): Contract => {
  for (let i = 0; i < contracts?.length; i++) {
    if (namespace == contracts[i].namespace && chainId == contracts[i].chainId)
      return new Contract(contracts[i].address!, contracts[i].abi!);
  }
  return cast<Contract>(null);
};

export const NamespaceFromAddress = async (address: string): Promise<string> => {
  const Contracts: WalletContract[] = reducers.contracts(appState());
  for (let i = 0; i < Contracts?.length; i++) {
    if (address.toLowerCase() == (await Contracts[i].contract.getAddress())?.toLowerCase())
      return Contracts[i].namespace;
  }
  return "";
};

export const ListAddresdFromNamespace = (namespace: string): any => {
  return coins.filter((e) => e.namespace == namespace);
};
