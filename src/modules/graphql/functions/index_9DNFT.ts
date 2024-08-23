import { collectionsAddressFromSlugs } from "../../../common/utilities_config";
import * as qpl9D from "../gql/gql_9D";
import { Nft, BidOrder } from "../types/generated";
import { INFTFilters } from "../../nft/types";
import { BidsData, NftsData } from "../types";
import { cast, unConvertFromURL } from "../../../common/utilities";
import { getGraphQLClient_v2 } from "./index_util";

// item Detail
export async function getNftData_9DNFT(
  namespace: string, //Market namespace
  serviceID: string,
  address: string, //nft contract address
  tokenId: string,
): Promise<Nft | null> {
  const graphQLClient = getGraphQLClient_v2(namespace, serviceID);
  if (graphQLClient == null) return null;
  const variables = {
    where: {
      collection: address.toLowerCase(),
      tokenId: tokenId,
    },
  };
  try {
    const data: any = await graphQLClient.request(qpl9D.getNftData, variables);
    return cast<Nft>(data["nfts"][0]);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
  return null;
}

// List Data Inventory
export async function getNftsData_9DNFT(
  namespace: string, //Market namespace
  serviceID: string | number,
  seller: string,
  owner: string,
  filters: INFTFilters | null = null,
): Promise<NftsData> {
  const ret: NftsData = {
    nfts: [],
    pageInfo: {
      hasPrevPage: false,
      hasNextPage: false,
    },
  };
  const graphQLClient = getGraphQLClient_v2(namespace, serviceID);
  if (graphQLClient == null) return ret;
  const variables = {
    where: {},
    first: 1,
    skip: 0,
    orderBy: "askPrice",
    orderDirection: "asc",
  };

  if (seller != null && seller != "") {
    variables["where"]["seller"] = seller.toLowerCase();
  }

  if (owner != null) {
    variables["where"]["owner"] = owner.toLowerCase();
    variables["where"]["isTradable"] = false;
  } else {
    //getMarketDatas
    variables["where"]["isTradable"] = true;
  }

  if (filters?.collections != undefined) {
    const collectionsAddress = collectionsAddressFromSlugs(filters?.collections, serviceID);
    const _c: any[] = [];
    for (let i = 0; i < collectionsAddress.length; i++) {
      _c.push(collectionsAddress[i].toLowerCase());
    }
    if (_c.length != 0) {
      variables["where"]["collection_in"] = _c;
    }
  }

  if (filters?.metadataTypes != undefined) {
    variables["where"]["metadataType_in"] = filters?.metadataTypes;
  }

  if (filters?.metadataLevels != undefined) {
    variables["where"]["metadataLevel_in"] = filters?.metadataLevels;
  }

  if (filters?.metadataGrades != undefined) {
    variables["where"]["metadataGrade_gte"] = parseInt(filters?.metadataGrades.min!.toString());
    variables["where"]["metadataGrade_lte"] = parseInt(filters?.metadataGrades.max!.toString());
  }

  if (filters?.metadataNames != undefined) {
    variables["where"]["metadataName_contains"] = unConvertFromURL(
      filters?.metadataNames.toLowerCase(),
    );
  }

  if (filters?.prices != undefined) {
    variables["where"]["askPrice_gte"] = filters?.prices.min?.toString();
    variables["where"]["askPrice_lte"] = filters?.prices.max?.toString();
  }

  if (filters?.orders != undefined) {
    if (filters?.orders.created != undefined) {
      variables["orderBy"] = "updatedAt";
      variables["orderDirection"] = filters?.orders.created;
    }
    if (filters?.orders.price != undefined) {
      variables["orderBy"] = "askPrice";
      variables["orderDirection"] = filters?.orders.price;
    }
  }

  if (filters?.limit != undefined && filters?.offset != undefined) {
    variables["first"] = filters?.limit + 1;
    variables["skip"] = filters?.offset;
  }

  try {
    const data: any = await graphQLClient.request(qpl9D.getNftsData, variables);
    const nfts = cast<Nft[]>(data["nfts"]);
    ret["pageInfo"] = {
      hasPrevPage: filters?.offset! > 0,
      hasNextPage: nfts.length > filters?.limit!,
    };
    //delete nfts[filters?.limit]
    nfts.splice(filters?.limit!, 1);
    ret["nfts"] = nfts;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
  return ret;
}

// Get nfts offerring
export async function getNftDataOffering_9DNFT(
  namespace: string, //Market namespace
  serviceID: string,
  buyer: string | null = null,
  filters: INFTFilters | null = null,
): Promise<BidsData> {
  const ret: BidsData = {
    bids: [],
    pageInfo: {
      hasPrevPage: false,
      hasNextPage: false,
    },
  };
  const graphQLClient = getGraphQLClient_v2(namespace, serviceID);
  if (graphQLClient == null) return ret;
  const variables = {
    where: {},
    first: 1,
    skip: 0,
    orderBy: "price",
    orderDirection: "asc",
  };

  if (buyer != null) {
    variables["where"]["buyer"] = buyer.toLowerCase();
  }
  variables["where"]["isTradable"] = true;

  if (filters?.collections != undefined) {
    const collectionsAddress = collectionsAddressFromSlugs(filters?.collections, serviceID);
    const _c: any[] = [];
    for (let i = 0; i < collectionsAddress.length; i++) {
      _c.push(collectionsAddress[i].toLowerCase());
    }
    if (_c.length != 0) {
      variables["where"]["collection_in"] = _c;
    }
  }

  if (filters?.metadataTypes != undefined) {
    variables["where"]["nftMetadataType_in"] = filters?.metadataTypes;
  }

  if (filters?.metadataLevels != undefined) {
    variables["where"]["nftMetadataLevel_in"] = filters?.metadataLevels;
  }

  if (filters?.metadataNames != undefined) {
    variables["where"]["nftMetadataName_contains"] = unConvertFromURL(
      filters?.metadataNames.toLowerCase(),
    );
  }

  if (filters?.metadataGrades != undefined) {
    variables["where"]["nftMetadataGrade_gte"] = parseInt(filters?.metadataGrades.min!.toString());
    variables["where"]["nftMetadataGrade_lte"] = parseInt(filters?.metadataGrades.max!.toString());
  }

  if (filters?.prices != undefined) {
    variables["where"]["price_gte"] = filters?.prices.min!.toString();
    variables["where"]["price_lte"] = filters?.prices.max!.toString();
  }

  if (filters?.orders != undefined) {
    if (filters?.orders.created != undefined) {
      variables["orderBy"] = "updatedAt";
      variables["orderDirection"] = filters?.orders.created;
    }
    if (filters?.orders.price != undefined) {
      variables["orderBy"] = "price";
      variables["orderDirection"] = filters?.orders.price;
    }
  }

  if (filters?.limit != undefined && filters?.offset != undefined) {
    variables["first"] = filters?.limit + 1;
    variables["skip"] = filters?.offset;
  }

  try {
    const data: any = await graphQLClient.request(qpl9D.getNftDataOffering, variables);
    const bids = cast<BidOrder[]>(data["bidOrders"]);
    ret["pageInfo"] = {
      hasPrevPage: filters?.offset! > 0,
      hasNextPage: bids.length > filters?.limit!,
    };
    //delete bids[filters?.limit]
    bids.splice(filters?.limit!, 1);
    ret["bids"] = bids;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
  return ret;
}
