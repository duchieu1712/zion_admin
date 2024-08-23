import { utils } from "ethers";

import GalixERC20AbiJson from "../../../../../abi/GalixERC20.abi.json";
export const GalixERC20AbiIface = new utils.Interface(GalixERC20AbiJson);

import GalixERC721AbiJson from "../../../../../abi/GalixERC721.abi.json";
export const GalixERC721AbiIface = new utils.Interface(GalixERC721AbiJson);

import GalixERC721MarketAbiJson from "../../../../../abi/GalixERC721Market.abi.json";
export const GalixERC721MarketAbiIface = new utils.Interface(
  GalixERC721MarketAbiJson
);
