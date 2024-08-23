/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  BigDecimal: { input: any; output: any };
  BigInt: { input: any; output: any };
  Bytes: { input: any; output: any };
};

export type AskOrder = {
  __typename?: "AskOrder";
  /** Bids */
  bids: Array<BidOrder>;
  /** Collection */
  collection: Collection;
  /** Block hash */
  id: Scalars["ID"]["output"];
  /** isTradable */
  isTradable: Scalars["Boolean"]["output"];
  /** NFT */
  nft: Nft;
  /** Ask Price */
  price: Scalars["BigDecimal"]["output"];
  /** Seller */
  seller: User;
  /** Transaction hash */
  tx: Scalars["String"]["output"];
  /** Updated at */
  updatedAt: Scalars["BigInt"]["output"];
};

export type AskOrderBidsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<BidOrder_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<BidOrder_Filter>;
};

export type AskOrder_Filter = {
  collection?: InputMaybe<Scalars["String"]["input"]>;
  collection_contains?: InputMaybe<Scalars["String"]["input"]>;
  collection_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  collection_gt?: InputMaybe<Scalars["String"]["input"]>;
  collection_gte?: InputMaybe<Scalars["String"]["input"]>;
  collection_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  collection_lt?: InputMaybe<Scalars["String"]["input"]>;
  collection_lte?: InputMaybe<Scalars["String"]["input"]>;
  collection_not?: InputMaybe<Scalars["String"]["input"]>;
  collection_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  collection_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  collection_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  collection_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  collection_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  isTradable?: InputMaybe<Scalars["Boolean"]["input"]>;
  isTradable_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  isTradable_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  isTradable_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  nft?: InputMaybe<Scalars["String"]["input"]>;
  nft_contains?: InputMaybe<Scalars["String"]["input"]>;
  nft_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  nft_gt?: InputMaybe<Scalars["String"]["input"]>;
  nft_gte?: InputMaybe<Scalars["String"]["input"]>;
  nft_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  nft_lt?: InputMaybe<Scalars["String"]["input"]>;
  nft_lte?: InputMaybe<Scalars["String"]["input"]>;
  nft_not?: InputMaybe<Scalars["String"]["input"]>;
  nft_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  nft_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  nft_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  nft_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  nft_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  price?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  price_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  price_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  price_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  price_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  price_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  price_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  price_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  seller?: InputMaybe<Scalars["String"]["input"]>;
  seller_contains?: InputMaybe<Scalars["String"]["input"]>;
  seller_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  seller_gt?: InputMaybe<Scalars["String"]["input"]>;
  seller_gte?: InputMaybe<Scalars["String"]["input"]>;
  seller_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  seller_lt?: InputMaybe<Scalars["String"]["input"]>;
  seller_lte?: InputMaybe<Scalars["String"]["input"]>;
  seller_not?: InputMaybe<Scalars["String"]["input"]>;
  seller_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  seller_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  seller_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  seller_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  seller_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  tx?: InputMaybe<Scalars["String"]["input"]>;
  tx_contains?: InputMaybe<Scalars["String"]["input"]>;
  tx_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  tx_gt?: InputMaybe<Scalars["String"]["input"]>;
  tx_gte?: InputMaybe<Scalars["String"]["input"]>;
  tx_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  tx_lt?: InputMaybe<Scalars["String"]["input"]>;
  tx_lte?: InputMaybe<Scalars["String"]["input"]>;
  tx_not?: InputMaybe<Scalars["String"]["input"]>;
  tx_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  tx_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  tx_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  tx_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  tx_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  updatedAt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAt_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAt_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAt_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAt_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAt_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAt_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAt_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum AskOrder_OrderBy {
  Bids = "bids",
  Collection = "collection",
  Id = "id",
  IsTradable = "isTradable",
  Nft = "nft",
  Price = "price",
  Seller = "seller",
  Tx = "tx",
  UpdatedAt = "updatedAt",
}

export type BidOrder = {
  __typename?: "BidOrder";
  /** ask */
  ask: AskOrder;
  /** Buyer */
  buyer: User;
  /** Collection */
  collection: Collection;
  /** ask ID + buyer ID */
  id: Scalars["ID"]["output"];
  /** isTradable */
  isTradable: Scalars["Boolean"]["output"];
  /** NFT */
  nft: Nft;
  /** NFT Metadata Index */
  nftMetadataIndex: Scalars["Int"]["output"];
  /** NFT Metadata Level */
  nftMetadataLevel: Scalars["Int"]["output"];
  /** NFT Metadata Name */
  nftMetadataName: Scalars["String"]["output"];
  /** NFT Metadata Type */
  nftMetadataNftType: Scalars["String"]["output"];
  /** NFT Metadata Quality */
  nftMetadataQuality: Scalars["Int"]["output"];
  /** NFT Metadata Rarity */
  nftMetadataRarity: Scalars["Int"]["output"];
  /** NFT Metadata Star */
  nftMetadataStar: Scalars["Int"]["output"];
  /** NFT Metadata Type */
  nftMetadataType: Scalars["String"]["output"];
  /** Bid Price */
  price: Scalars["BigDecimal"]["output"];
  /** Transaction hash */
  tx: Scalars["String"]["output"];
  /** Updated at */
  updatedAt: Scalars["BigInt"]["output"];
};

export type BidOrder_Filter = {
  ask?: InputMaybe<Scalars["String"]["input"]>;
  ask_contains?: InputMaybe<Scalars["String"]["input"]>;
  ask_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  ask_gt?: InputMaybe<Scalars["String"]["input"]>;
  ask_gte?: InputMaybe<Scalars["String"]["input"]>;
  ask_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  ask_lt?: InputMaybe<Scalars["String"]["input"]>;
  ask_lte?: InputMaybe<Scalars["String"]["input"]>;
  ask_not?: InputMaybe<Scalars["String"]["input"]>;
  ask_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  ask_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  ask_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  ask_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  ask_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  buyer?: InputMaybe<Scalars["String"]["input"]>;
  buyer_contains?: InputMaybe<Scalars["String"]["input"]>;
  buyer_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  buyer_gt?: InputMaybe<Scalars["String"]["input"]>;
  buyer_gte?: InputMaybe<Scalars["String"]["input"]>;
  buyer_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  buyer_lt?: InputMaybe<Scalars["String"]["input"]>;
  buyer_lte?: InputMaybe<Scalars["String"]["input"]>;
  buyer_not?: InputMaybe<Scalars["String"]["input"]>;
  buyer_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  buyer_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  buyer_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  buyer_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  buyer_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  collection?: InputMaybe<Scalars["String"]["input"]>;
  collection_contains?: InputMaybe<Scalars["String"]["input"]>;
  collection_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  collection_gt?: InputMaybe<Scalars["String"]["input"]>;
  collection_gte?: InputMaybe<Scalars["String"]["input"]>;
  collection_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  collection_lt?: InputMaybe<Scalars["String"]["input"]>;
  collection_lte?: InputMaybe<Scalars["String"]["input"]>;
  collection_not?: InputMaybe<Scalars["String"]["input"]>;
  collection_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  collection_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  collection_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  collection_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  collection_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  isTradable?: InputMaybe<Scalars["Boolean"]["input"]>;
  isTradable_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  isTradable_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  isTradable_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  nft?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataIndex?: InputMaybe<Scalars["Int"]["input"]>;
  nftMetadataIndex_gt?: InputMaybe<Scalars["Int"]["input"]>;
  nftMetadataIndex_gte?: InputMaybe<Scalars["Int"]["input"]>;
  nftMetadataIndex_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  nftMetadataIndex_lt?: InputMaybe<Scalars["Int"]["input"]>;
  nftMetadataIndex_lte?: InputMaybe<Scalars["Int"]["input"]>;
  nftMetadataIndex_not?: InputMaybe<Scalars["Int"]["input"]>;
  nftMetadataIndex_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  nftMetadataLevel?: InputMaybe<Scalars["Int"]["input"]>;
  nftMetadataLevel_gt?: InputMaybe<Scalars["Int"]["input"]>;
  nftMetadataLevel_gte?: InputMaybe<Scalars["Int"]["input"]>;
  nftMetadataLevel_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  nftMetadataLevel_lt?: InputMaybe<Scalars["Int"]["input"]>;
  nftMetadataLevel_lte?: InputMaybe<Scalars["Int"]["input"]>;
  nftMetadataLevel_not?: InputMaybe<Scalars["Int"]["input"]>;
  nftMetadataLevel_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  nftMetadataName?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataName_contains?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataName_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataName_gt?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataName_gte?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataName_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  nftMetadataName_lt?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataName_lte?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataName_not?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataName_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataName_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataName_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  nftMetadataName_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataName_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataNftType?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataNftType_contains?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataNftType_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataNftType_gt?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataNftType_gte?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataNftType_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  nftMetadataNftType_lt?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataNftType_lte?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataNftType_not?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataNftType_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataNftType_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataNftType_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  nftMetadataNftType_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataNftType_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataQuality?: InputMaybe<Scalars["Int"]["input"]>;
  nftMetadataQuality_gt?: InputMaybe<Scalars["Int"]["input"]>;
  nftMetadataQuality_gte?: InputMaybe<Scalars["Int"]["input"]>;
  nftMetadataQuality_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  nftMetadataQuality_lt?: InputMaybe<Scalars["Int"]["input"]>;
  nftMetadataQuality_lte?: InputMaybe<Scalars["Int"]["input"]>;
  nftMetadataQuality_not?: InputMaybe<Scalars["Int"]["input"]>;
  nftMetadataQuality_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  nftMetadataRarity?: InputMaybe<Scalars["Int"]["input"]>;
  nftMetadataRarity_gt?: InputMaybe<Scalars["Int"]["input"]>;
  nftMetadataRarity_gte?: InputMaybe<Scalars["Int"]["input"]>;
  nftMetadataRarity_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  nftMetadataRarity_lt?: InputMaybe<Scalars["Int"]["input"]>;
  nftMetadataRarity_lte?: InputMaybe<Scalars["Int"]["input"]>;
  nftMetadataRarity_not?: InputMaybe<Scalars["Int"]["input"]>;
  nftMetadataRarity_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  nftMetadataStar?: InputMaybe<Scalars["Int"]["input"]>;
  nftMetadataStar_gt?: InputMaybe<Scalars["Int"]["input"]>;
  nftMetadataStar_gte?: InputMaybe<Scalars["Int"]["input"]>;
  nftMetadataStar_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  nftMetadataStar_lt?: InputMaybe<Scalars["Int"]["input"]>;
  nftMetadataStar_lte?: InputMaybe<Scalars["Int"]["input"]>;
  nftMetadataStar_not?: InputMaybe<Scalars["Int"]["input"]>;
  nftMetadataStar_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  nftMetadataType?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataType_contains?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataType_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataType_gt?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataType_gte?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataType_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  nftMetadataType_lt?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataType_lte?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataType_not?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataType_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataType_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataType_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  nftMetadataType_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  nftMetadataType_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  nft_contains?: InputMaybe<Scalars["String"]["input"]>;
  nft_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  nft_gt?: InputMaybe<Scalars["String"]["input"]>;
  nft_gte?: InputMaybe<Scalars["String"]["input"]>;
  nft_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  nft_lt?: InputMaybe<Scalars["String"]["input"]>;
  nft_lte?: InputMaybe<Scalars["String"]["input"]>;
  nft_not?: InputMaybe<Scalars["String"]["input"]>;
  nft_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  nft_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  nft_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  nft_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  nft_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  price?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  price_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  price_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  price_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  price_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  price_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  price_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  price_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  tx?: InputMaybe<Scalars["String"]["input"]>;
  tx_contains?: InputMaybe<Scalars["String"]["input"]>;
  tx_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  tx_gt?: InputMaybe<Scalars["String"]["input"]>;
  tx_gte?: InputMaybe<Scalars["String"]["input"]>;
  tx_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  tx_lt?: InputMaybe<Scalars["String"]["input"]>;
  tx_lte?: InputMaybe<Scalars["String"]["input"]>;
  tx_not?: InputMaybe<Scalars["String"]["input"]>;
  tx_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  tx_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  tx_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  tx_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  tx_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  updatedAt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAt_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAt_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAt_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAt_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAt_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAt_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAt_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum BidOrder_OrderBy {
  Ask = "ask",
  Buyer = "buyer",
  Collection = "collection",
  Id = "id",
  IsTradable = "isTradable",
  Nft = "nft",
  NftMetadataIndex = "nftMetadataIndex",
  NftMetadataLevel = "nftMetadataLevel",
  NftMetadataName = "nftMetadataName",
  NftMetadataNftType = "nftMetadataNftType",
  NftMetadataQuality = "nftMetadataQuality",
  NftMetadataRarity = "nftMetadataRarity",
  NftMetadataStar = "nftMetadataStar",
  NftMetadataType = "nftMetadataType",
  Price = "price",
  Tx = "tx",
  UpdatedAt = "updatedAt",
}

export type Block_Height = {
  hash?: InputMaybe<Scalars["Bytes"]["input"]>;
  number?: InputMaybe<Scalars["Int"]["input"]>;
};

export type Collection = {
  __typename?: "Collection";
  /** ID (address) */
  id: Scalars["ID"]["output"];
  /** Name */
  name: Scalars["String"]["output"];
  /** List of NFTs */
  nfts: Array<Nft>;
  /** Symbol */
  symbol: Scalars["String"]["output"];
};

export type CollectionNftsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Nft_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Nft_Filter>;
};

export type Collection_Filter = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  name_contains?: InputMaybe<Scalars["String"]["input"]>;
  name_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  name_gt?: InputMaybe<Scalars["String"]["input"]>;
  name_gte?: InputMaybe<Scalars["String"]["input"]>;
  name_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name_lt?: InputMaybe<Scalars["String"]["input"]>;
  name_lte?: InputMaybe<Scalars["String"]["input"]>;
  name_not?: InputMaybe<Scalars["String"]["input"]>;
  name_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  name_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  name_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  name_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  symbol?: InputMaybe<Scalars["String"]["input"]>;
  symbol_contains?: InputMaybe<Scalars["String"]["input"]>;
  symbol_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  symbol_gt?: InputMaybe<Scalars["String"]["input"]>;
  symbol_gte?: InputMaybe<Scalars["String"]["input"]>;
  symbol_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  symbol_lt?: InputMaybe<Scalars["String"]["input"]>;
  symbol_lte?: InputMaybe<Scalars["String"]["input"]>;
  symbol_not?: InputMaybe<Scalars["String"]["input"]>;
  symbol_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  symbol_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  symbol_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  symbol_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  symbol_starts_with?: InputMaybe<Scalars["String"]["input"]>;
};

