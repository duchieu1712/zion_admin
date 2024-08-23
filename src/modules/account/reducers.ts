import { RootState } from "..";
import * as actions from "./actions";
import { Action, State, stateInitial } from "./types";

export const contractWalletAA = (state: RootState) => state.account.contractWalletAA;
export const dataAccount = (state: RootState) => state.account.dataAccount;
export const requestSignOut = (state: RootState) => state.account.requestSignOut;
export const requestConnectWallet = (state: RootState) => state.account.requestConnectWallet;
export const signing = (state: RootState) => state.account.signing;
export const dump = (state: RootState) => state.account;

function profileReducer(state: State = stateInitial, action: Action): State {
  const _state = {
    ...state,
  };
  switch (action.type) {
    case actions.CONTRACT_WALLET_AA:
    case actions.GET_DATA_ACCOUNT:
    case actions.DATA_ACCOUNT_RESPONSE:
    case actions.ACCOUNT_REQUEST_SIGN_OUT:
    case actions.ACCOUNT_REQUEST_CONNECT_WALLET:
    case actions.ACCOUNT_SIGNING:
    case actions.CLEANUP:
      return {
        ..._state,
        ...action.state,
      };
    default:
      return {
        ...state,
      };
  }
}

export default profileReducer;
