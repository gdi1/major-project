import { createSlice } from "@reduxjs/toolkit";

const workingCopySlice = createSlice({
  name: "workingCopy",
  initialState: {
    isWorkingCopy: false,
    solution: {},
    internalState: {},
  },
  reducers: {
    restoreWorkingCopy(state, action) {
      const { solution, internalState } = action.payload;
      state.solution = solution;
      state.internalState = internalState;
      state.isWorkingCopy = true;
    },
  },
});

export const workingCopyActions = workingCopySlice.actions;
export default workingCopySlice;
