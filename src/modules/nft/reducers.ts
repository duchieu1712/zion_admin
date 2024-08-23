import { RootState } from "..";
import * as walletActions from "../wallet/actions";
import * as actions from "./actions";
import { Action, State, stateInitial } from "./types";

export const getClaimables = (state: RootState) => state.nft.getClaimables;
export const claimablesResponse = (state: RootState) => state.nft.claimablesResponse;

export const requestClaim = (state: RootState) => state.nft.requestClaim;
export const requestClaimResponse = (state: RootState) => state.nft.requestClaimResponse;

export const cancelClaim = (state: RootState) => state.nft.cancelClaim;
export const cancelClaimResponse = (state: RootState) => state.nft.cancelClaimResponse;

export const getAvailables = (state: RootState) => state.nft.getAvailables;
export const availablesResponse = (state: RootState) => state.nft.availablesResponse;

export const getData = (state: RootState) => state.nft.getData;
export const dataOnRequest = (state: RootState) => state.nft.dataOnRequest;
export const dataResponse = (state: RootState) => state.nft.dataResponse;

export const getDatas = (state: RootState) => state.nft.getDatas;
export const datasOnRequest = (state: RootState) => state.nft.datasOnRequest;
export const datasResponse = (state: RootState) => state.nft.datasResponse;

export const getMarketDatas = (state: RootState) => state.nft.getMarketDatas;
export const marketDatasOnRequest = (state: RootState) => state.nft.marketDatasOnRequest;
export const marketDatasResponse = (state: RootState) => state.nft.marketDatasResponse;

export const getFilterNameDatas = (state: RootState) => state.nft.getFilterNameDatas;
export const filterNameDatasOnRequest = (state: RootState) => state.nft.filterNameDatasOnRequest;
export const filterNameDatasResponse = (state: RootState) => state.nft.filterNameDatasResponse;

export const getFilterNameSellingDatas = (state: RootState) => state.nft.getFilterNameSellingDatas;
export const filterNameSellingDatasOnRequest = (state: RootState) =>
  state.nft.filterNameSellingDatasOnRequest;
export const filterNameSellingDatasResponse = (state: RootState) =>
  state.nft.filterNameSellingDatasResponse;

export const getFilterNameOfferingDatas = (state: RootState) =>
  state.nft.getFilterNameOfferingDatas;
export const filterNameOfferingDatasOnRequest = (state: RootState) =>
  state.nft.filterNameOfferingDatasOnRequest;
export const filterNameOfferingDatasResponse = (state: RootState) =>
  state.nft.filterNameOfferingDatasResponse;

export const getOfferingDatas = (state: RootState) => state.nft.getOfferingDatas;
export const offeringDatasOnRequest = (state: RootState) => state.nft.offeringDatasOnRequest;
export const offeringDatasResponse = (state: RootState) => state.nft.offeringDatasResponse;

export const jsonrpcResponse = (state: RootState) => state.nft.jsonrpcResponse;
export const dump = (state: RootState) => state.nft;

function nftReducer(state: State = stateInitial, action: Action): State {
  const _state = {
    ...state,
  };
  switch (action.type) {
    case actions.GET_DATA:
      _state.dataOnRequest!++;
      break;
    case actions.DATA_RESPONSE:
      _state.dataOnRequest!--;
      break;
    case actions.GET_DATAS:
      _state.datasOnRequest!++;
      break;
    case actions.DATAS_RESPONSE:
      _state.datasOnRequest!--;
      break;
    case actions.GET_MARKET_DATAS:
      _state.marketDatasOnRequest!++;
      break;
    case actions.MARKET_DATAS_RESPONSE:
      _state.marketDatasOnRequest!--;
      break;
    case actions.GET_FILTER_NAME_DATAS:
      _state.filterNameDatasOnRequest!++;
      break;
    case actions.FILTER_NAME_DATAS_RESPONSE:
      _state.filterNameDatasOnRequest!--;
      break;
    case actions.GET_FILTER_NAME_SELLING_DATAS:
      _state.filterNameSellingDatasOnRequest!++;
      break;
    case actions.FILTER_NAME_SELLING_DATAS_RESPONSE:
      _state.filterNameSellingDatasOnRequest!--;
      break;
    case actions.GET_FILTER_NAME_OFFERING_DATAS:
      _state.filterNameOfferingDatasOnRequest!++;
      break;
    case actions.FILTER_NAME_OFFERING_DATAS_RESPONSE:
      _state.filterNameOfferingDatasOnRequest!--;
      break;
    case actions.GET_OFFERING_DATAS:
      _state.offeringDatasOnRequest!++;
      break;
    case actions.OFFERING_DATAS_RESPONSE: {
      _state.offeringDatasOnRequest!--;
      break;
    }
    default:
      break;
  }

  switch (action.type) {
    case actions.GET_CLAIMABLES:
    case actions.CLAIMABLES_RESPONSE:
    case actions.RESET_CLAIMABLES_RESPONSE:
    case actions.REQUEST_CLAIM:
    case actions.REQUEST_CLAIM_RESPONSE:
    case actions.RESET_REQUEST_CLAIM_RESPONSE:
    case actions.CANCEL_CLAIM:
    case actions.CANCEL_CLAIM_RESPONSE:
    case actions.RESET_CANCEL_CLAIM_RESPONSE:
    case actions.GET_AVAILABLES:
    case actions.AVAILABLES_RESPONSE:
    case actions.GET_DATA:
    case actions.DATA_RESPONSE:
    case actions.RESET_DATA_RESPONSE:
    case actions.GET_DATAS:
    case actions.DATAS_RESPONSE:
    case actions.RESET_DATAS_RESPONSE:
    case actions.GET_MARKET_DATAS:
    case actions.MARKET_DATAS_RESPONSE:
    case actions.RESET_MARKET_DATAS_RESPONSE:
    case actions.GET_FILTER_NAME_DATAS:
    case actions.FILTER_NAME_DATAS_RESPONSE:
    case actions.RESET_FILTER_NAME_DATAS_RESPONSE:
    case actions.GET_FILTER_NAME_SELLING_DATAS:
    case actions.FILTER_NAME_SELLING_DATAS_RESPONSE:
    case actions.RESET_FILTER_NAME_SELLING_DATAS_RESPONSE:
    case actions.GET_FILTER_NAME_OFFERING_DATAS:
    case actions.FILTER_NAME_OFFERING_DATAS_RESPONSE:
    case actions.RESET_FILTER_NAME_OFFERING_DATAS_RESPONSE:
    case actions.GET_OFFERING_DATAS:
    case actions.OFFERING_DATAS_RESPONSE:
    case actions.RESET_OFFERING_DATAS_RESPONSE:
    case actions.JSONRPC_RESPONSE:
    case actions.CLEANUP:
      return {
        ..._state,
        ...action.state,
      };
    case walletActions.RESET_WEB3_PROVIDER:
      return {
        ...stateInitial,
      };
    default:
      return {
        ...state,
      };
  }
}

export default nftReducer;