export enum Collection_OrderBy {
  Id = "id",
  Name = "name",
  Nfts = "nfts",
  Symbol = "symbol",
}

export type Metadata = {
  __typename?: "Metadata";
  /** List of attribute */
  attributes: Array<MetadataAttribute>;
  /** Description */
  description: Scalars["String"]["output"];
  /** ID (cid) */
  id: Scalars["ID"]["output"];
  /** Image */
  image: Scalars["String"]["output"];
  /** Name */
  name: Scalars["String"]["output"];
  /** NFT */
  nft?: Maybe<Nft>;
};

export type MetadataAttributesArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<MetadataAttribute_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<MetadataAttribute_Filter>;
};

export type MetadataAttribute = {
  __typename?: "MetadataAttribute";
  /** display_type */
  display_type: Scalars["String"]["output"];
  /** Metadata + incr */
  id: Scalars["ID"]["output"];
  /** Metadata (cid) */
  metadata: Metadata;
  /** trait_type */
  trait_type: Scalars["String"]["output"];
  /** value */
  value: Scalars["String"]["output"];
};

export type MetadataAttribute_Filter = {
  display_type?: InputMaybe<Scalars["String"]["input"]>;
  display_type_contains?: InputMaybe<Scalars["String"]["input"]>;
  display_type_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  display_type_gt?: InputMaybe<Scalars["String"]["input"]>;
  display_type_gte?: InputMaybe<Scalars["String"]["input"]>;
  display_type_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  display_type_lt?: InputMaybe<Scalars["String"]["input"]>;
  display_type_lte?: InputMaybe<Scalars["String"]["input"]>;
  display_type_not?: InputMaybe<Scalars["String"]["input"]>;
  display_type_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  display_type_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  display_type_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  display_type_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  display_type_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  metadata?: InputMaybe<Scalars["String"]["input"]>;
  metadata_contains?: InputMaybe<Scalars["String"]["input"]>;
  metadata_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  metadata_gt?: InputMaybe<Scalars["String"]["input"]>;
  metadata_gte?: InputMaybe<Scalars["String"]["input"]>;
  metadata_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  metadata_lt?: InputMaybe<Scalars["String"]["input"]>;
  metadata_lte?: InputMaybe<Scalars["String"]["input"]>;
  metadata_not?: InputMaybe<Scalars["String"]["input"]>;
  metadata_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  metadata_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  metadata_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  metadata_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  metadata_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  trait_type?: InputMaybe<Scalars["String"]["input"]>;
  trait_type_contains?: InputMaybe<Scalars["String"]["input"]>;
  trait_type_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  trait_type_gt?: InputMaybe<Scalars["String"]["input"]>;
  trait_type_gte?: InputMaybe<Scalars["String"]["input"]>;
  trait_type_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  trait_type_lt?: InputMaybe<Scalars["String"]["input"]>;
  trait_type_lte?: InputMaybe<Scalars["String"]["input"]>;
  trait_type_not?: InputMaybe<Scalars["String"]["input"]>;
  trait_type_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  trait_type_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  trait_type_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  trait_type_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  trait_type_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  value?: InputMaybe<Scalars["String"]["input"]>;
  value_contains?: InputMaybe<Scalars["String"]["input"]>;
  value_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  value_gt?: InputMaybe<Scalars["String"]["input"]>;
  value_gte?: InputMaybe<Scalars["String"]["input"]>;
  value_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  value_lt?: InputMaybe<Scalars["String"]["input"]>;
  value_lte?: InputMaybe<Scalars["String"]["input"]>;
  value_not?: InputMaybe<Scalars["String"]["input"]>;
  value_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  value_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  value_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  value_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  value_starts_with?: InputMaybe<Scalars["String"]["input"]>;
};

