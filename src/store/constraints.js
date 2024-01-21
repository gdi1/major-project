import { createSlice } from "@reduxjs/toolkit";
import { sortPeriods } from "../Utilities/PeriodsFunctions";

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
      {
        value: 1,
        label: "Cluj-Napoca, Cluj Metropolitan Area, Cluj, Romania",
        coordinates: [50, 20],
      },
      { value: 2, label: "Option 2", coordinates: [51, 20] },
      { value: 3, label: "Option 3", coordinates: [50, 21] },
    ],
    maps: { teams: {}, weeks: {}, periods: {}, locations: {} },
    hardConstraints: [],
    softConstraints: [],
  },
  reducers: {
    addNewConstraint(state, action) {
      const { name, type } = action.payload;
      const constraint = { ...action.payload };
      delete constraint.type;

      const isAlreadyConstraint =
        state.hardConstraints.some((c) => c.name === name) ||
        state.softConstraints.some((c) => c.name === name);
      if (!isAlreadyConstraint) {
        if (type === "hard") state.hardConstraints.push(constraint);
        else state.softConstraints.push(constraint);
      } else {
        let index = state.hardConstraints.findIndex((c) => c.name === name);
        if (index !== -1) state.hardConstraints[index] = constraint;
        else {
          index = state.softConstraints.findIndex((c) => c.name === name);
          state.softConstraints[index] = constraint;
        }
      }
    },
    changeName(state, action) {
      const { index, type, name } = action.payload;
      const mapTypeToList = {
        hard: state.hardConstraints,
        soft: state.softConstraints,
      };
      mapTypeToList[type][index].name = name;
    },
    addTeam(state, action) {
      state.teams.push({
        value: state.teams.length + 1,
        label: action.payload,
      });
    },
    addLocation(state, action) {
      const { coordinates, label } = action.payload;
      state.locations.push({
        value: state.locations.length + 1,
        coordinates,
        label,
      });
    },
    addPeriod(state, action) {
      state.periods.push({
        value: state.periods.length + 1,
        label: action.payload,
      });
      state.periods = sortPeriods(
        // state.periods.map((period) => period.label)
        state.periods.map((period) => ({ ...period }))
      );
      // console.log(sortedPeriods);
      // state.periods = [];
      // sortedPeriods.forEach((period) =>
      //   state.periods.push({ value: state.periods.length + 1, label: period })
      // );
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
      for (let i = id; i < state[type].length; i++) {
        state[type][i].value--;
      }
    },
    createValueToOptionMappings(state, _) {
      state.teams.forEach(
        (option) => (state.maps.teams[option.value] = option)
      );
      state.weeks.forEach(
        (option) => (state.maps.weeks[option.value] = option)
      );
      state.periods.forEach(
        (option) => (state.maps.periods[option.value] = option)
      );
      state.locations.forEach(
        (option) => (state.maps.locations[option.value] = option)
      );
    },
  },
});

export const constraintsActions = constraintsSlice.actions;

export default constraintsSlice;
