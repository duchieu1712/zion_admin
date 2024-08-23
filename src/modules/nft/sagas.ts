import { take, put, fork, select, call, all } from "redux-saga/effects";
import * as actions from "./actions";
import * as reducers from "./reducers";
import { GetDatas, GetMarketDatas } from "./types";
import { channel } from "redux-saga";
import * as graphql from "../graphql/index";
import { NftsData } from "../graphql/types";
import { Nft } from "../graphql/types/generated";
import marketConfig from "../../config/market";
import { SERVICE_ID } from "../../common/enum";
import * as walletActions from "../wallet/actions";
// import { RELOAD_DELAY } from '../../common/constants'

const jsonrpcResponseChannel = channel();
const getClaimablesSubscribeChannel = channel();

function* getMarketDatas() {
  const request: GetMarketDatas = yield select(reducers.getMarketDatas);
  if (
    request.serviceID == SERVICE_ID._9DNFT ||
    request.serviceID == SERVICE_ID._SOUL_REALM ||
    request.serviceID == SERVICE_ID._NARUTO
  ) {
    const ret: NftsData = yield call(
      graphql.getNftsData_9DNFT as any,
      marketConfig.contractNamespace,
      request.serviceID,
      request.account,
      null,
      request.filters,
    );
    yield put(actions.resetMarketDatasResponse() as any);
    yield put(actions.marketDatasResponse(ret) as any);
  } else if (request.serviceID == SERVICE_ID._MARSWAR) {
    const ret: NftsData = yield call(
      graphql.getNftsData_Marswar as any,
      marketConfig.contractNamespace,
      request.serviceID,
      request.account,
      null,
      request.filters,
    );
    yield put(actions.resetMarketDatasResponse() as any);
    yield put(actions.marketDatasResponse(ret) as any);
  } else if (
    request.serviceID == SERVICE_ID._FLASHPOINT ||
    request.serviceID == SERVICE_ID._FANTASY_DYNASTY
  ) {
    const ret: NftsData = yield call(
      graphql.getNftsData_Flashpoint as any,
      marketConfig.contractNamespace,
      request.serviceID,
      request.account,
      null,
      request.filters,
    );
    yield put(actions.resetMarketDatasResponse() as any);
    yield put(actions.marketDatasResponse(ret) as any);
  } else if (
    request.serviceID == SERVICE_ID._GALIXCITY ||
    request.serviceID == SERVICE_ID._RICHWORK_FARM_FAMILY ||
    request.serviceID == SERVICE_ID._ZION_SERVICE
  ) {
    const ret: NftsData = yield call(
      graphql.getNftsData_Galix as any,
      marketConfig.contractNamespace,
      request.serviceID,
      request.account,
      null,
      request.filters,
    );
    yield put(actions.resetMarketDatasResponse() as any);
    yield put(actions.marketDatasResponse(ret) as any);
  } else {
    const ret: NftsData = yield call(
      graphql.getNftsData_Galix as any,
      marketConfig.contractNamespace,
      request.serviceID,
      request.account,
      null,
      request.filters,
    );
    yield put(actions.resetMarketDatasResponse() as any);
    yield put(actions.marketDatasResponse(ret) as any);
  }
}

function* getDataOfferings() {
  const request = yield select(reducers.getOfferingDatas);
  let ret;
  if (
    request.serviceID == SERVICE_ID._9DNFT ||
    request.serviceID == SERVICE_ID._SOUL_REALM ||
    request.serviceID == SERVICE_ID._NARUTO
  ) {
    ret = yield call(
      graphql.getNftDataOffering_9DNFT,
      marketConfig.contractNamespace,
      request.serviceID,
      request.account,
      request.filters,
    );
  } else if (request.serviceID == SERVICE_ID._MARSWAR) {
    ret = yield call(
      graphql.getNftDataOffering_Marswar,
      marketConfig.contractNamespace,
      request.serviceID,
      request.account,
      request.filters,
    );
  } else if (
    request.serviceID == SERVICE_ID._FLASHPOINT ||
    request.serviceID == SERVICE_ID._FANTASY_DYNASTY
  ) {
    ret = yield call(
      graphql.getNftDataOffering_Flashpoint,
      marketConfig.contractNamespace,
      request.serviceID,
      request.account,
      request.filters,
    );
  } else if (
    request.serviceID == SERVICE_ID._GALIXCITY ||
    request.serviceID == SERVICE_ID._RICHWORK_FARM_FAMILY ||
    request.serviceID == SERVICE_ID._ZION_SERVICE
  ) {
    ret = yield call(
      graphql.getNftDataOffering_Galix,
      marketConfig.contractNamespace,
      request.serviceID,
      request.account,
      request.filters,
    );
  } else {
    ret = yield call(
      graphql.getNftDataOffering_Galix,
      marketConfig.contractNamespace,
      request.serviceID,
      request.account,
      request.filters,
    );
  }

  yield put(actions.resetOfferingDatasResponse() as any);
  yield put(actions.offeringDatasResponse(ret) as any);
}

