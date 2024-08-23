import * as ProfileActions from "../../modules/profile/actions";

import { ENUM_ENDPOINT_RPC, RESPONSE } from "../../common/enum";
import { appDispatch, appState } from "../../modules";
import {
  checkCreatePIN,
  checkFundPasswordLocked,
  getPinCode,
  saveRememberFundPassword,
} from "../../common/utilities";

import { ClassWithStaticMethod } from "../../common/static";
import axios from "axios";
import { checkConfirm_pin } from "./toast_chain";
import dayjs from "dayjs";
import { endpointContractFromChainIdRpc } from "../../common/utilities_config";
import { getChainId } from "../../modules/wallet/utilities";

const METHOD_NOT_FEE_GAS = ["nemo_hotwallet.approve"];

export const rpcExecCogiChainAA = async <T>({
  method,
  info = null,
  options = null,
  _2fa = false,
  _pin = false,
  callback = null,
  methodTx = null,
}: {
  method: string;
  info?: any;
  options?: any;
  _2fa?: any;
  _pin?: any;
  callback?: any;
  methodTx?: any;
}): Promise<T | undefined> => {
  try {
    if (!_pin) {
      _pin = checkConfirm_pin(method);
    }
    const store = appState();
    if (_pin && checkFundPasswordLocked()) {
      if (callback) {
        callback("PIN Code is locked. Please to Profile to unlock", RESPONSE.ERROR);
      }
      return;
    }
    if (_pin && checkCreatePIN()) {
      if (callback) {
        callback("PIN Code is not created. Please to create PIN Code to action", RESPONSE.ERROR);
      }
      appDispatch(ProfileActions.setOnActionCreatePIN(true));
      return;
    }
    if (_2fa || _pin || (_pin && !METHOD_NOT_FEE_GAS.includes(method))) {
      const request = {
        methodTx: methodTx,
        action_2fa: _2fa,
        action_pin: _pin,
        fee_gas: _pin && !METHOD_NOT_FEE_GAS.includes(method),
        callbackConfirm2FA: async (CODE: any, flagResponse: any) => {
          const contractWalletAA = store.account.contractWalletAA;
          try {
            const checkPINCode = await contractWalletAA.validateAndSetPINCode(CODE?.pin, false);
            if (!checkPINCode) {
              if (callback) {
                callback("PIN Code is invalid", RESPONSE.ERROR);
              }
              return;
            }
          } catch (error: any) {
            if (callback) {
              callback(error.message, RESPONSE.ERROR);
            } else {
              throw new Error(error.message);
            }
          }
          // Check PIN
          let pOption = { ...options };
          if (CODE?.otp) {
            pOption = { ...pOption, otp_code: CODE.otp };
          }
          if (CODE?.pin) {
            const hash = getPinCode(CODE.pin);
            pOption = { ...pOption, pin_code: hash };
          }
          if (CODE?.save_fund_password) {
            pOption = {
              ...pOption,
              // save_fund_password: CODE.save_fund_password,
            };
          }
          if (flagResponse == RESPONSE.ERROR) {
            if (callback) {
              callback("Cancel the action", RESPONSE.ERROR);
            }
            return;
          }
          // Save FUND Password
          if (CODE.save_fund_password) {
            saveRememberFundPassword({
              deadTime: dayjs().valueOf() / 1000 + 3600 * 24,
              fund_password: CODE.pin,
            });
          }
          // Save for Approve
          if (methodTx == "approve") {
            ClassWithStaticMethod.SET_PIN_APPROVE({
              timestamp: Math.round(dayjs().valueOf() / 1000 + 10),
              pin: CODE?.pin,
            });
          }
          //
          if (!contractWalletAA) return;
          const response = await contractWalletAA
            ?.sendTransaction({
              ...info,
              ...pOption,
              // gasPrice: toWei('0'),
              // maxFeePerGas: ethers.ZeroHash,
              // maxPriorityFeePerGas: ethers.ZeroHash,
            })
            .then(async (tx: any) => await tx.wait())
            .catch((error: any) => {
              if (callback) {
                callback(error.message, RESPONSE.ERROR);
              } else {
                throw new Error(error);
              }
              return null;
            });
          // Success
          if (!response) return;
          if (callback) {
            callback(response.transactionHash, RESPONSE.SUCCESS);
          }
          return response.transactionHash;
        },
      };
      appDispatch(ProfileActions.setConfirm2FA(request));
    } else {
      const contractWalletAA = store.account.contractWalletAA;
      if (!contractWalletAA) return;
      const response = await contractWalletAA
        .sendTransaction({
          ...info,
        })
        .then(async (tx: any) => await tx.wait());
      if (callback) {
        callback(response.transactionHash, RESPONSE.SUCCESS);
      }
      return response.transactionHash;
    }
  } catch (error: any) {
    if (callback) {
      callback(error.message, RESPONSE.ERROR);
    } else {
      throw new Error(error.message);
    }
  }
};

