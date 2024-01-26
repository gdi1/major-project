import { createSlice } from "@reduxjs/toolkit";

const workingCopySlice = createSlice({
  name: "workingCopy",
  initialState: {
    solution: {},
    internalState: {},
  },
  reducers: {
    restoreWorkingCopy(state, action) {
      const { solution, internalState } = action.payload;
      state.solution = solution;
      state.internalState = internalState;
    },
  },
});

export const workingCopyActions = workingCopySlice.actions;
export default workingCopySlice;
