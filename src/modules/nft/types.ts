import { IContractRelay, INFTMetaData } from "../../common/types";
import { NftsData } from "../graphql/types";
import { Nft } from "../graphql/types/generated";

export const INFT_FILTER_AND = ";";
export const INFT_FILTER_OR = ",";

export interface INFTFilters {
  terms: string;
  collections?: string[]; //or [namespace]
  prices?: {
    min?: string;
    max?: string;
  };
  orders: Record<string, string>;
  limit: number;
  offset: number;
  metadataTypes?: string[];
  metadataRaritys?: number[];
  metadataQualitys?: number[];
  metadataIndexs?: number[];
  metadataStar?: {
    min?: string;
    max?: string;
  };
  metadataNftType?: any;
  metadataLevels?: {
    min?: string;
    max?: string;
  };
  metadataGrades?: {
    min?: number;
    max?: number;
  };
  metadataNames: string;
  clean?(key: string): void;
  remove?(key: string, value: string | Record<string, string>): void;
  push?(key: string, value: string | Record<string, string>): void;
  toString?(): string;
  toInterface?(): any;
  toDict?(): Record<string, any>;
  fromString?(str: string): any;
  fromObject?(object: any): any;
  includes?(k: any, v: any): boolean;
}

export type GetMarketDatas = {
  account?: string;
  filters?: INFTFilters;
  serviceID?: string | number;
};

export type GetDatas = {
  account?: string;
  filters: INFTFilters;
  serviceID?: string | number;
};

export type GetData = {
  collection: string;
  tokenId: string;
  serviceID?: string | number;
};

export type GetClaimables = {
  namespaces: string[];
  reload?: boolean;
};
export type Claimable = {
  namespace: string;
  cid: string;
  metadata: INFTMetaData;
  status: number;
};

export type ClaimablesResponse = Claimable[];

export type RequestClaim = {
  namespace: string;
  cid: string;
};
export type RequestClaimResponse = {
  namespace: string;
  contractRelay: IContractRelay;
};

export type CancelClaimResponse = {
  status: number;
  error?: any;
  request: Claimable;
};

export type GetAvailables = {
  namespaces: string[];
};

export type Available = {
  namespace: string;
  cid: string;
  metadata: INFTMetaData;
  status: number;
};

export type AvailableResponse = Available[];

export type State = {
  jsonrpcResponse?: any;

  getClaimables?: GetClaimables | null;
  claimablesResponse?: ClaimablesResponse | null;
  claimablesSubscribeResponse?: any | null;

  requestClaim?: RequestClaim | null;
  requestClaimResponse?: RequestClaimResponse | null;

  cancelClaim?: Claimable | null;
  cancelClaimResponse?: CancelClaimResponse | null;

  getAvailables?: GetAvailables | null;
  availablesResponse?: AvailableResponse | null;

  getData?: GetData | null;
  dataOnRequest?: number | null;
  dataResponse?: Nft | null;

  getDatas?: GetDatas | null;
  datasOnRequest?: number | null;
  datasResponse?: NftsData | null;

  getMarketDatas?: GetMarketDatas | null;
  marketDatasOnRequest?: number | null;
  marketDatasResponse?: NftsData | null;

  getFilterNameDatas?: GetMarketDatas | null;
  filterNameDatasOnRequest?: number | null;
  filterNameDatasResponse?: Nft[] | null;

  getFilterNameSellingDatas?: GetDatas | null;
  filterNameSellingDatasOnRequest?: number | null;
  filterNameSellingDatasResponse?: Nft[] | null;

  getFilterNameOfferingDatas?: GetDatas | null;
  filterNameOfferingDatasOnRequest?: number | null;
  filterNameOfferingDatasResponse?: Nft[] | null;

  getOfferingDatas?: GetDatas | null;
  offeringDatasOnRequest?: number | null;
  offeringDatasResponse?: NftsData | null;
};

export type Action = {
  type: string | null;
  state?: State;
};

export const stateInitial: State = {
  jsonrpcResponse: null,

  getClaimables: null,
  claimablesResponse: null,
  claimablesSubscribeResponse: null,

  requestClaim: null,
  requestClaimResponse: null,

  getAvailables: null,
  availablesResponse: null,

  getData: null,
  dataOnRequest: null,
  dataResponse: null,

  getDatas: null,
  datasOnRequest: null,
  datasResponse: null,

  getMarketDatas: null,
  marketDatasOnRequest: null,
  marketDatasResponse: null,

  getFilterNameDatas: null,
  filterNameDatasOnRequest: null,
  filterNameDatasResponse: null,

  getFilterNameSellingDatas: null,
  filterNameSellingDatasOnRequest: null,
  filterNameSellingDatasResponse: null,

  getFilterNameOfferingDatas: null,
  filterNameOfferingDatasOnRequest: null,
  filterNameOfferingDatasResponse: null,

  getOfferingDatas: null,
  offeringDatasOnRequest: null,
  offeringDatasResponse: null,
};

export const actionInitial: Action = {
  type: null,
  state: stateInitial,
};
