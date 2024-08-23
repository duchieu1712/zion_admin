import { SERVICE_ID } from "../../common/enum";
export const ITrans_FILTER_AND = ";";
export const ITrans_FILTER_OR = ",";

export interface ITransFilters {
  terms: string;
  collections?: string[]; //or [namespace]
  prices: {
    min?: string;
    max?: string;
  };
  orders: Record<string, string>;
  limit: number;
  offset: number;
  metadataTypes?: string[];
  metadataIndexs?: number[];
  metadataRaritys?: number[];
  metadataNftType?: string;
  metadataLevels?: {
    min: string;
    max: string;
  };
  metadataGrades?: {
    min: number;
    max: number;
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

export type GetData = {
  time: number;
};

export type GetTransactionDatas = {
  account?: string;
  filters?: any;
  serviceID?: SERVICE_ID;
};

export type State = {
  getDataTransactions?: GetTransactionDatas | null;
  dataTransactionOnRequest?: number | null;
  dataResponseTransactions?: any | null;
};

export type Action = {
  type: string | null;
  state?: State;
};

export const stateInitial: State = {
  getDataTransactions: null,
  dataTransactionOnRequest: null,
  dataResponseTransactions: null,
};

export const actionInitial: Action = {
  type: null,
  state: stateInitial,
};
