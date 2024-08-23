import { CHAINID_ETH_AA, QUERY_DEFAULT_STATE_GID, URI_DIRECT } from "../../common/constants";
import { Ed25519SecretKey, SodiumPlus } from "sodium-plus";
import {
  decryptData,
  encryptData,
  getCodeChallenge,
  getCodeVerifier,
  popupCenter,
} from "../../common/utilities";

import { ClassWithStaticMethod } from "../../common/static";
import { LOCALE_STORAGE } from "../../common/enum";
import _ from "lodash";
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import { isMobile } from "react-device-detect";
// import router from 'next/router'
import { redirect } from "react-router-dom";

export const getKey = async (): Promise<any> => {
  const sodium = await SodiumPlus.auto();
  const bobKeypair = await sodium.crypto_sign_keypair();
  const publicKeyBytes = await sodium.crypto_sign_publickey(bobKeypair);
  const privateKeyBytes = await sodium.crypto_sign_secretkey(bobKeypair);
  return {
    publicKeyBytes: publicKeyBytes.toString("base64"),
    privateKeyBytes: privateKeyBytes.toString("base64"),
  };
};

export const sodium_crypto_sign = async (
  message: string | any,
  privateKey: string | any,
): Promise<string> => {
  try {
    const sodium = await SodiumPlus.auto();
    if (!message || !privateKey) return "";
    const signature = await sodium.crypto_sign(
      message,
      Ed25519SecretKey.from(privateKey, "base64"),
    );
    const s = signature.slice(0, 64);
    //const sm = Buffer.concat([s, message]);
    // console.log('annnnn sm', sm);
    // const deCodeSM = await sodium.crypto_sign_open(sm, Ed25519PublicKey.from(public_key, 'base64'))
    // console.log('annnnn s', s);
    // console.log('annnnn message', deCodeSM.toString('base64'));
    // console.log('annnnn deCodeSM', deCodeSM.toString('base64'));
    // console.log('annnnn', deCodeSM.toString('base64') == message.toString('base64'));
    return s.toString("base64");
  } catch (_) {
    return "";
  }
};

export const SignOutCustom = async (functionCallback: any | unknown): Promise<any> => {
  // clear
  localStorage.setItem(LOCALE_STORAGE.CODE_LOGIN_GID, "");
  localStorage.setItem(LOCALE_STORAGE.CODE_LOGIN, "");
  localStorage.setItem(LOCALE_STORAGE.ACCOUNT, "");
  localStorage.setItem(LOCALE_STORAGE.STATE_LOGIN_GID, "");
  localStorage.setItem(LOCALE_STORAGE.FLAG_SIGNOUT, "false");
  localStorage.setItem(LOCALE_STORAGE.REMEMBER_ME, "false");
  localStorage.setItem(LOCALE_STORAGE.ACCOUNT_TELEGRAM, "");
  ClassWithStaticMethod.SET_STATIC_DEFAULT_CHAINID(CHAINID_ETH_AA);
  //
  // const endsessionURL = process.env.LINK_OIDC + '/session/end'
  // let endsessionParams
  // if (window?.location?.pathname == '/') {
  //   endsessionParams = new URLSearchParams({
  //     client_id: process.env.AUTH0_ID ?? '',
  //     post_logout_redirect_uri:
  //       process.env.DOMAIN_PUBLIC + URI_DIRECT,
  //   })
  // } else {
  //   endsessionParams = new URLSearchParams({
  //     client_id: process.env.AUTH0_ID ?? '',
  //     post_logout_redirect_uri:
  //       process.env.DOMAIN_PUBLIC + URI_DIRECT,
  //     state: window?.location?.pathname,
  //   })
  // }

  functionCallback(null);
  // window.location.href = `${endsessionURL}?${endsessionParams}`

  // const store = appState()
  // const accountWeb = store?.account?.dataAccount

  // const details = {
  //   token: accountWeb?.refresh_token,
  //   token_type_hint: 'refresh_token',
  //   client_id: process.env.AUTH0_ID,
  // }
  // const content: any = await rpcExecCogiChainNotEncodeParam({
  //   method: 'nemo_id.revocation',
  //   params: [details],
  // })
  // if (!content?.error) {
  //   localStorage.setItem(LOCALE_STORAGE.CODE_LOGIN_GID, '')
  //   localStorage.setItem(LOCALE_STORAGE.CODE_LOGIN, '')
  //   localStorage.setItem(LOCALE_STORAGE.ACCOUNT, '')
  //   localStorage.setItem(LOCALE_STORAGE.CONTRACTWALLETAA, '')
  //   localStorage.setItem(LOCALE_STORAGE.STATE_LOGIN_GID, '')
  //   localStorage.setItem(LOCALE_STORAGE.FLAG_SIGNOUT, 'false')
  //   localStorage.setItem(LOCALE_STORAGE.REMEMBER_ME, 'false')
  //   ClassWithStaticMethod.SET_STATIC_DEFAULT_CHAINID(CHAINID_ETH_AA)
  //   functionCallback(null)
  //   window.location.href = process.env.DOMAIN_PUBLIC
  // } else {
  //   toast.error(content.error_description)
  // }
};