export enum MetadataAttribute_OrderBy {
  DisplayType = "display_type",
  Id = "id",
  Metadata = "metadata",
  TraitType = "trait_type",
  Value = "value",
}

export type Metadata_Filter = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  description_contains?: InputMaybe<Scalars["String"]["input"]>;
  description_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  description_gt?: InputMaybe<Scalars["String"]["input"]>;
  description_gte?: InputMaybe<Scalars["String"]["input"]>;
  description_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  description_lt?: InputMaybe<Scalars["String"]["input"]>;
  description_lte?: InputMaybe<Scalars["String"]["input"]>;
  description_not?: InputMaybe<Scalars["String"]["input"]>;
  description_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  description_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  description_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  description_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  description_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  image?: InputMaybe<Scalars["String"]["input"]>;
  image_contains?: InputMaybe<Scalars["String"]["input"]>;
  image_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  image_gt?: InputMaybe<Scalars["String"]["input"]>;
  image_gte?: InputMaybe<Scalars["String"]["input"]>;
  image_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  image_lt?: InputMaybe<Scalars["String"]["input"]>;
  image_lte?: InputMaybe<Scalars["String"]["input"]>;
  image_not?: InputMaybe<Scalars["String"]["input"]>;
  image_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  image_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  image_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  image_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  image_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  name_contains?: InputMaybe<Scalars["String"]["input"]>;
  name_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  name_gt?: InputMaybe<Scalars["String"]["input"]>;
  name_gte?: InputMaybe<Scalars["String"]["input"]>;
  name_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name_lt?: InputMaybe<Scalars["String"]["input"]>;
  name_lte?: InputMaybe<Scalars["String"]["input"]>;
  name_not?: InputMaybe<Scalars["String"]["input"]>;
  name_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  name_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  name_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  name_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  nft?: InputMaybe<Scalars["String"]["input"]>;
  nft_contains?: InputMaybe<Scalars["String"]["input"]>;
  nft_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  nft_gt?: InputMaybe<Scalars["String"]["input"]>;
  nft_gte?: InputMaybe<Scalars["String"]["input"]>;
  nft_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  nft_lt?: InputMaybe<Scalars["String"]["input"]>;
  nft_lte?: InputMaybe<Scalars["String"]["input"]>;
  nft_not?: InputMaybe<Scalars["String"]["input"]>;
  nft_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  nft_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  nft_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  nft_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  nft_starts_with?: InputMaybe<Scalars["String"]["input"]>;
};

