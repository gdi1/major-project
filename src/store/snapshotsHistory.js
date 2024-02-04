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
      state.snapshots = state.snapshots.filter(
        ({ name }) => name !== action.payload
      );
    },
    removeAllSnapshots(state, _) {
      state.snapshots = [];
    },
    setSnapshots(state, action) {
      state.snapshots = action.payload;
    },
  },
});

export const snapshotsHistoryActions = snapshotsHistorySlice.actions;
export default snapshotsHistorySlice;
