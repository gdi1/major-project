import { createSlice } from "@reduxjs/toolkit";

const snapshotsHistorySlice = createSlice({
  name: "snapshotsHistory",
  initialState: {
    snapshots: ["a"],
  },
  reducers: {
    addSnapshot(state, action) {
      state.snapshots.unshift(action.payload);
    },
    removeSnapshot(state, action) {
      state.snapshots.splice(action.payload, 1);
    },
  },
});

export const snapshotsHistoryActions = snapshotsHistorySlice.actions;
export default snapshotsHistorySlice;