export enum Metadata_OrderBy {
  Attributes = "attributes",
  Description = "description",
  Id = "id",
  Image = "image",
  Name = "name",
  Nft = "nft",
}

export type Nft = {
  __typename?: "NFT";
  /** current ask ID */
  askId?: Maybe<Scalars["String"]["output"]>;
  /** ask Price */
  askPrice: Scalars["BigDecimal"]["output"];
  /** asks */
  asks: Array<AskOrder>;
  /** current bid ID */
  bidId?: Maybe<Array<Scalars["String"]["output"]>>;
  /** bids */
  bids: Array<BidOrder>;
  /** Collection address */
  collection: Collection;
  /** CollectionAddress + tokenId */
  id: Scalars["ID"]["output"];
  /** isTradable */
  isTradable: Scalars["Boolean"]["output"];
  /** Metadata cid */
  metadata: Metadata;
  /** Metadata Index */
  metadataIndex: Scalars["Int"]["output"];
  /** Metadata Level */
  metadataLevel: Scalars["Int"]["output"];
  /** Metadata Name */
  metadataName: Scalars["String"]["output"];
  /** Metadata NFT Type */
  metadataNftType: Scalars["String"]["output"];
  /** Metadata Quality */
  metadataQuality: Scalars["Int"]["output"];
  /** Metadata Rarity */
  metadataRarity: Scalars["Int"]["output"];
  /** Metadata Star */
  metadataStar: Scalars["Int"]["output"];
  /** Metadata Type */
  metadataType: Scalars["String"]["output"];
  /** Owner */
  owner: User;
  /** seller */
  seller: User;
  /** tokenId */
  tokenId: Scalars["BigInt"]["output"];
  /** Transaction history */
  transactionHistory: Array<Transaction>;
  /** Updated at */
  updatedAt: Scalars["BigInt"]["output"];
};

