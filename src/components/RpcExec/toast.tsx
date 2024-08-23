import { Contract, type BigNumberish } from "ethers";
import { RESPONSE } from "../../common/enum";
import { appDispatch, appState } from "../../modules";
import { ClassWithStaticMethod } from "../../common/static";
import * as WalletActions from "../../modules/wallet/actions";
import { type IApprove, type IError } from "../../common/types";
import { toEther } from "../../common/utilities";
import { contractCogiChain_call, contractCogiChain_sendRawTransaction } from "./toast_chain";
import { toast } from "react-toastify";
import { explorerFromCogiChain } from "../utilities";

export const contractCallWithToast = async (
  contract: Contract,
  method: string,
  params: any[],
  approve: IApprove | null | IApprove[] = null,
  options: any = null,
): Promise<any | unknown> => {
  try {
    if (ClassWithStaticMethod.STATIC_DEFAULT_CHAINID == ClassWithStaticMethod.ETH_AA_CHAINID) {
      return await contractCallWithToastCogiChain(contract, method, params, approve, options);
    } else {
      return await contractCallWithToast_NetworkETH(contract, method, params, approve, options);
    }
  } catch (e: any) {
    throw new Error(e);
  }
};

export const contractCallWithToast_NetworkETH = async (
  contract: Contract,
  method: string,
  params: any[],
  approve: IApprove | null | IApprove[] = null,
  options: any = null,
): Promise<any | unknown> => {
  // eslint-disable-next-line no-async-promise-executor
  const resolve = new Promise(async (accept, reject) => {
    try {
      const store = appState();
      const chainId = store?.wallet?.chainId;
      if (chainId != ClassWithStaticMethod.STATIC_DEFAULT_CHAINID) {
        appDispatch(WalletActions.connectMetamask());
        throw {
          code: -5000,
          message: "Wrong Network",
        };
      }
      if (approve != null) {
        if (Array.isArray(approve)) {
          for (let i = 0; i < approve?.length; i++) {
            const appr = approve[i];
            const c = appr.contract;
            const balanceInEth = parseFloat(toEther(await c.balanceOf(appr.owner)));
            const allowance = await c.allowance(appr.owner, appr.spender);
            const amountInEth = parseFloat(toEther(appr.amount));
            const p = amountInEth - parseFloat(toEther(allowance));
            if (p > 0) {
              if (balanceInEth < p) {
                throw {
                  code: -5000,
                  message: "Your balance is insufficient",
                };
              }
              const tx = await c.approve(
                appr.spender,
                "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
              );
              await tx.wait();
            } else {
              if (balanceInEth < amountInEth) {
                throw {
                  code: -5000,
                  message: "Your balance is insufficient",
                };
              }
            }
          }
        } else {
          const c = approve.contract;
          const balanceInEth = parseFloat(toEther(await c.balanceOf(approve.owner)));
          const allowance = await c.allowance(approve.owner, approve.spender);
          const amountInEth = parseFloat(toEther(approve.amount));
          const p = amountInEth - parseFloat(toEther(allowance));
          if (p > 0) {
            if (balanceInEth < p) {
              throw {
                code: -5000,
                message: "Your balance is insufficient",
              };
            }
            const tx = await c.approve(
              approve.spender,
              "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
            );
            await tx.wait();
          } else {
            if (balanceInEth < amountInEth) {
              throw {
                code: -5000,
                message: "Your balance is insufficient",
              };
            }
          }
        }
      }
      let tx;
      if (options) {
        tx = await contract[method](...params, options);
      } else {
        tx = await contract[method](...params);
      }
      await tx.wait();
      accept(tx);
    } catch (e) {
      reject(e);
    }
  });
  toast.promise(resolve, {
    pending: "Waiting For Confirmation",
    success: {
      render({ data }) {
        return <>Transaction successful. Click to view {explorerFromCogiChain(data)}</>;
      },
    },
    error: {
      //'Transaction rejected.'
      render({ data }) {
        // Check message special
        const o = data as IError;
        if (o.message != undefined) {
          if (o.code == -32603 && o?.data?.message != null) {
            return <>{o.data.message}</>;
          }
          if (o?.code?.toString() == "UNPREDICTABLE_GAS_LIMIT") {
            const splitMess = (data as any).toString().split('(reason="execution reverted:');
            if (splitMess?.length >= 2) {
              const splitTemp = splitMess[1].toString().split('", method="estimateGas');
              if (splitTemp?.length >= 2) {
                return <>{splitTemp[0].trim()}</>;
              }
            }
          } else {
            return <>{o.message}</>;
          }
        }
        return <>{(data as any).toString()}</>;
      },
    },
  });
  return await resolve;
};