// function* getDatas() {
//   const request: GetDatas = yield select(reducers.getDatas)
//   const ret: NftsData = yield call(
//     graphql.getNftsData,
//     marketConfig.contractNamespace,
//     null,
//     request.account,
//     request.filters
//   )
//   yield put(actions.resetDatasResponse())
//   yield put(actions.datasResponse(ret))
// }

function* getDatas() {
  const request: GetDatas = yield select(reducers.getDatas);
  if (
    request.serviceID == SERVICE_ID._9DNFT ||
    request.serviceID == SERVICE_ID._SOUL_REALM ||
    request.serviceID == SERVICE_ID._NARUTO
  ) {
    const ret: NftsData = yield call(
      graphql.getNftsData_9DNFT as any,
      marketConfig.contractNamespace,
      request.serviceID,
      null,
      request.account,
      request.filters,
    );
    yield put(actions.resetDatasResponse() as any);
    yield put(actions.datasResponse(ret) as any);
  } else if (request.serviceID == SERVICE_ID._MARSWAR) {
    const ret: NftsData = yield call(
      graphql.getNftsData_Marswar as any,
      marketConfig.contractNamespace,
      request.serviceID,
      null,
      request.account,
      request.filters,
    );
    yield put(actions.resetDatasResponse() as any);
    yield put(actions.datasResponse(ret) as any);
  } else if (
    request.serviceID == SERVICE_ID._FLASHPOINT ||
    request.serviceID == SERVICE_ID._FANTASY_DYNASTY
  ) {
    const ret: NftsData = yield call(
      graphql.getNftsData_Flashpoint as any,
      marketConfig.contractNamespace,
      request.serviceID,
      null,
      request.account,
      request.filters,
    );
    yield put(actions.resetDatasResponse() as any);
    yield put(actions.datasResponse(ret) as any);
  } else if (
    request.serviceID == SERVICE_ID._GALIXCITY ||
    request.serviceID == SERVICE_ID._RICHWORK_FARM_FAMILY ||
    request.serviceID == SERVICE_ID._ZION_SERVICE
  ) {
    const ret: NftsData = yield call(
      graphql.getNftsData_Galix as any,
      marketConfig.contractNamespace,
      request.serviceID,
      null,
      request.account,
      request.filters,
    );
    yield put(actions.resetDatasResponse() as any);
    yield put(actions.datasResponse(ret) as any);
  } else {
    const ret: NftsData = yield call(
      graphql.getNftsData_Galix as any,
      marketConfig.contractNamespace,
      request.serviceID,
      null,
      request.account,
      request.filters,
    );
    yield put(actions.resetDatasResponse() as any);
    yield put(actions.datasResponse(ret) as any);
  }
}

function* getData(): Generator<any> {
  const request: any = yield select(reducers.getData);
  let ret;
  if (
    request.serviceID == SERVICE_ID._9DNFT ||
    request.serviceID == SERVICE_ID._SOUL_REALM ||
    request.serviceID == SERVICE_ID._NARUTO
  ) {
    ret = yield call(
      graphql.getNftData_9DNFT,
      marketConfig.contractNamespace,
      request.serviceID,
      request.collection,
      request.tokenId,
    );
  } else if (request.serviceID == SERVICE_ID._MARSWAR) {
    ret = yield call(
      graphql.getNftData_Marswar,
      marketConfig.contractNamespace,
      request.serviceID,
      request.collection,
      request.tokenId,
    );
  } else if (
    request.serviceID == SERVICE_ID._FLASHPOINT ||
    request.serviceID == SERVICE_ID._FANTASY_DYNASTY
  ) {
    ret = yield call(
      graphql.getNftData_Flashpoint,
      marketConfig.contractNamespace,
      request.serviceID,
      request.collection,
      request.tokenId,
    );
  } else if (
    request.serviceID == SERVICE_ID._GALIXCITY ||
    request.serviceID == SERVICE_ID._RICHWORK_FARM_FAMILY ||
    request.serviceID == SERVICE_ID._ZION_SERVICE
  ) {
    ret = yield call(
      graphql.getNftData_Galix,
      marketConfig.contractNamespace,
      request.serviceID,
      request.collection,
      request.tokenId,
    );
  }
  yield put(actions.resetDataResponse() as any);
  yield put(actions.dataResponse(ret) as any);
}

