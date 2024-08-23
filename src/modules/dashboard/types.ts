export interface DashboardStatistics {
  total_sales?: number;
  total_volume?: number; //or [namespace]
  item_sold?: number;
}

export type GetData = {
  time: number;
};

export type State = {
  getData?: any;
  dataOnRequest?: number | null;
  dataResponse?: any;
};

export type Action = {
  type: string | null;
  state?: State;
};

export const stateInitial: State = {
  getData: null,
  dataOnRequest: null,
  dataResponse: null,
};

export const actionInitial: Action = {
  type: null,
  state: stateInitial,
};
