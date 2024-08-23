import { ethers } from "ethers";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import createClient from "openapi-fetch";

import { paths } from "./LoginAccount";
import { appDispatch } from "../modules";
import { LOCALE_STORAGE } from "../common/enum";
import { CHAINID_ETH_AA } from "../common/constants";
import { paths as pathTelegram } from "./LoginTelegram";
import { ClassWithStaticMethod } from "../common/static";
import { saveAccount } from "../modules/account/utilities";
import * as WalletActions from "../modules/wallet/actions";
import * as AccountActions from "../modules/account/actions";
import { endpoints_FetchrpcAA } from "../common/utilities_config";
import { getContractWalletOperator } from "nemo-aa/lib/constants";
import { ContractWallet, Operator } from "nemo-aa/lib/contract-wallet";
import { JWTOptions, JWTPayload, ProofPoints } from "nemo-aa/lib/types";
import { decryptData, saveContractWalletAA, toWei } from "../common/utilities";

const client = createClient<paths>({
  baseUrl: process.env.SERVER_LOGIN_AUTHOR,
});
const teleClient = createClient<pathTelegram>({
  baseUrl: process.env.SERVER_LOGIN_WITH_TELEGRAM,
});
export class AccountAbstraction {
  static getTelegramInfoWeb = (): any => {
    const data = decryptData(localStorage.getItem(LOCALE_STORAGE.ACCOUNT_TELEGRAM));
    if (data) return JSON.parse(data);
    else return null;
  };

  static getTelegramInfo = (): any => {
    const windowA: any = window;
    const tele = windowA?.Telegram?.WebApp;
    const init_data = tele?.initDataUnsafe;
    if (init_data?.query_id) {
      init_data.auth_date = init_data.auth_date * 1.0;
    }
    return init_data;
  };

