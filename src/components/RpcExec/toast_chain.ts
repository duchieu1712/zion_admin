import { ethers, type Contract } from "ethers";
import { CHAINID_ETH_AA, ERROR_MESSSAGE_NOT_TIME_SIGNATURE } from "../../common/constants";
import { appDispatch, appState } from "../../modules";
import * as AccountActions from "../../modules/account/actions";
import { RESPONSE } from "../../common/enum";
import { rpcExecCogiChainAA } from "./rpcExecCogiChainAA";
import { endpoints_FetchrpcAA } from "../../common/utilities_config";

export const ethCallMethod = async <T>({
  method,
  params = [],
}: {
  method: string;
  params: any;
}): Promise<T | null> => {
  try {
    const endpoint = endpoints_FetchrpcAA(CHAINID_ETH_AA);
    const provider: any = new ethers.JsonRpcProvider(endpoint.endpoint);
    const res = await provider[method](...params);
    return res;
  } catch (error) {
    return null;
  }
};

export const contractEth_batch = async (lstInfoContract: any[]): Promise<any> => {
  // eslint-disable-next-line no-async-promise-executor
  const resolve = new Promise(async (accept, reject) => {
    try {
      const lstRes: any[] = [];
      for (let i = 0; i < lstInfoContract.length; i++) {
        const method = lstInfoContract[i].method;
        const params = lstInfoContract[i].params;
        const contract: Contract = lstInfoContract[i].contract;
        lstRes.push(contract[method](...params));
      }
      const res = await Promise.all([...lstRes]);
      accept(res);
    } catch (e) {
      reject(e);
    }
  });
  return await resolve;
};

export const contractCogiChain_call = async (
  contract: Contract,
  method: string,
  params: any[],
): Promise<any> => {
  // eslint-disable-next-line no-async-promise-executor
  const resolve = new Promise(async (accept, reject) => {
    try {
      return contract[method](...params)
        .then((res: any) => {
          if (!res.error) {
            accept(res);
          } else {
            reject(res.error);
          }
        })
        .catch((e) => {
          reject(e);
        });
    } catch (e) {
      reject(e);
    }
  });
  return await resolve;
};

export const contractCogiChain_sendRawTransaction = async (
  contract: Contract,
  method: string,
  params: any[],
  options: any = null,
  callback: any = null,
): Promise<any> => {
  // eslint-disable-next-line no-async-promise-executor
  const resolve = new Promise(async () => {
    try {
      const store = appState();
      const account = store.account.dataAccount;
      contract.connect(account?.ephemeralKeyPair);
      const data = contract?.interface?.encodeFunctionData(method, [...params]);
      let tx = {
        to: await contract.getAddress(),
        data,
      };
      if (options != null)
        tx = {
          to: await contract.getAddress(),
          data,
          ...options,
        };
      const _2fa = checkConfirm2FA(contract, method);
      const _pin = true;
      return rpcExecCogiChainAA({
        method: "eth_sendRawTransaction",
        info: tx,
        options: options,
        _2fa: _2fa,
        _pin: _pin,
        callback: (res: any, flagResponse: any) => {
          if (callback) callback(res, flagResponse);
        },
        methodTx: method,
      });
    } catch (e: any) {
      if (e?.message?.includes(ERROR_MESSSAGE_NOT_TIME_SIGNATURE)) {
        appDispatch(AccountActions.setRequestSignOut(true));
      }
      if (callback) callback(e, RESPONSE.ERROR);
    }
  });
  return await resolve;
};

export const decodeFunctionResult = (
  contract: any | unknown,
  method: any | unknown,
  data: any | unknown,
): any => {
  if (!contract) return "";
  try {
    return contract?.interface?.decodeFunctionResult(method, data);
  } catch (e) {
    return null;
  }
};

export const checkConfirm2FA = (contract: any | unknown, method: any | unknown): any => {
  const store = appState();
  const accountWeb = store.account.dataAccount;
  if (!accountWeb?.google_two_factor_authentication) return false;
  const dataExtractSecuredMethods = store.profile.dataExtract_Secured_Methods;
  if (!dataExtractSecuredMethods) return true;
  return dataExtractSecuredMethods.google_2fa.eth[0].sendRawTransaction.some(
    async (a: any) =>
      (await a.getAddress()?.toLowerCase()) == (await contract.getAddress()?.toLowerCase()) &&
      a?.methods?.includes(method),
  );
};

export const checkConfirm_pin = (method: any | unknown): any => {
  let res = false;
  try {
    const store = appState();
    const dataExtractSecuredMethods = store.profile.dataExtract_Secured_Methods;
    if (!dataExtractSecuredMethods) return false;
    const splitMethod = method?.split(".");
    if (splitMethod.length >= 2) {
      res =
        dataExtractSecuredMethods?.fund_password[splitMethod[0]]?.includes(splitMethod[1]) ?? false;
    }
  } catch (e: any) {
    throw new Error(e?.message ?? e);
  }
  return res;
};
