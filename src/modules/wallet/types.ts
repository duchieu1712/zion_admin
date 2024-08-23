import { CHAINID_ETH_AA } from "../../common/constants";
import { Contract } from "ethers";
import { ISignaturePersonal } from "../../common/types";

export enum ErrorCode {
  ConnectWrongNetwork = -500,
  ConnectUserCancel = -499,
  ConnectUser_AccountWeb = -404,
}

export type ContractCallRequest = {
  namespace: string;
  method: string;
  params: any[];
};

export type WalletContract = {
  namespace: string;
  contract: Contract;
};

export type State = {
  web3Modal?: any;
  provider?: any;
  web3Provider?: any;
  address?: string | null;
  chainId?: number | null;
  userAction?: string | null;
  contractCallRequest?: any;
  contractCallResponse?: Record<string, Record<string, any>> | null;
  contractCallMetamaskRequest?: any;
  contractCallMetamaskResponse?: Record<string, Record<string, any>> | null;
  contractBatchRequest?: any;
  contractBatchResponse?: Record<string, Record<string, any>> | null;
  contracts?: WalletContract[] | null;
  contractsNetworkMetamask?: WalletContract[] | null;
  signature?: ISignaturePersonal | null;
  connecting?: boolean;
  connected?: boolean;
  errorCode?: ErrorCode | null;
  reloadData?: boolean;
  infoSupport?: any;
};

export type Action = {
  type: string | null;
  state?: State;
};

export const stateInitial: State = {
  web3Modal: null,
  provider: null,
  web3Provider: null,
  address: null,
  chainId: CHAINID_ETH_AA,
  userAction: null,
  contractCallRequest: null,
  contractCallResponse: null,
  contracts: null,
  signature: null,
  connecting: false,
  connected: false,
  errorCode: null,
  reloadData: false,
  infoSupport: null,
};

export const actionInitial: Action = {
  type: null,
  state: stateInitial,
};
