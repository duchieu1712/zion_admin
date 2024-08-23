import { SERVICE_ID } from "../common/enum";
import { ICollection } from "../common/types";

export const cf_Collections_ZIONNetwork: ICollection[] = [
  {
    name: "ZION SERVICE NFT",
    symbol: "NFT",
    contractNamespace: "erc721_zion_njt",
    icon: "/images/images_copy/nft/icons/pet.png",
    slug: "zsnft",
    isBurnToUse: true,
    serviceID: SERVICE_ID._ZION_SERVICE,
  },
];

export const Collections: ICollection[] = [...cf_Collections_ZIONNetwork];
