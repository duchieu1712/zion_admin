import { take, put, fork, select, call, all } from "redux-saga/effects";
import * as actions from "./actions";
import * as reducers from "./reducers";
import { DashboardStatistics, GetData } from "./types";
import * as graphql from "../graphql/index";
import marketConfig from "../../config/market";

function* getData() {
  const request: GetData = yield select(reducers.getData);
  const ret: DashboardStatistics = yield call(
    graphql.getDashboardData,
    marketConfig.contractNamespace,
    request,
  );
  yield put(actions.resetDataResponse() as any);
  yield put(actions.dataResponse(ret) as any);
}

function* actionGetDataListener() {
  while (true) {
    yield take(actions.GET_DATA);
    yield fork(getData);
  }
}

function* actionCleanupListener() {
  while (true) {
    yield take(actions.CLEANUP);
    yield put(actions.cleanup() as any);
  }
}

function* actionListener() {
  yield all([fork(actionGetDataListener), fork(actionCleanupListener)]);
}

export default function* root(): any {
  yield all([fork(actionListener)]);
}
