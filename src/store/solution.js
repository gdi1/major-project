import { createSlice } from "@reduxjs/toolkit";

const solutionSlice = createSlice({
  name: "solutionSlice",
  initialState: {
    selectedTeam: undefined,
    selectedTeamJourney: undefined,
    selectedTeamGames: undefined,
    violatedSoftConstraints: [],
    teamsMap: {},
    locationsMap: {},
    periodsMap: {},
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
        ({ game }) => game.location
      );
    },
    deselectTeam(state, _) {
      state.selectedTeam = undefined;
      state.selectedTeamJourney = undefined;
      state.selectedTeamGames = undefined;
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
