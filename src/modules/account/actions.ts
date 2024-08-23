import { Action, stateInitial } from "./types";

export const CONTRACT_WALLET_AA = "CONTRACT_WALLET_AA";
export const GET_DATA_ACCOUNT = "ACCOUNT_DATA_ACCOUNT";
export const DATA_ACCOUNT_RESPONSE = "ACCOUNT_DATA_ACCOUNT_RESPONSE";
export const ACCOUNT_SIGNING = "ACCOUNT_ACCOUNT_SIGNING";
export const ACCOUNT_REQUEST_SIGN_OUT = "ACCOUNT_REQUEST_SIGN_OUT";
export const ACCOUNT_REQUEST_CONNECT_WALLET = "ACCOUNT_REQUEST_CONNECT_WALLET";
export const CLEANUP = "ACCOUNT_CLEANUP";

export function contractWalletAA(res: any | unknown): Action {
  return {
    type: CONTRACT_WALLET_AA,
    state: {
      contractWalletAA: res,
    },
  };
}

export function dataAccountResponse(res: any | unknown): Action {
  return {
    type: DATA_ACCOUNT_RESPONSE,
    state: {
      dataAccount: res,
    },
  };
}

export function setSigning(res: any | unknown): Action {
  return {
    type: ACCOUNT_SIGNING,
    state: {
      signing: res,
    },
  };
}

export function setRequestSignOut(res: any | unknown): Action {
  return {
    type: ACCOUNT_REQUEST_SIGN_OUT,
    state: {
      requestSignOut: res,
    },
  };
}

export function setRequestConnectWallet(res: any | unknown): Action {
  return {
    type: ACCOUNT_REQUEST_CONNECT_WALLET,
    state: {
      requestConnectWallet: res,
    },
  };
}

// export function getDataAccount(): Action {
//   return {
//     type: DATA_ACCOUNT_RESPONSE,
//   }
// }

export function cleanup(): Action {
  return {
    type: CLEANUP,
    state: stateInitial,
  };
}