export const saveCodeLoginGID = async (data: any | unknown): Promise<any> => {
  if (data != null) {
    localStorage.setItem(LOCALE_STORAGE.CODE_LOGIN_GID, JSON.stringify(encryptData(data)));
  } else {
    localStorage.setItem(LOCALE_STORAGE.CODE_LOGIN_GID, "");
  }
};

export const saveAccount = async (data: any | unknown): Promise<any> => {
  if (data != null) {
    localStorage.setItem(LOCALE_STORAGE.ACCOUNT, JSON.stringify(encryptData(JSON.stringify(data))));
  } else {
    localStorage.setItem(LOCALE_STORAGE.ACCOUNT, "");
  }
};

export const checkSessionAccount = (): boolean => {
  let ret = false;
  try {
    const data = decryptData(localStorage.getItem(LOCALE_STORAGE.ACCOUNT));
    if (data && data != "") {
      const jsonData = JSON.parse(data);
      if (parseInt(jsonData.timestamp) > dayjs().valueOf()) {
        ret = true;
      } else {
        // router.push('/')
        redirect("/");
      }
    } else {
      // router.push('/')
      redirect("/");
    }
    return ret;
  } catch (e) {
    return ret;
  }
};

export const getAccountForGetData = (
  nemowallet: any | unknown,
  addrressMetaMask: any | unknown,
): any => {
  if (ClassWithStaticMethod.STATIC_DEFAULT_CHAINID == CHAINID_ETH_AA) return nemowallet;
  else return addrressMetaMask;
};

export const signIn = (accountWeb: any | unknown, callbackUrl: string): any => {
  if (accountWeb) return;
  const codeVerifier = getCodeVerifier();
  const codeChallenge = getCodeChallenge(codeVerifier);
  localStorage.setItem(
    LOCALE_STORAGE.CODE_LOGIN,
    JSON.stringify(
      encryptData(
        JSON.stringify({
          codeVerifier: codeVerifier,
          codeChallenge: codeChallenge,
        }),
      ),
    ),
  );
  const isBrowser = typeof window !== "undefined";
  const hasEthereum = isBrowser && _.has(window, "ethereum");
  const isMetamask = isMobile && hasEthereum;
  const isSafari: boolean = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const url = `${process.env.LINK_OIDC}/auth?client_id=${
    process.env.AUTH0_ID
  }&response_type=code&redirect_uri=${
    process.env.DOMAIN_PUBLIC + URI_DIRECT
  }&scope=${process.env.SCOPE}
    ${
      !isEmpty(callbackUrl)
        ? `&state=${callbackUrl.toString().trim()}`
        : `&state=${QUERY_DEFAULT_STATE_GID}`
    }&code_challenge_method=${process.env.CHALLENGE_METHOD}&code_challenge=${codeChallenge}`;
  if (isMobile && (isSafari || isMetamask)) {
    // router.push(url)
    redirect(url);
  } else {
    popupCenter({
      url: url,
    });
  }
};

export const signUp = (callbackUrl: any | unknown): any => {
  const codeVerifier = getCodeVerifier();
  const codeChallenge = getCodeChallenge(codeVerifier);
  localStorage.setItem(
    LOCALE_STORAGE.CODE_LOGIN,
    JSON.stringify(
      encryptData(
        JSON.stringify({
          codeVerifier: codeVerifier,
          codeChallenge: codeChallenge,
        }),
      ),
    ),
  );

  const isBrowser = typeof window !== "undefined";
  const hasEthereum = isBrowser && _.has(window, "ethereum");
  const isMetamask = isMobile && hasEthereum;
  const isSafari: boolean = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const url = `${process.env.LINK_OIDC}/auth?client_id=${
    process.env.AUTH0_ID
  }&response_type=code&redirect_uri=${
    process.env.DOMAIN_PUBLIC + URI_DIRECT
  }&scope=${process.env.SCOPE}
    ${
      !isEmpty(callbackUrl)
        ? `&state=${callbackUrl.toString().trim()}`
        : `&state=${QUERY_DEFAULT_STATE_GID}`
    }&code_challenge_method=${
      process.env.CHALLENGE_METHOD
    }&prompt=create&code_challenge=${codeChallenge}`;
  if (isMobile && (isSafari || isMetamask)) {
    // router.push(url)
    redirect(url);
  } else {
    popupCenter({
      url: url,
    });
  }
};