export const rpcExecCogiChainNotEncodeParam = async <T>({
  method,
  params = [],
  _2fa = false,
  callback = null,
  endpoint = ENUM_ENDPOINT_RPC._NEMO_WALLET,
}: {
  method: string;
  params: any;
  _2fa?: boolean;
  callback?: any;
  endpoint?: ENUM_ENDPOINT_RPC;
}): Promise<any> => {
  try {
    if (_2fa) {
      const request = {
        action_2fa: true,
        callbackConfirm2FA: async (CODE: any) => {
          const rpcEndpoint = endpointContractFromChainIdRpc(endpoint, getChainId())?.endpoint;

          let response;
          if (rpcEndpoint) {
            response = await axios.post<T>(
              rpcEndpoint,
              {
                jsonrpc: "2.0",
                id: 1,
                method,
                params: [{ ...params[0], otp_code: CODE?.otp }],
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              },
            );
          }
          const ress: any = response?.data;
          if (ress?.result?.error != null) {
            if (callback) {
              callback(ress?.result?.error, RESPONSE.ERROR);
            }
            throw new Error(ress?.result?.error?.message);
          }
          if (ress?.error != null) {
            if (callback) {
              callback(ress?.error, RESPONSE.ERROR);
            }
            throw new Error(ress?.error?.message);
          }
          if (callback) {
            if (ress.result) {
              callback(ress.result, RESPONSE.SUCCESS);
            } else {
              callback(ress, RESPONSE.SUCCESS);
            }
            appDispatch(ProfileActions.setConfirm2FA(null));
          }
          if (ress.result) {
            return ress.result;
          } else {
            return ress;
          }
        },
      };
      appDispatch(ProfileActions.setConfirm2FA(request));
    } else {
      const rpcEndpoint = endpointContractFromChainIdRpc(endpoint, getChainId())?.endpoint;
      let response;
      if (rpcEndpoint) {
        response = await axios.post<T>(
          rpcEndpoint,
          {
            jsonrpc: "2.0",
            id: 1,
            method,
            params,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
      }
      const ress: any = response?.data;
      if (ress?.result?.error != null) {
        if (callback) {
          callback(ress?.result?.error, RESPONSE.ERROR);
        }
        throw new Error(ress?.result?.error?.message);
      }
      if (ress?.error != null) {
        if (callback) {
          callback(ress?.error, RESPONSE.ERROR);
        }
        throw new Error(ress?.error?.message);
      }
      if (callback) {
        if (ress.result) {
          callback(ress.result, RESPONSE.SUCCESS);
        } else {
          callback(ress, RESPONSE.SUCCESS);
        }
      }
      if (ress.result) {
        return ress.result;
      } else {
        return ress;
      }
    }
  } catch (error: any) {
    if (callback) {
      callback(error.message, RESPONSE.ERROR);
    }
    throw new Error(error);
  }
};