export type NftAsksArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<AskOrder_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<AskOrder_Filter>;
};

export type NftBidsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<BidOrder_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<BidOrder_Filter>;
};

export type NftTransactionHistoryArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Transaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Transaction_Filter>;
};

export type Nft_Filter = {
  askId?: InputMaybe<Scalars["String"]["input"]>;
  askId_contains?: InputMaybe<Scalars["String"]["input"]>;
  askId_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  askId_gt?: InputMaybe<Scalars["String"]["input"]>;
  askId_gte?: InputMaybe<Scalars["String"]["input"]>;
  askId_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  askId_lt?: InputMaybe<Scalars["String"]["input"]>;
  askId_lte?: InputMaybe<Scalars["String"]["input"]>;
  askId_not?: InputMaybe<Scalars["String"]["input"]>;
  askId_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  askId_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  askId_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  askId_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  askId_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  askPrice?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  askPrice_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  askPrice_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  askPrice_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  askPrice_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  askPrice_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  askPrice_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  askPrice_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  bidId?: InputMaybe<Array<Scalars["String"]["input"]>>;
  bidId_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  bidId_not?: InputMaybe<Array<Scalars["String"]["input"]>>;
  bidId_not_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  collection?: InputMaybe<Scalars["String"]["input"]>;
  collection_contains?: InputMaybe<Scalars["String"]["input"]>;
  collection_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  collection_gt?: InputMaybe<Scalars["String"]["input"]>;
  collection_gte?: InputMaybe<Scalars["String"]["input"]>;
  collection_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  collection_lt?: InputMaybe<Scalars["String"]["input"]>;
  collection_lte?: InputMaybe<Scalars["String"]["input"]>;
  collection_not?: InputMaybe<Scalars["String"]["input"]>;
  collection_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  collection_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  collection_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  collection_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  collection_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  isTradable?: InputMaybe<Scalars["Boolean"]["input"]>;
  isTradable_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  isTradable_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  isTradable_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  metadata?: InputMaybe<Scalars["String"]["input"]>;
  metadataIndex?: InputMaybe<Scalars["Int"]["input"]>;
  metadataIndex_gt?: InputMaybe<Scalars["Int"]["input"]>;
  metadataIndex_gte?: InputMaybe<Scalars["Int"]["input"]>;
  metadataIndex_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  metadataIndex_lt?: InputMaybe<Scalars["Int"]["input"]>;
  metadataIndex_lte?: InputMaybe<Scalars["Int"]["input"]>;
  metadataIndex_not?: InputMaybe<Scalars["Int"]["input"]>;
  metadataIndex_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  metadataLevel?: InputMaybe<Scalars["Int"]["input"]>;
  metadataLevel_gt?: InputMaybe<Scalars["Int"]["input"]>;
  metadataLevel_gte?: InputMaybe<Scalars["Int"]["input"]>;
  metadataLevel_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  metadataLevel_lt?: InputMaybe<Scalars["Int"]["input"]>;
  metadataLevel_lte?: InputMaybe<Scalars["Int"]["input"]>;
  metadataLevel_not?: InputMaybe<Scalars["Int"]["input"]>;
  metadataLevel_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  metadataName?: InputMaybe<Scalars["String"]["input"]>;
  metadataName_contains?: InputMaybe<Scalars["String"]["input"]>;
  metadataName_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  metadataName_gt?: InputMaybe<Scalars["String"]["input"]>;
  metadataName_gte?: InputMaybe<Scalars["String"]["input"]>;
  metadataName_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  metadataName_lt?: InputMaybe<Scalars["String"]["input"]>;
  metadataName_lte?: InputMaybe<Scalars["String"]["input"]>;
  metadataName_not?: InputMaybe<Scalars["String"]["input"]>;
  metadataName_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  metadataName_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  metadataName_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  metadataName_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  metadataName_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  metadataNftType?: InputMaybe<Scalars["String"]["input"]>;
  metadataNftType_contains?: InputMaybe<Scalars["String"]["input"]>;
  metadataNftType_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  metadataNftType_gt?: InputMaybe<Scalars["String"]["input"]>;
  metadataNftType_gte?: InputMaybe<Scalars["String"]["input"]>;
  metadataNftType_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  metadataNftType_lt?: InputMaybe<Scalars["String"]["input"]>;
  metadataNftType_lte?: InputMaybe<Scalars["String"]["input"]>;
  metadataNftType_not?: InputMaybe<Scalars["String"]["input"]>;
  metadataNftType_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  metadataNftType_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  metadataNftType_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  metadataNftType_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  metadataNftType_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  metadataQuality?: InputMaybe<Scalars["Int"]["input"]>;
  metadataQuality_gt?: InputMaybe<Scalars["Int"]["input"]>;
  metadataQuality_gte?: InputMaybe<Scalars["Int"]["input"]>;
  metadataQuality_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  metadataQuality_lt?: InputMaybe<Scalars["Int"]["input"]>;
  metadataQuality_lte?: InputMaybe<Scalars["Int"]["input"]>;
  metadataQuality_not?: InputMaybe<Scalars["Int"]["input"]>;
  metadataQuality_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  metadataRarity?: InputMaybe<Scalars["Int"]["input"]>;
  metadataRarity_gt?: InputMaybe<Scalars["Int"]["input"]>;
  metadataRarity_gte?: InputMaybe<Scalars["Int"]["input"]>;
  metadataRarity_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  metadataRarity_lt?: InputMaybe<Scalars["Int"]["input"]>;
  metadataRarity_lte?: InputMaybe<Scalars["Int"]["input"]>;
  metadataRarity_not?: InputMaybe<Scalars["Int"]["input"]>;
  metadataRarity_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  metadataStar?: InputMaybe<Scalars["Int"]["input"]>;
  metadataStar_gt?: InputMaybe<Scalars["Int"]["input"]>;
  metadataStar_gte?: InputMaybe<Scalars["Int"]["input"]>;
  metadataStar_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  metadataStar_lt?: InputMaybe<Scalars["Int"]["input"]>;
  metadataStar_lte?: InputMaybe<Scalars["Int"]["input"]>;
  metadataStar_not?: InputMaybe<Scalars["Int"]["input"]>;
  metadataStar_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  metadataType?: InputMaybe<Scalars["String"]["input"]>;
  metadataType_contains?: InputMaybe<Scalars["String"]["input"]>;
  metadataType_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  metadataType_gt?: InputMaybe<Scalars["String"]["input"]>;
  metadataType_gte?: InputMaybe<Scalars["String"]["input"]>;
  metadataType_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  metadataType_lt?: InputMaybe<Scalars["String"]["input"]>;
  metadataType_lte?: InputMaybe<Scalars["String"]["input"]>;
  metadataType_not?: InputMaybe<Scalars["String"]["input"]>;
  metadataType_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  metadataType_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  metadataType_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  metadataType_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  metadataType_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  metadata_contains?: InputMaybe<Scalars["String"]["input"]>;
  metadata_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  metadata_gt?: InputMaybe<Scalars["String"]["input"]>;
  metadata_gte?: InputMaybe<Scalars["String"]["input"]>;
  metadata_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  metadata_lt?: InputMaybe<Scalars["String"]["input"]>;
  metadata_lte?: InputMaybe<Scalars["String"]["input"]>;
  metadata_not?: InputMaybe<Scalars["String"]["input"]>;
  metadata_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  metadata_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  metadata_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  metadata_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  metadata_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  owner?: InputMaybe<Scalars["String"]["input"]>;
  owner_contains?: InputMaybe<Scalars["String"]["input"]>;
  owner_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  owner_gt?: InputMaybe<Scalars["String"]["input"]>;
  owner_gte?: InputMaybe<Scalars["String"]["input"]>;
  owner_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  owner_lt?: InputMaybe<Scalars["String"]["input"]>;
  owner_lte?: InputMaybe<Scalars["String"]["input"]>;
  owner_not?: InputMaybe<Scalars["String"]["input"]>;
  owner_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  owner_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  owner_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  owner_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  owner_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  seller?: InputMaybe<Scalars["String"]["input"]>;
  seller_contains?: InputMaybe<Scalars["String"]["input"]>;
  seller_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  seller_gt?: InputMaybe<Scalars["String"]["input"]>;
  seller_gte?: InputMaybe<Scalars["String"]["input"]>;
  seller_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  seller_lt?: InputMaybe<Scalars["String"]["input"]>;
  seller_lte?: InputMaybe<Scalars["String"]["input"]>;
  seller_not?: InputMaybe<Scalars["String"]["input"]>;
  seller_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  seller_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  seller_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  seller_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  seller_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  tokenId?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tokenId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAt_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAt_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAt_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAt_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAt_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAt_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAt_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum Nft_OrderBy {
  AskId = "askId",
  AskPrice = "askPrice",
  Asks = "asks",
  BidId = "bidId",
  Bids = "bids",
  Collection = "collection",
  Id = "id",
  IsTradable = "isTradable",
  Metadata = "metadata",
  MetadataIndex = "metadataIndex",
  MetadataLevel = "metadataLevel",
  MetadataName = "metadataName",
  MetadataNftType = "metadataNftType",
  MetadataQuality = "metadataQuality",
  MetadataRarity = "metadataRarity",
  MetadataStar = "metadataStar",
  MetadataType = "metadataType",
  Owner = "owner",
  Seller = "seller",
  TokenId = "tokenId",
  TransactionHistory = "transactionHistory",
  UpdatedAt = "updatedAt",
}

export enum OrderDirection {
  Asc = "asc",
  Desc = "desc",
}

export type Query = {
  __typename?: "Query";
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  askOrder?: Maybe<AskOrder>;
  askOrders: Array<AskOrder>;
  bidOrder?: Maybe<BidOrder>;
  bidOrders: Array<BidOrder>;
  collection?: Maybe<Collection>;
  collections: Array<Collection>;
  metadata: Array<Metadata>;
  metadataAttribute?: Maybe<MetadataAttribute>;
  metadataAttributes: Array<MetadataAttribute>;
  nft?: Maybe<Nft>;
  nfts: Array<Nft>;
  statistic?: Maybe<Statistic>;
  statistics: Array<Statistic>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  user?: Maybe<User>;
  users: Array<User>;
};

export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type QueryAskOrderArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
};

