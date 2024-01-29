import { createSlice } from "@reduxjs/toolkit";

const snapshotsHistorySlice = createSlice({
  name: "snapshotsHistory",
  initialState: {
    snapshots: [],
  },
  reducers: {
    addSnapshot(state, action) {
      state.snapshots.unshift(action.payload);
    },
    removeSnapshot(state, action) {
      state.snapshots.splice(action.payload, 1);
    },
    removeAllSnapshots(state, _) {
      state.snapshots = [];
    },
  },
});

export const snapshotsHistoryActions = snapshotsHistorySlice.actions;
export default snapshotsHistorySlice;
