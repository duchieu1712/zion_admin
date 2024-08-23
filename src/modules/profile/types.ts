export interface DashboardStatistics {
  total_sales?: number;
  total_volume?: number; //or [namespace]
  item_sold?: number;
}

export type GetData = {
  time: number;
};

export type State = {
  onActionConnect?: boolean | null;
  onActionRegister?: boolean | null;
  onActionLogIn?: boolean | null;
  onActionChangePW?: boolean | null;
  onActionLinkAccount?: boolean | null;
  onActionCreatePIN?: boolean | null;
  getDataClaim?: string | null;
  dataClaimOnRequest?: number | null;
  dataClaimResponse?: any | null;
  getDataRefer?: any | null;
  dataReferOnRequest?: number | null;
  dataReferResponse?: any | null;
  dataGetFriendsResponse?: DataFriendClaim | null;
  dataGetInfoResponse?: DataInfoClaim | null;
  getDataAuthenticators_Enabled?: any | null;
  dataAuthenticators_Enabled?: any | null;
  dataExtract_Secured_Methods?: any | null;
  confirm_2fa?: any;
};

export type Action = {
  type: string | null;
  state?: State;
};

export const stateInitial: State = {
  onActionConnect: false,
  onActionLogIn: false,
  onActionChangePW: false,
  onActionLinkAccount: false,
  onActionCreatePIN: false,
  getDataClaim: null,
  dataClaimOnRequest: null,
  dataClaimResponse: null,
  getDataRefer: null,
  dataReferOnRequest: null,
  dataReferResponse: null,
  dataGetFriendsResponse: null,
  dataGetInfoResponse: null,
  confirm_2fa: null,
};

export const actionInitial: Action = {
  type: null,
  state: stateInitial,
};

export type DataClaim = {
  friend_address?: string;
};

export type DataFriendClaim = {
  account?: string;
  refer_code?: string;
  presenter?: string;
  rewards?: string;
  claimed?: string;
  timestamp?: number;
};

export type DataInfoClaim = {
  invited?: number;
  received?: string;
  available?: string;
};

export type DataRefer = {
  refer_code?: string;
  presenter?: string;
  presenter_code?: string;
};
