import { createSlice } from "@reduxjs/toolkit";
import { findInsertIndex } from "../Utilities/BinarySearch";

const currentConstraintSlice = createSlice({
  name: "currentConstraintSlice",
  initialState: {
    constraintLists: [[0]],
    focusedConstraint: 0,
    name: undefined,
  },
  reducers: {
    resetCurrentConstraint(state, action) {
      state.constraintLists = [[0]];
      state.focusedConstraint = 0;
      state.name = undefined;
    },
    addNewConstraintBlock(state, action) {
      const type = action.payload;
      const selectedConstraintIndex = state.focusedConstraint;
      const multiselect_types = ["locations", "weeks", "periods", "teams"];

      if (
        state.constraintLists[selectedConstraintIndex][1] &&
        (state.constraintLists[selectedConstraintIndex][1].type === "and" ||
          state.constraintLists[selectedConstraintIndex][1].type === "or")
      )
        return;
      if (type == "and" || type == "or") {
        const indentationLevel =
          state.constraintLists[selectedConstraintIndex][0];
        state.constraintLists.splice(selectedConstraintIndex + 1, 0, [
          indentationLevel,
          { type },
        ]);
        state.constraintLists.splice(selectedConstraintIndex + 2, 0, [
          indentationLevel,
        ]);
        state.focusedConstraint += 2;
      } else if (multiselect_types.includes(type)) {
        state.constraintLists[selectedConstraintIndex].splice(
          findInsertIndex(state.constraintLists[selectedConstraintIndex], type),
          0,
          {
            type,
            options: [],
          }
        );
      } else if (type === "at-least" || type == "at-most") {
        state.constraintLists[selectedConstraintIndex].splice(
          findInsertIndex(state.constraintLists[selectedConstraintIndex], type),
          0,
          {
            type,
            times: undefined,
          }
        );
      } else if (type !== "play-against" && type !== "not-play-against") {
        state.constraintLists[selectedConstraintIndex].splice(
          findInsertIndex(state.constraintLists[selectedConstraintIndex], type),
          0,
          {
            type,
          }
        );
      } else {
        state.constraintLists[selectedConstraintIndex].push({
          type,
        });
        state.constraintLists[selectedConstraintIndex].push({
          type: "teams",
          options: [],
        });
      }
    },
    updateOptions(state, action) {
      const { x, y, selectedOptions } = action.payload;
      const type = state.constraintLists[x][y].type;
      const multiselect_types = ["locations", "weeks", "periods", "teams"];
      if (multiselect_types.includes(type)) {
        state.constraintLists[x][y].options = selectedOptions;
      } else {
        state.constraintLists[x][y].times = selectedOptions;
      }
    },
    setFocused(state, action) {
      state.focusedConstraint = action.payload;
    },
    reduceIndentation(state, action) {
      const listIndex = action.payload;
      if (state.constraintLists[listIndex][0] > 0)
        state.constraintLists[listIndex][0]--;
    },
    increaseIndentation(state, action) {
      const listIndex = action.payload;
      state.constraintLists[listIndex][0]++;
    },
    removeConstraintBlock(state, action) {
      const { x, y } = action.payload;
      state.constraintLists[x].splice(y, 1);
    },
    setNewConstraintName(state, action) {
      state.name = action.payload;
    },
  },
});

export const currentConstraintActions = currentConstraintSlice.actions;

export default currentConstraintSlice;
