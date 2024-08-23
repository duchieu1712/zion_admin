export type State = {
  contractWalletAA?: any;
  dataAccount?: any;
  signing?: boolean;
  requestSignOut?: boolean;
  requestConnectWallet?: boolean;
};

export type Action = {
  type: string | null;
  state?: State;
};

export const stateInitial: State = {
  contractWalletAA: null,
  dataAccount: null,
  signing: false,
  requestSignOut: false,
};

export const actionInitial: Action = {
  type: null,
  state: stateInitial,
};
