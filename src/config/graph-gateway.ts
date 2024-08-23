// import { IGraphGateway } from '../common/types'

import { SERVICE_ID } from "../common/enum";

export const graphGateways = [
  {
    namespace: "erc721market_nft",
    endpoints: [
      // _ZION_NETWORK
      {
        chainId: 176923,
        endpoint: [
          {
            serviceID: SERVICE_ID._ZION_SERVICE,
            serviceName: "ZIONX SERVICE",
            endpoint: "https://graphql-gateway.nemoverse.io/ziontestnet/justtesting",
          },
        ],
      },
    ],
  },
];
