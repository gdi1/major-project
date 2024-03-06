import { configureStore } from "@reduxjs/toolkit";
import configurationsSlice from "./configurations";
import solutionSlice from "./solution";
import constraintFlowSlice from "./constraintFlow";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import snapshotsHistorySlice from "./snapshotsHistory";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: hardSet,
};

const rootReducer = combineReducers({
  configurations: configurationsSlice.reducer,
  solution: solutionSlice.reducer,
  flow: constraintFlowSlice.reducer,
  snapshotsHistory: snapshotsHistorySlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
