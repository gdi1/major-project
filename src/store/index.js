import { configureStore } from "@reduxjs/toolkit";
import constraintsSlice from "./constraints";
import solutionSlice from "./solution";
import currentConstraintSlice from "./currentConstraint";

const store = configureStore({
  reducer: {
    constraints: constraintsSlice.reducer,
    solution: solutionSlice.reducer,
    currentConstraint: currentConstraintSlice.reducer,
  },
});

export default store;
