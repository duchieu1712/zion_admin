import { gql } from "../../../__generated__/gql";

export const getDashboardData = gql(`
  query getNftData(
    $first: Int
    $skip: Int!
    $where: Statistic_filter
    $orderBy: Statistic_orderBy
    $orderDirection: OrderDirection
  ) {
    statistics(
      where: $where
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      skip: $skip
    ) {
      id
      time
      totalTransaction
      volume
      collection {
        id
      }
    }
  }
`);
