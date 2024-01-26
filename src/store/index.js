import { configureStore } from "@reduxjs/toolkit";
import constraintsSlice from "./constraints";
import solutionSlice from "./solution";
import currentConstraintSlice from "./currentConstraint";
import constraintFlowSlice from "./constraintFlow";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import workingCopySlice from "./workingCopy";
import snapshotsHistorySlice from "./snapshotsHistory";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: hardSet,
};

const rootReducer = combineReducers({
  constraints: constraintsSlice.reducer,
  solution: solutionSlice.reducer,
  currentConstraint: currentConstraintSlice.reducer,
  flow: constraintFlowSlice.reducer,
  workingCopy: workingCopySlice.reducer,
  snapshotsHistory: snapshotsHistorySlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
