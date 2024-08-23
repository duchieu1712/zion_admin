import { Nft, BidOrder, Transaction, Pool, UserStake, PoolSimpleEarn } from "./generated";

export type PageInfo = {
  hasPrevPage: boolean;
  hasNextPage: boolean;
};

export type NftsData = {
  nfts: Nft[];
  pageInfo: PageInfo;
};

export type BidsData = {
  bids: BidOrder[];
  pageInfo: PageInfo;
};

export type PoolsData = {
  pools: PoolSimpleEarn[];
  pageInfo: PageInfo;
};

export type BoxsData = {
  boxs: Pool[];
  pageInfo: PageInfo;
};

export type UserStakesData = {
  users: UserStake[];
  pageInfo: PageInfo;
};

export type TransactionsData = {
  trans: Transaction[];
  pageInfo: PageInfo;
};

export type DashboardData = {
  numTransaction: number;
  totalPriceTransaction: number;
  avgTotalPriceTransaction: number;
};
