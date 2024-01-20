import { createSlice } from "@reduxjs/toolkit";

const solutionSlice = createSlice({
  name: "solutionSlice",
  initialState: {
    selectedTeam: undefined,
    selectedTeamJourney: undefined,
    selectedTeamGames: undefined,
    focusedGame: undefined,
    violatedSoftConstraints: [],
    teamsMap: {},
    locationsMap: {
      1: {
        value: 1,
        label: "Cluj-Napoca, Cluj Metropolitan Area, Cluj, Romania",
        coordinates: [50, 20],
      },
      2: { value: 2, label: "Loc 2", coordinates: [51, 20] },
      3: { value: 3, label: "Loc 3", coordinates: [50, 21] },
    },
    periodsMap: {
      1: { value: 1, label: "P 1" },
      2: { value: 2, label: "P 2" },
      3: { value: 3, label: "P 3" },
      4: { value: 4, label: "P 4" },
    },
    weeksMap: {},
    schedule: [
      {
        week: 1,
        weekSchedule: [
          {
            period: 1,
            games: [
              { teamA: 1, teamB: 2, location: 2 },
              { teamA: 2, teamB: 3, location: 2 },
              { teamA: 1, teamB: 2, location: 1 },
              { teamA: 2, teamB: 3, location: 2 },
              { teamA: 1, teamB: 2, location: 1 },
              { teamA: 2, teamB: 3, location: 2 },
              { teamA: 1, teamB: 2, location: 1 },
              { teamA: 2, teamB: 3, location: 2 },
              { teamA: 4, teamB: 1, location: 2 },
            ],
          },
          {
            period: 2,
            games: [
              { teamA: 1, teamB: 2, location: 1 },
              { teamA: 2, teamB: 3, location: 2 },
              { teamA: 1, teamB: 2, location: 1 },
              { teamA: 2, teamB: 3, location: 2 },
              { teamA: 1, teamB: 2, location: 1 },
              { teamA: 2, teamB: 3, location: 2 },
              { teamA: 1, teamB: 2, location: 1 },
              { teamA: 2, teamB: 3, location: 2 },
              { teamA: 1, teamB: 2, location: 1 },
              { teamA: 2, teamB: 3, location: 2 },
              { teamA: 4, teamB: 1, location: 1 },
            ],
          },
        ],
      },
      {
        week: 2,
        weekSchedule: [
          {
            period: 3,
            games: [
              { teamA: 1, teamB: 2, location: 1 },
              { teamA: 2, teamB: 3, location: 2 },
              { teamA: 1, teamB: 2, location: 1 },
              { teamA: 2, teamB: 3, location: 2 },
              { teamA: 1, teamB: 2, location: 1 },
              { teamA: 2, teamB: 3, location: 2 },
              { teamA: 1, teamB: 2, location: 1 },
              { teamA: 2, teamB: 3, location: 2 },
              { teamA: 1, teamB: 2, location: 1 },
              { teamA: 2, teamB: 3, location: 2 },
              { teamA: 4, teamB: 1, location: 1 },
            ],
          },
          {
            period: 4,
            games: [
              { teamA: 1, teamB: 2, location: 1 },
              { teamA: 2, teamB: 3, location: 2 },
              { teamA: 1, teamB: 2, location: 1 },
              { teamA: 2, teamB: 3, location: 2 },
              { teamA: 1, teamB: 2, location: 1 },
              { teamA: 2, teamB: 3, location: 2 },
              { teamA: 1, teamB: 2, location: 1 },
              { teamA: 2, teamB: 3, location: 2 },
              { teamA: 1, teamB: 2, location: 1 },
              { teamA: 2, teamB: 3, location: 2 },
              { teamA: 4, teamB: 1, location: 3 },
            ],
          },
        ],
      },
    ],
  },
  reducers: {
    selectTeam(state, action) {
      state.selectedTeam = action.payload;
      state.selectedTeamGames = state.schedule
        .map(({ week, weekSchedule }) =>
          weekSchedule.map(({ period, games }) =>
            games.map((game) =>
              game.teamA === action.payload || game.teamB === action.payload
                ? { game, period, week }
                : undefined
            )
          )
        )
        .flat(Infinity)
        .filter((location) => location !== undefined);
      state.selectedTeamJourney = state.selectedTeamGames.map(
        ({ game }) => state.locationsMap[game.location]
      );
    },
    deselectTeam(state, _) {
      state.selectedTeam = undefined;
      state.selectedTeamJourney = undefined;
      state.selectedTeamGames = undefined;
      state.focusedGame = undefined;
    },
    setFocusedGame(state, action) {
      state.focusedGame = action.payload;
    },
    resetFocusedGame(state, _) {
      state.focusedGame = undefined;
    },
  },
});

export const solutionActions = solutionSlice.actions;

export default solutionSlice;

// {
//   teamA: 1,
//   teamB: 2,
//   location:
//     "dwav reaofbmadeamfeov,rsmvbkl,wpaf,eomvgors,bvos,,va,faevkrsmvgkrs kbrkefamkaedeamfkeafea",
// },
// {
//   teamA:
//     "dwav reaofbmadeamfeov,rsmvbkl,wpaf,eomvgors,bvos,,va,faevkrsmvgkrs kbrkefamkaedeamfkeafea",
//   teamB:
//     "dwav reaofbmadeamfeov,rsmvbkl,wpaf,eomvgors,bvos,,va,faevkrsmvgkrs kbrkefamkaedeamfkeafea",
//   location: 2,
// },

// state.selectedTeamJourney = state.schedule
//   .map(({ weekSchedule }) =>
//     weekSchedule.map(({ games }) =>
//       games.map(({ teamA, teamB, location }) =>
//         teamA === action.payload || teamB === action.payload
//           ? location
//           : undefined
//       )
//     )
//   )
//   .flat(Infinity)
//   .filter((location) => location);