export type QueryAskOrdersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<AskOrder_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<AskOrder_Filter>;
};

export type QueryBidOrderArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
};

export type QueryBidOrdersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<BidOrder_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<BidOrder_Filter>;
};

export type QueryCollectionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
};

export type QueryCollectionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Collection_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Collection_Filter>;
};

export type QueryMetadataArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Metadata_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Metadata_Filter>;
};

export type QueryMetadataAttributeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
};

export type QueryMetadataAttributesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<MetadataAttribute_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<MetadataAttribute_Filter>;
};

export type QueryNftArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
};

export type QueryNftsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Nft_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Nft_Filter>;
};

export type QueryStatisticArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
};

export type QueryStatisticsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Statistic_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Statistic_Filter>;
};

export type QueryTransactionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
};

export type QueryTransactionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Transaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Transaction_Filter>;
};

export type QueryUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
};

export type QueryUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<User_Filter>;
};

export type Statistic = {
  __typename?: "Statistic";
  /** Collection */
  collection: Collection;
  /** Total transaction fee */
  fee_volume: Scalars["BigDecimal"]["output"];
  id: Scalars["ID"]["output"];
  /** Time */
  time: Scalars["BigInt"]["output"];
  /** Total transaction */
  totalTransaction: Scalars["BigInt"]["output"];
  /** Total transaction amount */
  volume: Scalars["BigDecimal"]["output"];
};

