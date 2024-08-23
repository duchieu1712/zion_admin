import * as actions from "./actions";
import * as reducers from "./reducers";

import { Action, ContractCallRequest, ErrorCode, WalletContract } from "./types";
import { Contract, JsonRpcProvider, ethers } from "ethers";
import { call, fork, put, select, take } from "redux-saga/effects";
import { contractCogiChain_call, contractEth_batch } from "../../components/RpcExec/toast_chain";
import { dataFromWeb3, sleep } from "../../common/utilities";

import { CHAINID_ETH_AA } from "../../common/constants";
import { ClassWithStaticMethod } from "../../common/static";
import { IContract as ContractConfig } from "../../common/types";
import contractConfigs from "../../config/contracts";
import { endpoints_FetchrpcAA } from "../../common/utilities_config";

function* contractCall() {
  try {
    const request: ContractCallRequest = yield select(reducers.contractCallRequest);
    const Contract: Contract = yield select(
      reducers.selectedContractFromNamespaceCogiNetwork,
      request.namespace,
    );
    if (Contract == null) throw `not found contracts[${request.namespace}]`;
    const ret = yield call(contractCogiChain_call, Contract, request.method, request.params);
    let res: Record<string, Record<string, any>> = yield select(reducers.contractResponse);
    if (res == null) {
      res = {};
    }
    if (res[request.namespace] == null) {
      res[request.namespace] = {};
    }
    res[request.namespace][request.method] = dataFromWeb3(ret);
    yield put(actions.resetContractCallResponse() as any);
    yield call(sleep, 100);
    yield put(actions.contractCallResponse(res) as any);
  } catch (e) {
    yield put(actions.resetContractCallResponse() as any);
  }
}

function* contractBatch() {
  try {
    const request = yield select(reducers.contractBatchRequest);
    const lstRequestJsonRpc: any[] = [];
    for (let i = 0; i < request.lstBatch.length; i++) {
      const namespace = request.lstBatch[i].namespace;
      const params = request.lstBatch[i].params;
      const method = request.lstBatch[i].method;
      const Contract: Contract = yield select(
        reducers.selectedContractFromNamespaceCogiNetwork,
        namespace,
      );
      if (Contract == null) throw `not found contracts[${namespace}]`;
      lstRequestJsonRpc.push({
        contract: Contract,
        method: method,
        params: params,
      });
    }
    const ret = yield call(contractEth_batch, lstRequestJsonRpc);
    const res = new Object();
    for (let i = 0; i < ret.length; i++) {
      const namespace = request.lstBatch[i].namespace;
      const method = request.lstBatch[i].method;
      if (ret[i] instanceof Error) {
        res[namespace] = new Object();
        res[namespace][method] = "";
      } else {
        res[namespace] = new Object();
        res[namespace][method] = dataFromWeb3(ret[i]);
      }
    }
    yield put(actions.resetContractBatchResponse() as any);
    yield put(actions.contractBatchResponse(res) as any);
  } catch (e) {
    yield put(actions.resetContractBatchResponse() as any);
  }
}

const getConnect = async (): Promise<Action> => {
  try {
    const contracts: WalletContract[] = [];
    const endpoint = endpoints_FetchrpcAA(CHAINID_ETH_AA);
    const signer: JsonRpcProvider = new ethers.JsonRpcProvider(endpoint.endpoint);
    for (let i = 0; i < contractConfigs.length; i++) {
      const cfg: ContractConfig = contractConfigs[i];
      if (cfg.chainId == ClassWithStaticMethod.ETH_AA_CHAINID) {
        contracts.push({
          namespace: cfg.namespace!,
          contract: new Contract(cfg.address!, cfg.abi!, signer),
        });
      }
    }
    const action = actions.setWeb3Provider({
      address: null,
      chainId: ClassWithStaticMethod.ETH_AA_CHAINID,
      contracts,
      connecting: false,
      connected: true,
      errorCode: null,
    });
    return action;
  } catch (e: any) {
    throw new Error(e?.message ?? e);
  }
};

function* disconnect() {
  const web3Modal = yield select(reducers.selectedWeb3Modal);
  if (web3Modal?.on) {
    yield web3Modal.clearCachedProvider();
  }
  const provider = yield select(reducers.selectedProvider);
  if (provider?.disconnect && typeof provider.disconnect === "function") {
    yield provider.disconnect();
  }
  yield put(actions.resetWeb3Provider() as any);
}

function* connect() {
  try {
    const action = yield getConnect();
    yield put(action);
  } catch (_) {
    yield put(actions.cancel(ErrorCode.ConnectUserCancel) as any);
  }
}

function* actionContractCallListener() {
  while (true) {
    yield take(actions.CONTRACT_CALL);
    yield fork(contractCall);
  }
}

function* actionContractBatchListener() {
  while (true) {
    yield take(actions.CONTRACT_BATCH);
    yield fork(contractBatch);
  }
}

function* actionConnectListener() {
  while (true) {
    yield take(actions.CONNECT);
    yield fork(connect);
  }
}

function* actionDisconnectEventListener() {
  while (true) {
    yield take(actions.DISCONNECT);
    yield fork(disconnect);
  }
}

// eslint-disable-next-line
function* actionReloadListener() {}

function* actionListener() {
  yield fork(actionConnectListener);
  yield fork(actionDisconnectEventListener);
  yield fork(actionContractBatchListener);
  yield fork(actionContractCallListener);
  yield fork(actionReloadListener);
}

function* startup() {
  //yield put(actions.connect())
}

export default function* root(): any {
  yield fork(startup);
  yield fork(actionListener);
}
