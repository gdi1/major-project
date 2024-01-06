import { createSlice } from "@reduxjs/toolkit";

const solutionSlice = createSlice({
  name: "solutionSlice",
  initialState: {
    selectedTeam: undefined,
    selectedTeamJourney: undefined,
    schedule: [
      {
        week: 1,
        weekSchedule: [
          {
            period: 1,
            games: [
              {
                teamA: 1,
                teamB: 2,
                location:
                  "dwav reaofbmadeamfeov,rsmvbkl,wpaf,eomvgors,bvos,,va,faevkrsmvgkrs kbrkefamkaedeamfkeafea",
              },
              {
                teamA:
                  "dwav reaofbmadeamfeov,rsmvbkl,wpaf,eomvgors,bvos,,va,faevkrsmvgkrs kbrkefamkaedeamfkeafea",
                teamB:
                  "dwav reaofbmadeamfeov,rsmvbkl,wpaf,eomvgors,bvos,,va,faevkrsmvgkrs kbrkefamkaedeamfkeafea",
                location: 2,
              },
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
      state.selectedTeamJourney = state.schedule
        .map(({ weekSchedule }) =>
          weekSchedule.map(({ games }) =>
            games.map(({ teamA, teamB, location }) =>
              teamA === action.payload || teamB === action.payload
                ? location
                : undefined
            )
          )
        )
        .flat(Infinity)
        .filter((location) => location);
    },
    deselectedTeam(state, _) {
      state.selectedTeam = undefined;
      state.selectedTeamJourney = undefined;
    },
  },
});

export const solutionActions = solutionSlice.actions;

export default solutionSlice;