  static getImageTelegram = async (user: any): Promise<any> => {
    try {
      return await fetch(
        `https://api.telegram.org/bot${process.env.BOT_TOKEN}/getUserProfilePhotos?user_id=${user?.user?.id}&limit=5`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
        .then(async (data) => await data.json())
        .then(async function (response) {
          if (response.ok) {
            if (response?.result?.total_count > 0) {
              const photos = response?.result?.photos[0];
              const file_id = photos[photos?.length - 1]?.file_id;
              return await fetch(
                `https://api.telegram.org/bot${process.env.BOT_TOKEN}/getFile?file_id=${file_id}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                },
              )
                .then(async (data) => await data.json())
                .then(async function (response) {
                  if (response.ok) {
                    if (response?.result?.file_path) {
                      const file_path = response?.result?.file_path;
                      const res = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${file_path}`;
                      return res;
                    }
                  }
                  return null;
                })
                .catch(function (error) {
                  throw error;
                });
            }
            return null;
          }
        })
        .catch(function (error) {
          throw error;
        });
    } catch (e) {
      return null;
    }
  };

  static loginAccount = async (init_data: any): Promise<any> => {
    if (!init_data) {
      toast.error("Telegram not found");
      return;
    }

    const { data } = await client.POST("/auth/v1/oidc/authorize", {
      params: {},
      body: {
        client_id: "7109740482",
        init_data: init_data,
      },
    });

    return data;

    // return await fetch(
    //   process.env.SERVER_LOGIN_AUTHOR + `/auth/v1/oidc/authorize`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(body),
    //   }
    // )
    //   .then(async (data) => {
    //     await data.json()
    //   })
    //   .then(async function (response) {
    //     console.log('response', response)
    //     return response
    //   })
    //   .catch(function (error) {
    //     toast.error(error.message)
    //     return null
    //   })
  };

  static hasPinCode = async (contractWallet: any) => {
    try {
      const hasPinCode = await contractWallet.hasPINCode();
      return hasPinCode;
    } catch (e) {
      return false;
    }
  };

  static setupAccountAbstraction = async (res: any): Promise<any> => {
    try {
      if (!res) return;
      const jwt = res.id_token;
      const payload = jwtDecode(jwt);
      const header = jwtDecode(jwt, { header: true });
      const index = 0;

      const salt = await teleClient.POST("/v1/salt", {
        params: {},
        body: { jwt: jwt, index: index },
        parseAs: "text",
      });
      const saltData: any = salt.data;

      //
      // const salt = await axios.post(
      //   process.env.SERVER_LOGIN_WITH_TELEGRAM + '/v1/salt',
      //   JSON.stringify({
      //     jwt: jwt,
      //     index: index,
      //   }),
      //   {
      //     method: 'POST',
      //     headers: {
      //       accept: 'application/json',
      //       'Content-Type': 'application/json',
      //     },
      //   }
      // )
      const endpoint = endpoints_FetchrpcAA(CHAINID_ETH_AA);
      const ephemeralKeyPair = Operator.getEphemeralKeyPair(endpoint.endpoint);

      const beneficiaries: string[] = await fetch(
        `${process.env.TORII as string}/v1/beneficiaries`,
      ).then((response) => response.json());

      if (!ephemeralKeyPair) return;
      const deadline = payload.exp ?? 0;
      // const proof: any = await axios.post(
      //   process.env.SERVER_LOGIN_WITH_TELEGRAM + '/v1/prove',
      //   JSON.stringify({
      //     jwt: jwt,
      //     salt: data,
      //     signerPublicKey: ephemeralKeyPair.address,
      //     exp: deadline,
      //     keyClaimName: 'sub',
      //   }),
      //   {
      //     method: 'POST',
      //     headers: {
      //       accept: 'application/json',
      //       'Content-Type': 'application/json',
      //     },
      //   }
      // )
      const proof = await teleClient.POST("/v1/prove", {
        params: {},
        body: {
          jwt: jwt,
          salt: saltData,
          signerPublicKey: ephemeralKeyPair.address,
          exp: deadline,
          keyClaimName: "sub",
        },
      });

      const proofData = proof.data;

      const jwtOptions: JWTOptions = {
        header: header,
        payload: payload as JWTPayload,
        proof: proofData as ProofPoints,
        ephemeralKeyPair: ephemeralKeyPair,
        deadline: deadline,
        salt: saltData,
      };
      // We can use ephemeral to call onchain

      const operator = new Operator(
        getContractWalletOperator(CHAINID_ETH_AA),
        ephemeralKeyPair,
        beneficiaries,
      );
      const contractWalletAddress = await operator.getAddress(
        payload?.sub ?? "",
        saltData,
        payload.iss ?? "",
        payload.aud as string,
        {
          gasPrice: toWei("0"),
        },
      );

      const contractWallet = new ContractWallet(contractWalletAddress, operator);
      contractWallet.setJWT(jwtOptions);
      if (await contractWallet?.isReadonly()) {
        const requestedPrefundCreateWallet = await contractWallet.getRequiredPrefund();
        const provider = new ethers.JsonRpcProvider(endpoint.endpoint);
        const walletBalance = await provider.getBalance(contractWallet.address);
        if (walletBalance < requestedPrefundCreateWallet.toBigInt()) {
          appDispatch(
            WalletActions.setInfoSupport({
              prefundRequired: requestedPrefundCreateWallet.toBigInt(),
              saveContractWalletAA: {
                ephemeralKeyPairPrivateKey: ephemeralKeyPair.privateKey,
                contractWalletAddress: contractWalletAddress,
                jwtOptions: {
                  header: header,
                  payload: payload as JWTPayload,
                  proof: proofData as ProofPoints,
                  deadline: deadline,
                  salt: saltData,
                },
                beneficiaries: beneficiaries,
              },
              saveAccount: {
                ...res,
                nemo_address: contractWalletAddress,
              },
            }),
          );
          return;
        }
        const tx = await contractWallet.create();
        await tx.wait();
      }

      const hasPINCode = await this.hasPinCode(contractWallet);
      return {
        contractWallet: contractWallet,
        saveContractWalletAA: {
          ephemeralKeyPairPrivateKey: ephemeralKeyPair.privateKey,
          contractWalletAddress: contractWalletAddress,
          jwtOptions: jwtOptions,
          beneficiaries: beneficiaries,
        },
        saveAccount: {
          ...res,
          nemo_address: contractWalletAddress,
          fund_password: hasPINCode,
          ephemeralKeyPair: ephemeralKeyPair,
        },
      };
    } catch (e: any) {
      // eslint-disable-next-line no-console
      console.log(e);
      throw e;
    }
  };

  static refetchSetUpAccount = async (infoSupport: any, callRefetch: any): Promise<any> => {
    try {
      callRefetch(true);
      const endpoint = endpoints_FetchrpcAA(CHAINID_ETH_AA);
      const ephemeralKeyPair = Operator.getEphemeralKeyPair(
        endpoint.endpoint,
        infoSupport?.saveContractWalletAA.ephemeralKeyPairPrivateKey,
      );
      const operator = new Operator(
        getContractWalletOperator(CHAINID_ETH_AA),
        ephemeralKeyPair,
        infoSupport?.saveContractWalletAA?.beneficiaries,
      );
      const contractWallet = new ContractWallet(
        infoSupport?.saveContractWalletAA?.contractWalletAddress,
        operator,
      );
      const jwtOptions: JWTOptions = {
        ...infoSupport?.saveContractWalletAA?.jwtOptions,
        ephemeralKeyPair: ephemeralKeyPair,
      };
      contractWallet.setJWT(jwtOptions);

      // When the wallet has not yet been created, it remains in a read-only state.
      if (await contractWallet.isReadonly()) {
        // The wallet needs sufficient balance to cover the transaction fee.
        const requestedPrefundCreateWallet = await contractWallet.getRequiredPrefund();
        const provider = new ethers.JsonRpcProvider(endpoint.endpoint);
        const walletBalance = await provider.getBalance(contractWallet.address);
        if (walletBalance >= requestedPrefundCreateWallet.toBigInt()) {
          const tx = await contractWallet.create();
          await tx.wait();
        } else {
          toast.error("Balance is not enough");
          callRefetch(false);
          return;
        }
        const hasPINCode = await this.hasPinCode(contractWallet);
        callRefetch(false);
        appDispatch(AccountActions.contractWalletAA(contractWallet));
        saveContractWalletAA({
          ephemeralKeyPairPrivateKey: ephemeralKeyPair.privateKey,
          contractWalletAddress: infoSupport?.saveContractWalletAA?.contractWalletAddress,
          jwtOptions: jwtOptions,
          beneficiaries: infoSupport?.saveContractWalletAA?.beneficiaries,
        });
        saveAccount({
          ...infoSupport?.saveAccount,
          fund_password: hasPINCode,
          ephemeralKeyPair: ephemeralKeyPair,
        });
        appDispatch(
          AccountActions.dataAccountResponse({
            ...infoSupport?.saveAccount,
            fund_password: hasPINCode,
            ephemeralKeyPair: ephemeralKeyPair,
          }),
        );
        ClassWithStaticMethod.SET_USER_INFO({
          ...infoSupport?.saveAccount,
          fund_password: hasPINCode,
          ephemeralKeyPair: ephemeralKeyPair,
        });
        localStorage.setItem(LOCALE_STORAGE.IS_LOGINED, "true");
        appDispatch(WalletActions.setInfoSupport(null));
        // return {
        //   contractWallet: contractWallet,
        //   saveContractWalletAA: {
        //     ephemeralKeyPairPrivateKey: ephemeralKeyPair.privateKey,
        //     contractWalletAddress:
        //       infoSupport?.saveContractWalletAA?.contractWalletAddress,
        //     jwtOptions: jwtOptions,
        //     beneficiaries: infoSupport?.saveContractWalletAA?.beneficiaries,
        //   },
        //   saveAccount: {
        //     ...infoSupport?.saveAccount,
        //     fund_password: hasPINCode,
        //     ephemeralKeyPair: ephemeralKeyPair,
        //   },
        // }
      }
    } catch (e: any) {
      // eslint-disable-next-line no-console
      console.log(e);
      throw e;
    }
  };
}
