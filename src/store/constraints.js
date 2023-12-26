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
    hardConstraints: [],
    softConstraints: [],
  },
  reducers: {
    addNewConstraint(state, action) {
      state.hardConstraints.push({ ...action.payload });
    },
    removeConstraint(state, action) {
      const index = action.payload;
      state.constraints.splice(index, 1);
    },
    addTeam(state, action) {
      state.teams.push({
        value: state.teams.length + 1,
        label: action.payload,
      });
    },
    addLocation(state, action) {
      state.locations.push({
        value: state.locations.length + 1,
        label: action.payload,
      });
    },
    addPeriod(state, action) {
      state.periods.push({
        value: state.periods.length + 1,
        label: action.payload,
      });
    },
    addWeek(state, action) {
      state.weeks.push({
        value: state.weeks.length + 1,
        label: action.payload,
      });
    },
    addWeeks(state, action) {
      state.weeks = [];
      for (let i = 1; i <= action.payload; i++)
        state.weeks.push({ value: i, label: `Week ${i}` });
    },
    addConstraint(state, action) {
      const { constraint, index, type } = action.payload;
      const mapIdToList = {
        soft: state.softConstraints,
        hard: state.hardConstraints,
      };
      mapIdToList[type].splice(index, 0, constraint);
    },
    updateOption(state, action) {
      const { id, updatedOption, type } = action.payload;
      state[type][id].label = updatedOption;
    },
    removeConstraint(state, action) {
      const { index, type } = action.payload;
      const mapIdToList = {
        soft: state.softConstraints,
        hard: state.hardConstraints,
      };
      mapIdToList[type].splice(index, 1);
    },
    removeOption(state, action) {
      const { id, type } = action.payload;
      state[type].splice(id, 1);
    },
  },
});

export const constraintsActions = constraintsSlice.actions;

export default constraintsSlice;
