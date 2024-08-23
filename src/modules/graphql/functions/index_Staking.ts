import * as qplGalix from "../gql/gql_Galix";
import * as qplStaking from "../gql/gql_Staking";

import { PoolRentingLand, PoolSimpleEarn } from "../types/generated";

import { SubscribedUser } from "../types/generated";
import { cast } from "../../../common/utilities";
import { getGraphQLClient } from "./index_util";

export async function getDataLandRenting(
  namespace: string,
  account: string,
): Promise<PoolRentingLand | null> {
  const graphQLClient = getGraphQLClient(namespace);
  if (graphQLClient == null) return null;
  const variables = {
    where: {},
    first: 1000,
    skip: 0,
    orderBy: "id",
    orderDirection: "desc",
  };
  try {
    const data: any = await graphQLClient.request(
      qplGalix.getListRentingLand.replace("{account}", account?.toLowerCase() ?? ""),
      variables,
    );
    return cast<PoolRentingLand>(data["pools"][0]);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
  return null;
}

export async function getListPool(
  namespace: string, //Market namespace
  account: string,
): Promise<any[]> {
  let ret: any[] = [];
  const graphQLClient = getGraphQLClient(namespace);
  if (graphQLClient == null) return ret;
  const variables = {
    where: {},
    first: 100,
    skip: 0,
  };

  try {
    const data: any = await graphQLClient.request(
      (qplStaking?.getListPool as any).replace("{account}", account?.toLowerCase() ?? ""),
      variables,
    );
    const pools = cast<PoolSimpleEarn[]>(data["pools"]);
    ret = pools;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
  return ret;
}

export async function getListPoolStaked(
  namespace: string, //Market namespace
  account: string,
): Promise<any[]> {
  let ret: any[] = [];
  const graphQLClient = getGraphQLClient(namespace);
  if (graphQLClient == null) return ret;
  const variables = {
    where: {},
    first: 100,
    skip: 0,
  };

  if (account) {
    variables["where"]["account"] = account?.toString()?.trim()?.toLowerCase();
  }

  try {
    const data: any = await graphQLClient.request(qplStaking.getListPoolStaked as any, variables);
    const pools = cast<SubscribedUser[]>(data["subscribedUsers"]);
    ret = pools;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
  return ret;
}