export type Statistic_Filter = {
  collection?: InputMaybe<Scalars["String"]["input"]>;
  collection_contains?: InputMaybe<Scalars["String"]["input"]>;
  collection_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  collection_gt?: InputMaybe<Scalars["String"]["input"]>;
  collection_gte?: InputMaybe<Scalars["String"]["input"]>;
  collection_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  collection_lt?: InputMaybe<Scalars["String"]["input"]>;
  collection_lte?: InputMaybe<Scalars["String"]["input"]>;
  collection_not?: InputMaybe<Scalars["String"]["input"]>;
  collection_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  collection_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  collection_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  collection_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  collection_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  fee_volume?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  fee_volume_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  fee_volume_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  fee_volume_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  fee_volume_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  fee_volume_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  fee_volume_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  fee_volume_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  time?: InputMaybe<Scalars["BigInt"]["input"]>;
  time_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  time_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  time_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  time_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  time_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  time_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  time_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalTransaction?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalTransaction_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalTransaction_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalTransaction_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalTransaction_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalTransaction_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalTransaction_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalTransaction_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  volume?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volume_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volume_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volume_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volume_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volume_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volume_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volume_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
};

export enum Statistic_OrderBy {
  Collection = "collection",
  FeeVolume = "fee_volume",
  Id = "id",
  Time = "time",
  TotalTransaction = "totalTransaction",
  Volume = "volume",
}

export type Subscription = {
  __typename?: "Subscription";
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  askOrder?: Maybe<AskOrder>;
  askOrders: Array<AskOrder>;
  bidOrder?: Maybe<BidOrder>;
  bidOrders: Array<BidOrder>;
  collection?: Maybe<Collection>;
  collections: Array<Collection>;
  metadata: Array<Metadata>;
  metadataAttribute?: Maybe<MetadataAttribute>;
  metadataAttributes: Array<MetadataAttribute>;
  nft?: Maybe<Nft>;
  nfts: Array<Nft>;
  statistic?: Maybe<Statistic>;
  statistics: Array<Statistic>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  user?: Maybe<User>;
  users: Array<User>;
};

export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type SubscriptionAskOrderArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
};

export type SubscriptionAskOrdersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<AskOrder_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<AskOrder_Filter>;
};

export type SubscriptionBidOrderArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
};

export type SubscriptionBidOrdersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<BidOrder_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<BidOrder_Filter>;
};

export type SubscriptionCollectionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
};

export type SubscriptionCollectionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Collection_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Collection_Filter>;
};

export type SubscriptionMetadataArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Metadata_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Metadata_Filter>;
};

export type SubscriptionMetadataAttributeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
};

export type SubscriptionMetadataAttributesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<MetadataAttribute_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<MetadataAttribute_Filter>;
};

export type SubscriptionNftArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
};

export type SubscriptionNftsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Nft_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Nft_Filter>;
};

export type SubscriptionStatisticArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
};

export type SubscriptionStatisticsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Statistic_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Statistic_Filter>;
};

export type SubscriptionTransactionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
};

export type SubscriptionTransactionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Transaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Transaction_Filter>;
};

export type SubscriptionUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
};

export type SubscriptionUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<User_Filter>;
};

export type Transaction = {
  __typename?: "Transaction";
  block: Scalars["BigInt"]["output"];
  /** Collection */
  collection: Collection;
  id: Scalars["ID"]["output"];
  /** Kind */
  kind: TransactionKind;
  /** NFT */
  nft: Nft;
  /** price (in COGI) */
  price: Scalars["BigDecimal"]["output"];
  /** transfer Recipient */
  recipient: User;
  /** transfer Sender */
  sender: User;
  /** Timestamp */
  timestamp: Scalars["BigInt"]["output"];
};

export enum TransactionKind {
  Bid = "Bid",
  Burn = "Burn",
  Cancel = "Cancel",
  Ino = "INO",
  List = "List",
  Mint = "Mint",
  Sale = "Sale",
  Transfer = "Transfer",
  UpgradeLand = "UpgradeLand",
}

