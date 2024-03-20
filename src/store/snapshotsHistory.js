import { createSlice } from "@reduxjs/toolkit";

/**
 * References
 *
 * Redux Toolkit, n.d. https://redux-toolkit.js.org/.
 */
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
    setSnapshots(state, action) {
      state.snapshots = action.payload;
    },
  },
});

export const snapshotsHistoryActions = snapshotsHistorySlice.actions;
export default snapshotsHistorySlice;
