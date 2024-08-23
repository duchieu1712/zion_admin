import { take, put, fork, all, call } from "redux-saga/effects";
import * as actions from "./actions";
import { toast } from "react-toastify";
import { appState } from "../index";
import { ContractWallet } from "nemo-aa/lib/contract-wallet";

const getAuthenticators_Enabled = async () => {
  try {
    const store = appState();
    const contractWalletAA: ContractWallet = store.account.contractWalletAA;
    if (!contractWalletAA) {
      return null;
    }
    const _hasPinCode = await contractWalletAA.hasPINCode();
    return {
      fund_password: _hasPinCode,
    };
  } catch (e) {
    return null;
  }
};

function* getAuthenticators_enabled() {
  try {
    const res = yield call(getAuthenticators_Enabled);
    yield put(actions.resetDataAuthenticators_EnabledResponse() as any);
    yield put(actions.dataAuthenticators_EnabledResponse(res ?? []) as any);
  } catch (e: any) {
    toast.error(e.message);
  }
}

const getExtract_Secured_Methods = async () => {
  // try {
  //   return await rpcExecCogiChain({
  //     method: 'extract_secured_methods',
  //     params: [],
  //   })
  // } catch (e) {
  //   return null
  // }
};

function* getExtract_secured_methods() {
  try {
    const res = yield call(getExtract_Secured_Methods);
    yield put(actions.resetExtract_Secured_MethodsResponse() as any);
    yield put(actions.dataExtract_Secured_MethodsResponse(res ?? []) as any);
  } catch (e: any) {
    toast.error(e.message);
  }
}

function* actionGetAuthenticators_Enabled() {
  while (true) {
    yield take(actions.GET_AUTHENTICATORS_ENABLED);
    yield fork(getAuthenticators_enabled);
  }
}

function* actionExtract_secured_methods() {
  while (true) {
    yield take(actions.GET_EXTRACT_SECURED_METHODS);
    yield fork(getExtract_secured_methods);
  }
}

function* actionCleanupListener() {
  while (true) {
    yield take(actions.CLEANUP);
    yield put(actions.cleanup() as any);
  }
}

function* actionListener() {
  yield all([
    fork(actionCleanupListener),
    fork(actionGetAuthenticators_Enabled),
    fork(actionExtract_secured_methods),
  ]);
}

export default function* root(): any {
  yield all([fork(actionListener)]);
}