export type Transaction_Filter = {
  block?: InputMaybe<Scalars["BigInt"]["input"]>;
  block_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  block_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  block_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  block_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  block_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  block_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  block_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  collection?: InputMaybe<Scalars["String"]["input"]>;
  collection_contains?: InputMaybe<Scalars["String"]["input"]>;
  collection_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  collection_gt?: InputMaybe<Scalars["String"]["input"]>;
  collection_gte?: InputMaybe<Scalars["String"]["input"]>;
  collection_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  collection_lt?: InputMaybe<Scalars["String"]["input"]>;
  collection_lte?: InputMaybe<Scalars["String"]["input"]>;
  collection_not?: InputMaybe<Scalars["String"]["input"]>;
  collection_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  collection_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  collection_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  collection_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  collection_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  kind?: InputMaybe<TransactionKind>;
  kind_not?: InputMaybe<TransactionKind>;
  nft?: InputMaybe<Scalars["String"]["input"]>;
  nft_contains?: InputMaybe<Scalars["String"]["input"]>;
  nft_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  nft_gt?: InputMaybe<Scalars["String"]["input"]>;
  nft_gte?: InputMaybe<Scalars["String"]["input"]>;
  nft_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  nft_lt?: InputMaybe<Scalars["String"]["input"]>;
  nft_lte?: InputMaybe<Scalars["String"]["input"]>;
  nft_not?: InputMaybe<Scalars["String"]["input"]>;
  nft_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  nft_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  nft_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  nft_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  nft_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  price?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  price_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  price_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  price_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  price_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  price_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  price_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  price_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  recipient?: InputMaybe<Scalars["String"]["input"]>;
  recipient_contains?: InputMaybe<Scalars["String"]["input"]>;
  recipient_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  recipient_gt?: InputMaybe<Scalars["String"]["input"]>;
  recipient_gte?: InputMaybe<Scalars["String"]["input"]>;
  recipient_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  recipient_lt?: InputMaybe<Scalars["String"]["input"]>;
  recipient_lte?: InputMaybe<Scalars["String"]["input"]>;
  recipient_not?: InputMaybe<Scalars["String"]["input"]>;
  recipient_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  recipient_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  recipient_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  recipient_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  recipient_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  sender?: InputMaybe<Scalars["String"]["input"]>;
  sender_contains?: InputMaybe<Scalars["String"]["input"]>;
  sender_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  sender_gt?: InputMaybe<Scalars["String"]["input"]>;
  sender_gte?: InputMaybe<Scalars["String"]["input"]>;
  sender_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  sender_lt?: InputMaybe<Scalars["String"]["input"]>;
  sender_lte?: InputMaybe<Scalars["String"]["input"]>;
  sender_not?: InputMaybe<Scalars["String"]["input"]>;
  sender_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  sender_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  sender_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  sender_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  sender_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum Transaction_OrderBy {
  Block = "block",
  Collection = "collection",
  Id = "id",
  Kind = "kind",
  Nft = "nft",
  Price = "price",
  Recipient = "recipient",
  Sender = "sender",
  Timestamp = "timestamp",
}

export type User = {
  __typename?: "User";
  /** List of NFTs */
  askNfts: Array<Nft>;
  /** User address */
  id: Scalars["ID"]["output"];
  /** NFTs */
  nfts: Array<Nft>;
  /** Number of tokens */
  numberTokens: Scalars["BigInt"]["output"];
  /** Number of tokens currently listed */
  numberTokensListed: Scalars["BigInt"]["output"];
  /** Number of tokens purchased */
  numberTokensPurchased: Scalars["BigInt"]["output"];
  /** Number of tokens sold */
  numberTokensSold: Scalars["BigInt"]["output"];
};

export type UserAskNftsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Nft_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Nft_Filter>;
};

export type UserNftsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Nft_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Nft_Filter>;
};

export type User_Filter = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  numberTokens?: InputMaybe<Scalars["BigInt"]["input"]>;
  numberTokensListed?: InputMaybe<Scalars["BigInt"]["input"]>;
  numberTokensListed_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  numberTokensListed_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  numberTokensListed_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  numberTokensListed_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  numberTokensListed_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  numberTokensListed_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  numberTokensListed_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  numberTokensPurchased?: InputMaybe<Scalars["BigInt"]["input"]>;
  numberTokensPurchased_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  numberTokensPurchased_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  numberTokensPurchased_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  numberTokensPurchased_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  numberTokensPurchased_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  numberTokensPurchased_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  numberTokensPurchased_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  numberTokensSold?: InputMaybe<Scalars["BigInt"]["input"]>;
  numberTokensSold_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  numberTokensSold_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  numberTokensSold_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  numberTokensSold_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  numberTokensSold_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  numberTokensSold_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  numberTokensSold_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  numberTokens_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  numberTokens_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  numberTokens_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  numberTokens_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  numberTokens_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  numberTokens_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  numberTokens_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum User_OrderBy {
  AskNfts = "askNfts",
  Id = "id",
  Nfts = "nfts",
  NumberTokens = "numberTokens",
  NumberTokensListed = "numberTokensListed",
  NumberTokensPurchased = "numberTokensPurchased",
  NumberTokensSold = "numberTokensSold",
}

export type _Block_ = {
  __typename?: "_Block_";
  /** The hash of the block */
  hash?: Maybe<Scalars["Bytes"]["output"]>;
  /** The block number */
  number: Scalars["Int"]["output"];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: "_Meta_";
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars["String"]["output"];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars["Boolean"]["output"];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = "allow",
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = "deny",
}
