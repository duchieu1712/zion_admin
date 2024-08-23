import {
  GalixERC20Abi,
  GalixERC721Abi,
  GalixERC721MarketAbi,
  SWAP_ZIONAbi,
  ZIONERC404Abi,
} from "../common/abi";
import { type IContract } from "../common/types";
import { SERVICE_ID } from "../common/enum";

export const _testnetZIONx = {
  USDC_CONTRACT: "0x8AE2c8F89A63FC6bADB8cC3bF9489D6Ef64e2526",
  NEMO_CONTRACT: "0x7e701A98D9408c5609D0a409723A313D3739f721",
  ZION_CONTRACT: "0xb3FB3fD03b2F48a07f0dBA717Ecc0084995795a3",
  wZION_CONTRACT: "0x9C7CaFA89Ef572Bf4B34CF67445C8119537ba71e",
  WRAPPER_ZION_WZION: "0x0B82b6Eb1054E92D3024b7fCe40ac8ac1E46Ad47",
  // Marketplace ZION Network
  _ZIONNETWORK_NJT: "0x7DB769004Efda51EcfBCB16E2602B43EC905B459",
  _ZIONNETWORK_MARKET_CONTRACT: "0x0e8ddC6e97Ed8289bdaAaFCE11c7b883DB619320",
};
// net zion
// const _ZIONx = {
//  TESTTOKEN3_CONTRACT: "0x61fBbDfd6EE187d8e86692292Dd4703Af3F81881",
//  // Marketplace ZION Network
//  _ZIONNETWORK_NJT: "0x7DB769004Efda51EcfBCB16E2602B43EC905B459",
//  _ZIONNETWORK_MARKET_CONTRACT: "0x0e8ddC6e97Ed8289bdaAaFCE11c7b883DB619320",
// };

///
export const contracts: IContract[] = [
  {
    chainId: 176923,
    namespace: "usdc_coin",
    address: _testnetZIONx.USDC_CONTRACT,
    abi: GalixERC20Abi,
  },
  {
    chainId: 176923,
    namespace: "nemo_coin",
    address: _testnetZIONx.NEMO_CONTRACT,
    abi: GalixERC20Abi,
  },
  {
    chainId: 176923,
    namespace: "zion_coin",
    address: _testnetZIONx.ZION_CONTRACT,
    abi: GalixERC20Abi,
  },
  {
    chainId: 176923,
    namespace: "wzion_coin",
    address: _testnetZIONx.wZION_CONTRACT,
    abi: ZIONERC404Abi,
  },
  {
    chainId: 176923,
    namespace: "erc721_zion_njt",
    address: _testnetZIONx._ZIONNETWORK_NJT,
    abi: GalixERC721Abi,
    service_id: SERVICE_ID._9DNFT,
  },
  {
    chainId: 176923,
    namespace: "erc721market_zionservicenft",
    address: _testnetZIONx._ZIONNETWORK_MARKET_CONTRACT,
    abi: GalixERC721MarketAbi,
    service_id: SERVICE_ID._ZION_SERVICE,
  },
  {
    chainId: 176923,
    namespace: "zion_wrapper",
    address: _testnetZIONx.WRAPPER_ZION_WZION,
    abi: SWAP_ZIONAbi,
  },
];

export default contracts;
