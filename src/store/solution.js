import { createSlice } from "@reduxjs/toolkit";

const solutionSlice = createSlice({
  name: "solutionSlice",
  initialState: {
    selectedTeam: undefined,
    schedule: [
      {
        week: 1,
        weekSchedule: [
          {
            period: 1,
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
  reducers: {},
});

export const solutionActions = solutionSlice.actions;

export default solutionSlice;
