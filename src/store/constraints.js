import { createSlice } from "@reduxjs/toolkit";

const constraintsSlice = createSlice({
  name: "constraintsSlice",
  initialState: {
    teams: [
      { value: 1, label: "Option 1" },
      { value: 2, label: "Option 2" },
      { value: 3, label: "Option 3" },
      { value: 4, label: "Option 4" },
      { value: 5, label: "Option 5" },
      { value: 6, label: "Option 6" },
    ],
    weeks: [
      { value: 1, label: "Week 1" },
      { value: 2, label: "Week 2" },
      { value: 3, label: "Week 3" },
    ],
    periods: [
      { value: 1, label: "Option 1" },
      { value: 2, label: "Option 2" },
      { value: 3, label: "Option 3" },
    ],
    locations: [
      { value: 1, label: "Option 1" },
      { value: 2, label: "Option 2" },
      { value: 3, label: "Option 3" },
    ],
    constraints: [],
  },
  reducers: {},
});

export const constraintsActions = constraintsSlice.actions;

export default constraintsSlice;
