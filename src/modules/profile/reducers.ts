import { RootState } from "..";
import * as actions from "./actions";
import { Action, State, stateInitial } from "./types";

export const onActionChangePW = (state: RootState) => state.profile.onActionChangePW;
export const onActionLinkAccount = (state: RootState) => state.profile.onActionLinkAccount;
export const onActionLogin = (state: RootState) => state.profile.onActionLogIn;
export const onActionRegister = (state: RootState) => state.profile.onActionRegister;
export const onActionConnect = (state: RootState) => state.profile.onActionConnect;
export const onActionCreatePIN = (state: RootState) => state.profile.onActionCreatePIN;
export const dataClaim = (state: RootState) => state.profile.getDataClaim;
export const dataClaimOnRequest = (state: RootState) => state.profile.dataClaimOnRequest;
//
export const getDataAuthenticators_Enabled = (state: RootState) =>
  state.profile.getDataAuthenticators_Enabled;
export const dataAuthenticators_Enabled = (state: RootState) =>
  state.profile.dataAuthenticators_Enabled;
export const dataExtract_Secured_Methods = (state: RootState) =>
  state.profile.dataExtract_Secured_Methods;

export const dataRefer = (state: RootState) => state.profile.getDataRefer;

export const dataGetFriendsResponse = (state: RootState) => state.profile.dataGetFriendsResponse;
export const dataGetInfoResponse = (state: RootState) => state.profile.dataGetInfoResponse;
export const confirm_2fa = (state: RootState) => state.profile.confirm_2fa;

export const dump = (state: RootState) => state.profile;

function profileReducer(state: State = stateInitial, action: Action): State {
  const _state = {
    ...state,
  };
  switch (action.type) {
    case actions.GET_DATA_CLAIM:
      _state.dataClaimOnRequest!++;
      break;
    case actions.DATA_CLAIM_RESPONSE:
      _state.dataClaimOnRequest!--;
      break;
    default:
      break;
  }

  switch (action.type) {
    case actions.ACTION_CHANGE_PW:
    case actions.ACTION_LINK_ACCOUNT:
    case actions.ACTION_LOG_IN:
    case actions.ACTION_REGISTER:
    case actions.ACTION_CONNECT:
    case actions.ACTION_CREATE_PIN:
    case actions.GET_DATA_CLAIM:
    case actions.DATA_CLAIM_RESPONSE:
    case actions.GET_DATA_REFER:
    case actions.GET_FRIENDS:
    case actions.DATA_GET_FRIENDS_RESPONSE:
    case actions.GET_INFO:
    case actions.DATA_GET_INFO_RESPONSE:
    case actions.GET_AUTHENTICATORS_ENABLED:
    case actions.AUTHENTICATORS_ENABLED_RESPONSE:
    case actions.RESET_AUTHENTICATORS_ENABLED_RESPONSE:
    case actions.GET_EXTRACT_SECURED_METHODS:
    case actions.EXTRACT_SECURED_METHODS_RESPONSE:
    case actions.RESET_EXTRACT_SECURED_METHODS:
    case actions.CONFIRM_2FA:
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
