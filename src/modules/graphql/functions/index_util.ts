import * as gql_Flashpoint from "../gql/gql_Flashpoint";
import * as gql_RichWorkFamily from "../gql/gql_RichWorkFamily";
import * as qpl9D from "../gql/gql_9D";
import * as qplCommon from "../gql/gql_Common";
import * as qplGalix from "../gql/gql_Galix";
import * as qplMarswar from "../gql/gql_Marswaw";

import { DashboardData, TransactionsData } from "../types";
import { Statistic, Transaction } from "../types/generated";
import {
  getCollectionByType,
  graphGatewayEndpointFromNamespace,
  graphGatewayEndpointFromNamespace_v2,
} from "../../../common/utilities_config";

import { DEFAULT_MAX_VALUE_FILTER_DASHBOARD } from "../../../common/constants";
import { GraphQLClient } from "graphql-request";
import { ITransFilters } from "../../transaction/types";
import { SERVICE_ID } from "../../../common/enum";
import { cast } from "../../../common/utilities";

export const getGraphQLClient = (namespace: string): GraphQLClient | null => {
  const endpoint = graphGatewayEndpointFromNamespace(namespace);
  if (endpoint.endpoint == null) return null;
  return new GraphQLClient(endpoint.endpoint);
};

export const getGraphQLClient_v2 = (
  namespace: string,
  serviceID: string | number,
): GraphQLClient | null => {
  const endpoint = graphGatewayEndpointFromNamespace_v2(namespace, serviceID);
  if (endpoint.endpoint == null) return null;
  return new GraphQLClient(endpoint.endpoint);
};

// Get Dashboard Listing
export async function getDashboardData(
  namespace: string, //Market namespace
  request: any | unknown,
): Promise<DashboardData | null> {
  let pTrans = 0;
  let pTotal = 0;
  const ret: DashboardData = {
    numTransaction: 0,
    totalPriceTransaction: 0,
    avgTotalPriceTransaction: 0,
  };
  const graphQLClient = getGraphQLClient_v2(namespace, request?.serviceId);
  if (graphQLClient == null) return null;
  try {
    for (let i = 0; i < DEFAULT_MAX_VALUE_FILTER_DASHBOARD; i = i + 1000) {
      const variables = {
        where: {},
        first: 1000,
        skip: i,
        orderBy: "id",
        orderDirection: "asc",
      };
      if (request?.time != undefined) {
        variables["where"]["time_gt"] = request?.time.toString();
      }
      const data = await graphQLClient.request(qplCommon.getDashboardData as any, variables);
      if (data != null && data["statistics"].length != 0) {
        for (let j = 0; j < data["statistics"].length; j++) {
          const b = cast<Statistic>(data["statistics"][j]);
          pTrans = pTrans + parseInt(b.totalTransaction.toString());
          pTotal = pTotal + parseFloat(b.volume.toString());
        }
      } else {
        break;
      }
    }
    ret.numTransaction = pTrans;
    ret.totalPriceTransaction = pTotal;
    if (pTotal) ret.avgTotalPriceTransaction = pTotal / pTrans;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
  return ret;
}

type ITransFiltersNew = ITransFilters | null;
type SERVICE_IDNew = SERVICE_ID | null;

// Get Dashboard Sold
export async function getTransactionData(
  namespace: string, //Market Transaction
  filters: ITransFiltersNew = null,
  serviceID: SERVICE_IDNew = null,
  account: any = null,
): Promise<TransactionsData> {
  const ret: TransactionsData = {
    trans: [],
    pageInfo: {
      hasPrevPage: false,
      hasNextPage: false,
    },
  };
  const graphQLClient = getGraphQLClient_v2(namespace, serviceID as any);
  if (graphQLClient == null) return ret;
  const variables = {
    where: {},
    first: 1,
    skip: 0,
    orderBy: "timestamp",
    orderDirection: "desc",
  };

  if (filters?.metadataNftType != undefined && filters?.metadataNftType != "") {
    // get collection
    variables["where"]["collection"] = getCollectionByType(
      filters?.metadataNftType,
      serviceID as any,
    );
  }

  if (account != undefined && account != "") {
    variables["where"]["sender"] = account.toLowerCase();
  }

  if (filters?.limit != undefined && filters?.offset != undefined) {
    variables["first"] = filters?.limit + 1;
    variables["skip"] = filters?.offset;
  }
  if (filters?.prices != undefined) {
    variables["where"]["price_gte"] = filters?.prices?.min?.toString();
    variables["where"]["price_lte"] = filters?.prices?.max?.toString();
  }

  if (filters?.orders != undefined) {
    if (filters?.orders.created != undefined) {
      variables["orderBy"] = "timestamp";
      variables["orderDirection"] = filters?.orders.created;
    }
    if (filters?.orders.price != undefined) {
      variables["orderBy"] = "price";
      variables["orderDirection"] = filters?.orders.price;
    }
  }

  variables["where"]["kind"] = "Sale";

  try {
    let data;
    if (serviceID == SERVICE_ID._9DNFT || serviceID == SERVICE_ID._SOUL_REALM) {
      data = await graphQLClient.request(qpl9D.getTransaction, variables);
    } else if (serviceID == SERVICE_ID._GALIXCITY) {
      data = await graphQLClient.request(qplGalix.getTransaction, variables);
    } else if (serviceID == SERVICE_ID._MARSWAR) {
      data = await graphQLClient.request(qplMarswar.getTransaction, variables);
    } else if (serviceID == SERVICE_ID._FLASHPOINT || serviceID == SERVICE_ID._FANTASY_DYNASTY) {
      data = await graphQLClient.request(gql_Flashpoint.getTransaction, variables);
    } else if (serviceID == SERVICE_ID._RICHWORK_FARM_FAMILY) {
      data = await graphQLClient.request(gql_RichWorkFamily.getTransaction, variables);
    } else {
      data = await graphQLClient.request(qplGalix.getTransaction, variables);
    }

    const trans = cast<Transaction[]>(data["transactions"]);
    ret["pageInfo"] = {
      hasPrevPage: filters!.offset > 0,
      hasNextPage: trans.length > filters!.limit,
    };
    //delete trans[filters?.limit]
    trans.splice(filters!.limit, 1);
    ret.trans = trans;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
  return ret;
}