function* getFilterNameOffferingDatas() {
  const request = yield select(reducers.getFilterNameOfferingDatas);
  let ret;
  if (
    request.serviceID == SERVICE_ID._9DNFT ||
    request.serviceID == SERVICE_ID._SOUL_REALM ||
    request.serviceID == SERVICE_ID._NARUTO
  ) {
    ret = yield call(
      graphql.getNftDataOffering_9DNFT,
      marketConfig.contractNamespace,
      request.serviceID,
      request.account,
      request.filters,
    );
  } else if (request.serviceID == SERVICE_ID._MARSWAR) {
    ret = yield call(
      graphql.getNftDataOffering_Marswar,
      marketConfig.contractNamespace,
      request.serviceID,
      request.account,
      request.filters,
    );
  } else if (
    request.serviceID == SERVICE_ID._FLASHPOINT ||
    request.serviceID == SERVICE_ID._FANTASY_DYNASTY
  ) {
    ret = yield call(
      graphql.getNftDataOffering_Flashpoint,
      marketConfig.contractNamespace,
      request.serviceID,
      request.account,
      request.filters,
    );
  } else if (
    request.serviceID == SERVICE_ID._GALIXCITY ||
    request.serviceID == SERVICE_ID._RICHWORK_FARM_FAMILY ||
    request.serviceID == SERVICE_ID._ZION_SERVICE
  ) {
    ret = yield call(
      graphql.getNftDataOffering_Galix,
      marketConfig.contractNamespace,
      request.serviceID,
      request.account,
      request.filters,
    );
  }
  if (ret != null && ret.bids != null) {
    const lstNfts: Nft[] = [];
    for (let i = 0; i < ret.bids.length; i++) {
      if (
        ret.bids[i] &&
        !lstNfts.some((e) => e.metadata.name == ret.bids[i]?.nft?.metadata?.name)
      ) {
        lstNfts.push(ret.bids[i].nft);
      }
    }
    yield put(actions.resetFilterNameOfferingDatasResponse() as any);
    yield put(actions.filterNameOfferingDatasResponse(lstNfts) as any);
  }
}

function* getFilterNameSellingDatas() {
  const request: GetDatas = yield select(reducers.getFilterNameSellingDatas);
  let ret;
  if (
    request.serviceID == SERVICE_ID._9DNFT ||
    request.serviceID == SERVICE_ID._SOUL_REALM ||
    request.serviceID == SERVICE_ID._NARUTO
  ) {
    ret = yield call(
      graphql.getNftsData_9DNFT as any,
      marketConfig.contractNamespace,
      request.serviceID,
      request.account,
      null,
      request.filters,
    );
  } else if (request.serviceID == SERVICE_ID._MARSWAR) {
    ret = yield call(
      graphql.getNftsData_Marswar as any,
      marketConfig.contractNamespace,
      request.serviceID,
      request.account,
      null,
      request.filters,
    );
  } else if (
    request.serviceID == SERVICE_ID._FLASHPOINT ||
    request.serviceID == SERVICE_ID._FANTASY_DYNASTY
  ) {
    ret = yield call(
      graphql.getNftsData_Flashpoint as any,
      marketConfig.contractNamespace,
      request.serviceID,
      request.account,
      null,
      request.filters,
    );
  } else if (
    request.serviceID == SERVICE_ID._GALIXCITY ||
    request.serviceID == SERVICE_ID._RICHWORK_FARM_FAMILY ||
    request.serviceID == SERVICE_ID._ZION_SERVICE
  ) {
    ret = yield call(
      graphql.getNftsData_Galix as any,
      marketConfig.contractNamespace,
      request.serviceID,
      request.account,
      null,
      request.filters,
    );
  }
  if (ret != null && ret.nfts != null) {
    const lstNfts: Nft[] = [];
    for (let i = 0; i < ret.nfts.length; i++) {
      if (ret.nfts[i] && !lstNfts.some((e) => e.metadata.name == ret.nfts[i].metadata.name)) {
        lstNfts.push(ret.nfts[i]);
      }
    }
    yield put(actions.resetFilterNameSellingDatasResponse() as any);
    yield put(actions.filterNameSellingDatasResponse(lstNfts) as any);
  }
}

