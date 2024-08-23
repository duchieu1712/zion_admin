import { fork, all } from "redux-saga/effects";
import createSagaMiddleware, { type Task } from "redux-saga";
import { configureStore, combineReducers, Store } from "@reduxjs/toolkit";

import walletSagas from "./wallet/sagas";
import walletReducers from "./wallet/reducers";
import profileSagas from "./profile/sagas";
import profileReducers from "./profile/reducers";
import accountSagas from "./account/sagas";
import accountReducers from "./account/reducers";
import nftReducer from "./nft/reducers";
import nftSagas from "./nft/sagas";
import transactionReducer from "./transaction/reducers";
import transactionSagas from "./transaction/sagas";
import dashboardReducer from "./dashboard/reducers";
import dashboardSagas from "./dashboard/sagas";
import logger from "./middleware";
import { PROD } from "../common/constants";

const rootReducer = combineReducers({
  wallet: walletReducers,
  profile: profileReducers,
  account: accountReducers,
  nft: nftReducer,
  transaction: transactionReducer,
  dashboard: dashboardReducer,
});

export function* rootSaga(): any {
  yield all([
    fork(walletSagas),
    fork(profileSagas),
    fork(accountSagas),
    fork(nftSagas),
    fork(transactionSagas),
    fork(dashboardSagas),
  ]);
}

export interface SagaStore extends Store {
  sagaTask: Task;
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = !PROD ? [sagaMiddleware, logger] : [sagaMiddleware];

// const middlewares = !PROD
//   ? [require('redux-immutable-state-invariant').default(), sagaMiddleware, logger]
//   : [sagaMiddleware]

// eslint-disable-next-line

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
  devTools: !PROD,
});

(store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

const appState = () => store.getState();
const appDispatch = (action: any) => store.dispatch(action);

export type RootStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;

export { store, appState, appDispatch };
