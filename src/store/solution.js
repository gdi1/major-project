import { createSlice } from "@reduxjs/toolkit";
import { mock_solution } from "../Utilities/MockSolution";

const solutionSlice = createSlice({
  name: "solutionSlice",
  initialState: {
    selectedTeam: undefined,
    selectedTeamJourney: [],
    selectedTeamGames: [],
    focusedGame: undefined,
    violatedSoftConstraints: [],
    schedule: [],
    curvedPaths: [],
    teamsMap: {
      1: { value: 1, label: "team 1" },
      2: { value: 2, label: "team 2" },
      3: { value: 3, label: "team 3" },
      4: { value: 4, label: "team 4" },
    },
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
    weeksMap: {
      1: { value: 1, label: "Week 1" },
      2: { value: 2, label: "Week 2" },
    },
    solution: [
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
      state.focusedGame = undefined;
      state.selectedTeam = action.payload;
      state.selectedTeamGames = state.solution
        .map(({ week, weekSchedule }) =>
          weekSchedule.map(({ period, games }) =>
            games
              .filter((game) =>
                game.teamA === action.payload || game.teamB === action.payload
                  ? { game, period, week }
                  : undefined
              )
              .map(({ teamA, teamB, location }) => ({
                game: {
                  teamA: state.teamsMap[teamA].label,
                  teamB: state.teamsMap[teamB].label,
                  location: state.locationsMap[location],
                },
                week: state.weeksMap[week].label,
                period: state.periodsMap[period].label,
              }))
          )
        )
        .flat(Infinity);
      state.selectedTeamJourney = state.selectedTeamGames.map(
        ({ game }) => game.location
      );
    },
    deselectTeam(state, _) {
      state.selectedTeam = undefined;
      state.selectedTeamJourney = [];
      state.selectedTeamGames = [];
      state.focusedGame = undefined;
    },
    setFocusedGame(state, action) {
      state.focusedGame = action.payload;
    },
    resetFocusedGame(state, _) {
      state.focusedGame = undefined;
    },

    createValueToOptionMappings(state, action) {
      const { teams, weeks, periods, locations } = action.payload;
      teams.forEach((option) => (state.teamsMap[option.value] = option));
      weeks.forEach((option) => (state.weeksMap[option.value] = option));
      periods.forEach((option) => (state.periodsMap[option.value] = option));
      locations.forEach(
        (option) => (state.locationsMap[option.value] = option)
      );
    },
    setSolution(state, action) {
      state.solution = mock_solution; // action.payload;
      state.schedule = state.solution.map(({ week, weekSchedule }) => ({
        week: state.weeksMap[week],
        weekSchedule: weekSchedule.map(({ period, games }) => ({
          period: state.periodsMap[period],
          games: games.map(({ teamA, teamB, location }) => ({
            teamA: state.teamsMap[teamA],
            teamB: state.teamsMap[teamB],
            location: state.locationsMap[location].label,
          })),
        })),
      }));
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