function* getFilterNameListingDatas() {
  const request: GetDatas = yield select(reducers.getFilterNameDatas);
  let ret;
  if (
    request.serviceID == SERVICE_ID._9DNFT ||
    request.serviceID == SERVICE_ID._SOUL_REALM ||
    request.serviceID == SERVICE_ID._NARUTO
  ) {
    ret = yield call(
      graphql.getNftsData_9DNFT as any,
      marketConfig.contractNamespace,
      request.serviceID,
      null,
      request.account,
      request.filters,
    );
  } else if (request.serviceID == SERVICE_ID._MARSWAR) {
    ret = yield call(
      graphql.getNftsData_Marswar as any,
      marketConfig.contractNamespace,
      request.serviceID,
      null,
      request.account,
      request.filters,
    );
  } else if (
    request.serviceID == SERVICE_ID._FLASHPOINT ||
    request.serviceID == SERVICE_ID._FANTASY_DYNASTY
  ) {
    ret = yield call(
      graphql.getNftsData_Flashpoint as any,
      marketConfig.contractNamespace,
      request.serviceID,
      null,
      request.account,
      request.filters,
    );
  } else if (
    request.serviceID == SERVICE_ID._GALIXCITY ||
    request.serviceID == SERVICE_ID._RICHWORK_FARM_FAMILY ||
    request.serviceID == SERVICE_ID._ZION_SERVICE
  ) {
    ret = yield call(
      graphql.getNftsData_Galix as any,
      marketConfig.contractNamespace,
      request.serviceID,
      null,
      request.account,
      request.filters,
    );
  }
  if (ret != null && ret.nfts != null) {
    const lstNfts: Nft[] = [];
    for (let i = 0; i < ret.nfts.length; i++) {
      if (ret.nfts[i] && !lstNfts.some((e) => e.metadata.name == ret.nfts[i].metadata.name)) {
        lstNfts.push(ret.nfts[i]);
      }
    }
    yield put(actions.resetFilterNameDatasResponse() as any);
    yield put(actions.filterNameDatasResponse(lstNfts) as any);
  }
}

function* actionGetDataListener() {
  while (true) {
    yield take(actions.GET_DATA);
    yield fork(getData);
  }
}

function* actionGetDatasListener() {
  while (true) {
    yield take(actions.GET_DATAS);
    yield fork(getDatas);
  }
}

function* actionGetMarketDatasListener() {
  while (true) {
    yield take(actions.GET_MARKET_DATAS);
    yield fork(getMarketDatas);
  }
}

function* actionGetFilterNameDatasListener() {
  while (true) {
    yield take(actions.GET_FILTER_NAME_DATAS);
    yield fork(getFilterNameListingDatas);
  }
}

function* actionGetFilterNameSellingDatasListener() {
  while (true) {
    yield take(actions.GET_FILTER_NAME_SELLING_DATAS);
    yield fork(getFilterNameSellingDatas);
  }
}

function* actionGetFilterNameOfferingDatasListener() {
  while (true) {
    yield take(actions.GET_FILTER_NAME_OFFERING_DATAS);
    yield fork(getFilterNameOffferingDatas);
  }
}

function* actionGetDataOfferingsListener() {
  while (true) {
    yield take(actions.GET_OFFERING_DATAS);
    yield fork(getDataOfferings);
  }
}

function* getClaimablesSubscribeChannelListener(): Generator<any | unknown | never> {
  while (true) {
    const action: any = yield take(getClaimablesSubscribeChannel);
    yield put(action);
  }
}

function* jsonrpcResponseChannelListener(): Generator<any | unknown | never> {
  while (true) {
    const action: any = yield take(jsonrpcResponseChannel);
    yield put(action);
  }
}

function* actionCleanupListener() {
  while (true) {
    yield take(walletActions.CLEANUP);
    yield put(actions.cleanup() as any);
  }
}

function* actionListener() {
  yield all([
    fork(jsonrpcResponseChannelListener),
    fork(getClaimablesSubscribeChannelListener),
    fork(actionGetDataListener),
    fork(actionGetDatasListener),
    fork(actionGetMarketDatasListener),
    fork(actionGetFilterNameDatasListener),
    fork(actionGetFilterNameSellingDatasListener),
    fork(actionGetFilterNameOfferingDatasListener),
    fork(actionGetDataOfferingsListener),
    fork(actionCleanupListener),
  ]);
}

export default function* root(): any {
  yield all([fork(actionListener)]);
}
