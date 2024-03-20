import { createSlice } from "@reduxjs/toolkit";
import { sortPeriods } from "../Utilities/PeriodsFunctions";
import { NotificationManager } from "react-notifications";
import { formatNtf } from "../Utilities/NotificationWrapper";

/**
 * References
 *
 * Redux Toolkit, n.d. https://redux-toolkit.js.org/.
 */
const configurationsSlice = createSlice({
  name: "configurationsSlice",
  initialState: {
    teams: [],
    weeks: [],
    periods: [],
    locations: [],
    hardConstraints: [],
    softConstraints: [],
    outdatedConstraints: [],
  },
  reducers: {
    addNewFlowConstraint(state, action) {
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
      const wereOutdatedConstraints = state.outdatedConstraints.length > 0;
      state.outdatedConstraints = state.outdatedConstraints.filter(
        (n) => n !== name
      );
      if (state.outdatedConstraints.length === 0 && wereOutdatedConstraints)
        NotificationManager.success(
          ...formatNtf(
            "All outdated constraints have been resolved!",
            "Success"
          )
        );
    },
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
      const oldName = mapTypeToList[type][index].name;
      if (state.outdatedConstraints.includes(oldName))
        state.outdatedConstraints = state.outdatedConstraints.map((n) =>
          n === oldName ? name : n
        );
      mapTypeToList[type][index].name = name;
    },
    addTeam(state, action) {
      state.teams.push({
        value: action.payload,
        label: action.payload,
      });
    },
    addLocation(state, action) {
      const { coordinates, label } = action.payload;
      state.locations.push({
        value: label,
        coordinates,
        label,
      });
    },
    addPeriod(state, action) {
      state.periods.push({
        value: action.payload,
        label: action.payload,
      });
      state.periods = sortPeriods(
        state.periods.map((period) => ({ ...period }))
      );
    },

    addWeeks(state, action) {
      const oldNoOfweeks = state.weeks.length;
      state.weeks = [];
      for (let i = 1; i <= action.payload; i++)
        state.weeks.push({ value: i, label: `Week ${i}` });

      const constraint_lists_types = ["hardConstraints", "softConstraints"];
      for (let i = action.payload + 1; i <= oldNoOfweeks; i++) {
        const value = i;
        const type = "weeks";
        constraint_lists_types.forEach((constraints_list_type) => {
          state[constraints_list_type].forEach((constraint) => {
            constraint.nodes.forEach((node) => {
              if (node.data.types[type]) {
                node.data.types[type] = node.data.types[type].filter(
                  (el) => el.value !== value
                );
                if (
                  node.data.types[type].length === 0 &&
                  !state.outdatedConstraints.includes(constraint.name)
                )
                  state.outdatedConstraints.push(constraint.name);
              }
            });
          });
        });
      }
    },
    addConstraint(state, action) {
      const { constraint, index, type } = action.payload;
      const mapIdToList = {
        soft: state.softConstraints,
        hard: state.hardConstraints,
      };
      mapIdToList[type].splice(index, 0, constraint);
    },

    removeConstraint(state, action) {
      const { index, type } = action.payload;
      const mapIdToList = {
        soft: state.softConstraints,
        hard: state.hardConstraints,
      };
      mapIdToList[type].splice(index, 1);
    },
    removeConstraintByName(state, action) {
      state.hardConstraints = state.hardConstraints.filter(
        (c) => c.name !== action.payload
      );
      state.softConstraints = state.softConstraints.filter(
        (c) => c.name !== action.payload
      );
      const wereOutdatedConstraints = state.outdatedConstraints.length > 0;
      state.outdatedConstraints = state.outdatedConstraints.filter(
        (n) => n !== action.payload
      );
      if (state.outdatedConstraints.length === 0 && wereOutdatedConstraints)
        NotificationManager.success(
          ...formatNtf(
            "All outdated constraints have been resolved!",
            "Success"
          )
        );
    },

    updateOption(state, action) {
      const { id, updatedOption, type } = action.payload;
      const value = state[type][id].value;

      state[type][id].label = updatedOption;
      state[type][id].value = updatedOption;

      const constraint_lists_types = ["hardConstraints", "softConstraints"];

      constraint_lists_types.forEach((constraints_list_type) => {
        state[constraints_list_type].forEach((constraint) => {
          constraint.nodes.forEach((node) => {
            if (node.data.types[type]) {
              node.data.types[type] = node.data.types[type].map((el) =>
                el.value === value
                  ? { value: updatedOption, label: updatedOption }
                  : el
              );
              if (type === "teams") {
                const additional_types = ["play-against", "not-play-against"];
                for (const add_type of additional_types) {
                  if (node.data.types[add_type]) {
                    node.data.types[add_type] = node.data.types[add_type].map(
                      (el) =>
                        el.value === value
                          ? {
                              value: updatedOption,
                              label: updatedOption,
                            }
                          : el
                    );
                  }
                }
              }
            }
          });
        });
      });
    },
    removeOption(state, action) {
      const { id, type } = action.payload;
      const value = state[type][id].value;
      state[type].splice(id, 1);

      const constraint_lists_types = ["hardConstraints", "softConstraints"];

      constraint_lists_types.forEach((constraints_list_type) => {
        state[constraints_list_type].forEach((constraint) => {
          constraint.nodes.forEach((node) => {
            if (node.data.types[type]) {
              node.data.types[type] = node.data.types[type].filter(
                (el) => el.value !== value
              );
              if (node.data.types[type].length === 0) {
                if (state.outdatedConstraints.length === 0)
                  NotificationManager.error(
                    ...formatNtf("Outdated constraints!", "Error")
                  );
                state.outdatedConstraints.push(constraint.name);
              }

              if (type === "teams") {
                const additional_types = ["play-against", "not-play-against"];
                for (const add_type of additional_types) {
                  if (node.data.types[add_type]) {
                    node.data.types[add_type] = node.data.types[
                      add_type
                    ].filter((el) => el.value !== value);
                    if (
                      node.data.types[add_type].length === 0 &&
                      !state.outdatedConstraints.includes(constraint.name)
                    ) {
                      if (state.outdatedConstraints.length === 0)
                        NotificationManager.error(
                          ...formatNtf("Outdated constraints!", "Error")
                        );
                      state.outdatedConstraints.push(constraint.name);
                    }
                  }
                }
              }
            }
          });
        });
      });
    },
    setState(state, action) {
      const {
        teams,
        weeks,
        locations,
        periods,
        hardConstraints,
        softConstraints,
      } = action.payload;
      state.teams = teams;
      state.locations = locations;
      state.weeks = weeks;
      state.periods = periods;
      state.hardConstraints = hardConstraints;
      state.softConstraints = softConstraints;
    },
  },
});

export const configurationsActions = configurationsSlice.actions;

export default configurationsSlice;
