import { createSlice } from "@reduxjs/toolkit";

const constraint_types = ["hard", "soft"];
const options_types = ["teams", "locations", "periods", "weeks"];

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    show: ["home"],
    optionsTypes: [],
  },
  reducers: {
    resetView(state, _) {
      state.show = ["home"];
      state.optionsTypes = [];
    },
    toggleNewType(state, action) {
      const type = action.payload;
      const mapOptions = {
        options: options_types,
        constraints: constraint_types,
        snapshots: ["snapshots"],
      };

      state.show = state.show.filter((el) => el !== "home");

      if (["all-constraints", "all-snapshots", "all-options"].includes(type)) {
        const correspondingType = type.substring(4);
        const correspondingOptions = mapOptions[correspondingType];
        if (
          !state.show.includes(correspondingType) ||
          !correspondingOptions.every((op) => state.optionsTypes.includes(op))
        ) {
          state.show = [...new Set([...state.show, correspondingType])];
          state.optionsTypes = [
            ...new Set([...state.optionsTypes, ...correspondingOptions]),
          ];
        } else {
          const result = state.show.filter((el) => el !== correspondingType);
          state.show = result.length !== 0 ? result : ["home"];
          state.optionsTypes = state.optionsTypes.filter(
            (el) => !correspondingOptions.includes(el)
          );
        }
        return;
      }

      if (constraint_types.includes(type)) {
        if (state.show.includes("constraints")) {
          if (state.optionsTypes.includes(type)) {
            state.optionsTypes = state.optionsTypes.filter((el) => el !== type);
            if (
              !state.optionsTypes.some((op) => constraint_types.includes(op))
            ) {
              const res = state.show.filter((el) => el !== "constraints");
              state.show = res.length !== 0 ? res : ["home"];
            }
          } else state.optionsTypes = [...state.optionsTypes, type];
        } else {
          state.show = [...new Set([...state.show, "constraints"])];
          state.optionsTypes = [...new Set([...state.optionsTypes, type])];
        }
      }
      if (options_types.includes(type)) {
        if (state.show.includes("options")) {
          if (state.optionsTypes.includes(type)) {
            state.optionsTypes = state.optionsTypes.filter((el) => el !== type);
            if (!state.optionsTypes.some((op) => options_types.includes(op))) {
              const res = state.show.filter((el) => el !== "options");
              state.show = res.length !== 0 ? res : ["home"];
            }
          } else state.optionsTypes = [...state.optionsTypes, type];
        } else {
          state.show = [...new Set([...state.show, "options"])];
          state.optionsTypes = [...new Set([...state.optionsTypes, type])];
        }
      }
    },
  },
});

export const sidebarActions = sidebarSlice.actions;
export default sidebarSlice;
