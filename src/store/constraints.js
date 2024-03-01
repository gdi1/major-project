import { createSlice } from "@reduxjs/toolkit";
import { sortPeriods } from "../Utilities/PeriodsFunctions";

const types = ["teams", "locations", "periods", "weeks"];

const getNextId = (arr) => {
  return Math.max(...arr.map(({ value }) => value), 0) + 1;
};

const constraintsSlice = createSlice({
  name: "constraintsSlice",
  initialState: {
    teams: [
      {
        value: "team1",
        label: "team1",
      },
      {
        value: "team4",
        label: "team4",
      },
      {
        value: "team2",
        label: "team2",
      },
      {
        value: "team3",
        label: "team3",
      },
    ],
    weeks: [
      {
        value: 1,
        label: "Week 1",
      },
      {
        value: 2,
        label: "Week 2",
      },
    ],
    periods: [
      {
        value: "Mon 12:00",
        label: "Mon 12:00",
      },
      {
        value: "Mon 12:30",
        label: "Mon 12:30",
      },
      {
        value: "Mon 15:30",
        label: "Mon 15:30",
      },
      {
        value: "Mon 20:00",
        label: "Mon 20:00",
      },
    ],
    locations: [
      {
        value: "Cluj Napoca",
        coordinates: [46.769379, 23.5899542],
        label: "Cluj Napoca",
      },
      {
        value: "Turda",
        coordinates: [46.5685214, 23.7853643],
        label: "Turda",
      },
      {
        value: "Mures",
        coordinates: [46.60646055, 24.62467862914629],
        label: "Mures",
      },
    ],
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
      state.outdatedConstraints = state.outdatedConstraints.filter(
        (n) => n !== name
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
        // value: getNextId(state.teams),
        value: action.payload,
        label: action.payload,
      });

      // state.teams.sort(sortByLabels);
      // for (let i = 0; i < state.teams.length; i++) state.teams[i].value = i;
    },
    addLocation(state, action) {
      const { coordinates, label } = action.payload;
      state.locations.push({
        // value: getNextId(state.locations),
        value: label,
        coordinates,
        label,
      });
    },
    addPeriod(state, action) {
      state.periods.push({
        // value: getNextId(state.periods),
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
      for (let i = action.payload; i < oldNoOfweeks; i++) {
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
      const { index, type, isDrag = false } = action.payload;
      const mapIdToList = {
        soft: state.softConstraints,
        hard: state.hardConstraints,
      };
      const name = mapIdToList[type][index].name;
      mapIdToList[type].splice(index, 1);
      state.outdatedConstraints = state.outdatedConstraints.filter(
        (el) => el !== index
      );
      if (!isDrag)
        state.outdatedConstraints = state.outdatedConstraints.filter(
          (n) => n !== name
        );
    },
    removeConstraintByName(state, action) {
      state.hardConstraints = state.hardConstraints.filter(
        (c) => c.name !== action.payload
      );
      state.softConstraints = state.softConstraints.filter(
        (c) => c.name !== action.payload
      );
      state.outdatedConstraints = state.outdatedConstraints.filter(
        (n) => n !== action.payload
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
                  ? { /*...el,*/ value: updatedOption, label: updatedOption }
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
                              /*...el,*/ value: updatedOption,
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
              if (node.data.types[type].length === 0)
                state.outdatedConstraints.push(constraint.name);

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
                    )
                      state.outdatedConstraints.push(constraint.name);
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

export const constraintsActions = constraintsSlice.actions;

export default constraintsSlice;

// state.hardConstraints = state.hardConstraints.filter(
//   (constraint) =>
//     !constraint.nodes.some((node) =>
//       types.reduce(
//         (acc, cur) =>
//           acc ||
//           (node.data.types[cur] !== undefined &&
//             node.data.types[cur].length === 0),
//         false
//       )
//     )
// );

// state.softConstraints = state.softConstraints.filter(
//   (constraint) =>
//     !constraint.nodes.some((node) =>
//       types.reduce(
//         (acc, cur) =>
//           acc ||
//           (node.data.types[cur] !== undefined &&
//             node.data.types[cur].length === 0),
//         false
//       )
//     )
// );

// state.softConstraints.forEach((constraint) => {
//   constraint.nodes.forEach((node) => {
//     if (node.data.types[type]) {
//       node.data.types[type] = node.data.types[type].filter(
//         (el) => el.value !== value
//       );
//       if (node.data.types[type].length === 0)
//         state.outdatedConstraints.push(constraint.name);

//       if (type === "teams") {
//         const additional_types = ["play-against", "not-play-against"];
//         for (const add_type of additional_types) {
//           if (node.data.types[add_type]) {
//             node.data.types[add_type] = node.data.types[add_type].filter(
//               (el) => el.value !== value
//             );
//             if (
//               node.data.types[add_type].length === 0 &&
//               !state.outdatedConstraints.includes(constraint.name)
//             )
//               state.outdatedConstraints.push(constraint.name);
//           }
//         }
//       }
//     }
//   });
// });
