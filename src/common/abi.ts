import GalixBridgeAbiJson from "../../galix_abi_docs/abi/GalixBridge.abi.json";
import GalixBridgeWithSupportingAbiJson from "../../galix_abi_docs/abi/GalixBridgeWithSupporting.abi.json";
import GalixERC20AbiJson from "../../galix_abi_docs/abi/GalixERC20.abi.json";
import GalixERC20HotWalletAbiJson from "../../galix_abi_docs/abi/GalixERC20HotWallet.abi.json";
import GalixERC721AbiJson from "../../galix_abi_docs/abi/GalixERC721.abi.json";
import GalixERC721LandAbiJson from "../../galix_abi_docs/abi/GalixERC721Land.abi.json";
import GalixERC721LandRentAbiJson from "../../galix_abi_docs/abi/GalixERC721LandRent.abi.json";
import GalixERC721MarketAbiJson from "../../galix_abi_docs/abi/GalixERC721Market.abi.json";
import GalixSimpleEarnAbiJson from "../../galix_abi_docs/abi/GalixSimpleEarn.abi.json";
import GalixStakingPoolAbiJson from "../../galix_abi_docs/abi/GalixStakingPool.abi.json";
import GalixZapPoolAbiJson from "../../galix_abi_docs/abi/GalixZapPool.abi.json";
import { Interface } from "ethers/abi";
import KogiINOMarketAbiJson from "../../galix_abi_docs/abi/GalixINOMarket.abi.json";
import OPSERC721AbiJson from "../../galix_abi_docs/abi/OPSERC721.abi.json";
import SWAP_ZIONAbiJson from "../../galix_abi_docs/abi/ZIONWrapper.abi.json";
import ZIONERC404AbiJson from "../../galix_abi_docs/abi/ZIONERC404.abi.json";

const GalixERC20AbiIface = new Interface(GalixERC20AbiJson);
export const GalixERC20Abi = GalixERC20AbiIface.format();

const GalixERC20HotWalletIface = new Interface(GalixERC20HotWalletAbiJson);
export const GalixERC20HotWalletAbi = GalixERC20HotWalletIface.format();

const GalixERC721Iface = new Interface(GalixERC721AbiJson);
export const GalixERC721Abi = GalixERC721Iface.format();

const GalixERC721MarketIface = new Interface(GalixERC721MarketAbiJson);
export const GalixERC721MarketAbi = GalixERC721MarketIface.format();

const GalixStakingPoolIface = new Interface(GalixStakingPoolAbiJson);
export const GalixStakingPoolAbi = GalixStakingPoolIface.format();

const GalixZapPoolIface = new Interface(GalixZapPoolAbiJson);
export const GalixZapPoolAbi = GalixZapPoolIface.format();

const GalixERC721LandIface = new Interface(GalixERC721LandAbiJson);
export const GalixERC721LandIfaceAbi = GalixERC721LandIface.format();

const KogiINOMarketIface = new Interface(KogiINOMarketAbiJson);
export const KogiINOMarketAbi = KogiINOMarketIface.format();

const GalixERC721LandRentIface = new Interface(GalixERC721LandRentAbiJson);
export const GalixERC721LandRentAbi = GalixERC721LandRentIface.format();

const GalixBridgeIface = new Interface(GalixBridgeAbiJson);
export const GalixBridgeAbi = GalixBridgeIface.format();

const GalixBridgeWithSupportingIface = new Interface(GalixBridgeWithSupportingAbiJson);
export const GalixBridgeWithSupportingAbi = GalixBridgeWithSupportingIface.format();

const GalixSimpleEarnIface = new Interface(GalixSimpleEarnAbiJson);
export const GalixSimpleEarnAbi = GalixSimpleEarnIface.format();

const OPSERC721Iface = new Interface(OPSERC721AbiJson);
export const OPSERC721Abi = OPSERC721Iface.format();

const ZIONERC404AbiIface = new Interface(ZIONERC404AbiJson);
export const ZIONERC404Abi = ZIONERC404AbiIface.format();

const SWAP_ZIONAbiIface = new Interface(SWAP_ZIONAbiJson);
export const SWAP_ZIONAbi = SWAP_ZIONAbiIface.format();