export const contractCallWithToastCogiChain = async (
  contract: Contract,
  method: string,
  params: any[],
  approve: IApprove | null | IApprove[] = null,
  options: any = null,
): Promise<any | unknown> => {
  // eslint-disable-next-line no-async-promise-executor
  const resolve = new Promise(async (accept, reject) => {
    try {
      // Approve
      if (approve != null) {
        if (Array.isArray(approve)) {
          let pSuccess = 0;
          let indexApprove = 0;
          const callSendRawTransaction = () => {
            if (pSuccess == approve?.length) {
              contractCogiChain_sendRawTransaction(
                contract,
                method,
                [...params],
                options,
                (tx: any, response: any) => {
                  if (response == RESPONSE.SUCCESS) {
                    accept(tx);
                  } else if (response == RESPONSE.ERROR) {
                    reject(tx);
                  }
                },
              );
            }
          };

          const approveToken = async (i: number) => {
            if (indexApprove >= approve?.length) return;
            const appr = approve[i];
            const c = appr.contract;
            const balanceInEth = await getBalanceCoin(c, appr.owner);
            // allowance
            const paramsAllowance = [appr.owner, appr.spender];
            const allowance: any = await contractCogiChain_call(c, "allowance", [
              ...paramsAllowance,
            ]);
            // const allowance = await c['allowance'](appr.owner, appr.spender)
            const amountInEth = parseFloat(toEther(appr.amount));
            const p = amountInEth - parseFloat(toEther(allowance));
            if (p > 0) {
              if (balanceInEth < p) {
                reject({
                  code: -5000,
                  message: "Your balance is insufficient",
                });
                return;
              }
              contractCogiChain_sendRawTransaction(
                c,
                "approve",
                [
                  appr.spender,
                  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
                ],
                null,
                (tx: any, response: any) => {
                  if (response == RESPONSE.ERROR) {
                    reject(tx);
                  } else {
                    pSuccess = pSuccess + 1;
                    indexApprove++;
                    approveToken(indexApprove);
                    callSendRawTransaction();
                  }
                },
              );
            } else {
              if (balanceInEth < amountInEth) {
                throw {
                  code: -5000,
                  message: "Your balance is insufficient",
                };
              } else {
                pSuccess = pSuccess + 1;
                indexApprove++;
                approveToken(indexApprove);
                callSendRawTransaction();
              }
            }
          };
          approveToken(indexApprove);
        } else {
          const c = approve.contract;
          const balanceInEth = await getBalanceCoin(c, approve.owner);
          // const balanceInEth = parseFloat(
          //   toEther(
          //     (await contractCogi_call(c, 'balanceOf', [
          //       approve.owner,
          //     ])) as BigNumberish
          //   )
          // )

          // allowance
          const paramsAllowance = [approve.owner, approve.spender];
          const allowance: any = await contractCogiChain_call(c, "allowance", [...paramsAllowance]);
          const amountInEth = parseFloat(toEther(approve.amount));
          const p = amountInEth - parseFloat(toEther(allowance));
          if (p > 0) {
            // if (true) {
            if (balanceInEth < p) {
              throw {
                code: -5000,
                message: "Your balance is insufficient",
              };
            }
            await contractCogiChain_sendRawTransaction(
              c,
              "approve",
              [
                approve.spender,
                "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
                // '0',
              ],
              null,
              (tx: any, response: any) => {
                if (response == RESPONSE.ERROR) {
                  reject(tx);
                } else {
                  contractCogiChain_sendRawTransaction(
                    contract,
                    method,
                    [...params],
                    options,
                    (tx: any, response: any) => {
                      if (response == RESPONSE.SUCCESS) {
                        accept(tx);
                      } else if (response == RESPONSE.ERROR) {
                        reject(tx);
                      }
                    },
                  );
                }
              },
            );
          } else {
            if (balanceInEth < amountInEth) {
              throw {
                code: -5000,
                message: "Your balance is insufficient",
              };
            }
          }
        }
      }
      // Call
      contractCogiChain_sendRawTransaction(
        contract,
        method,
        [...params],
        options,
        (tx: any, response: any) => {
          if (response == RESPONSE.SUCCESS) {
            accept(tx);
          } else if (response == RESPONSE.ERROR) {
            reject(tx);
          }
        },
      );
    } catch (e) {
      reject(e);
    }
  });
  toast.promise(resolve, {
    pending: "Waiting For Confirmation",
    success: {
      render({ data }) {
        return <>Transaction successful. Click to view {explorerFromCogiChain(data)}</>;
      },
    },
    error: {
      //'Transaction rejected.'
      render({ data }) {
        // Check message special
        const o = data as IError;
        if (o.message != undefined) {
          if (o.code == -32603 && o?.data?.message != null) {
            return <>{o.data.message}</>;
          }
          if (o?.code?.toString() == "UNPREDICTABLE_GAS_LIMIT") {
            const splitMess = (data as any).toString().split('(reason="execution reverted:');
            if (splitMess?.length >= 2) {
              const splitTemp = splitMess[1].toString().split('", method="estimateGas');
              if (splitTemp?.length >= 2) {
                return <>{splitTemp[0].trim()}</>;
              }
            }
          } else {
            return <>{o.message}</>;
          }
        }
        return <>{(data as any).toString()}</>;
      },
    },
  });
  return resolve;
};

const getBalanceCoin = async (tokenContract: any, owner: any) => {
  return parseFloat(
    toEther((await contractCogiChain_call(tokenContract, "balanceOf", [owner])) as BigNumberish),
  );
};
