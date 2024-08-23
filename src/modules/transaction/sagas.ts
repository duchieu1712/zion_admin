import { take, put, fork, select, call, all } from "redux-saga/effects";
import * as actions from "./actions";
import * as reducers from "./reducers";
import * as graphql from "../graphql/index";
import marketConfig from "../../config/market";
import { GetTransactionDatas } from "./types";

function* getDataTransaction() {
  const request: GetTransactionDatas = yield select(reducers.getDataTransactions);
  const ret = yield call(
    graphql.getTransactionData,
    marketConfig.contractNamespace,
    request?.filters,
    request?.serviceID,
    request?.account,
  );

  yield put(actions.resetDataResponseTransaction() as any);
  yield put(actions.dataResponseTransaction(ret) as any);
}

function* actionGetDataTransactionListener() {
  while (true) {
    yield take(actions.GET_DATA_TRANSACTION);
    yield fork(getDataTransaction);
  }
}

function* actionCleanupListener() {
  while (true) {
    yield take(actions.CLEANUP);
    yield put(actions.cleanup() as any);
  }
}

function* actionListener() {
  yield all([fork(actionGetDataTransactionListener), fork(actionCleanupListener)]);
}

export default function* root(): any {
  yield all([fork(actionListener)]);
}
