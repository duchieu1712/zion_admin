import { IChainData } from "../common/types";

class Default {
  public Chain: IChainData;

  private static instance: Default;
  public static getInstance(): Default {
    if (!Default.instance) {
      Default.instance = new Default();
    }
    return Default.instance;
  }

  private constructor() {
    this.Chain = {
      name: "",
      shortName: "",
      chain: "",
      network: "",
      chainId: 0,
      networkId: 0,
      rpcUrl: "",
      blockTime: 0,
      explorer: "",
      nativeCurrency: {
        symbol: "",
        name: "",
        decimals: 0,
        contractNamespace: "",
      },
    };
  }

  public setChain(_chain: IChainData): void {
    this.Chain = _chain;
  }
}

export default Default.getInstance();
