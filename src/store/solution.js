import { createSlice } from "@reduxjs/toolkit";
import {
  mock_solution,
  mock_teamsMap,
  mock_locationsMap,
  mock_periodsMap,
  mock_weeksMap,
} from "../Utilities/MockSolution";

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
    speed: 5000,
    teamsMap: {},
    locationsMap: {},
    periodsMap: {},
    weeksMap: {},
    solution: [],
    isOutdated: false,
    internalData: undefined,
    isSolution: false,
  },
  reducers: {
    setInternalData(state, action) {
      state.internalData = action.payload;

      const { teams, locations, periods, weeks } = action.payload;
      console.log(teams, locations, periods, weeks);
      teams.forEach((team) => (state.teamsMap[team.value] = team));
      locations.forEach(
        (location) => (state.locationsMap[location.value] = location)
      );
      periods.forEach((period) => (state.periodsMap[period.value] = period));
      weeks.forEach((week) => (state.weeksMap[week.value] = week));

      state.solution = mock_solution; // action.payload;
      state.schedule = state.solution.map(({ week, weekSchedule }) => ({
        week: state.weeksMap[week],
        weekSchedule: weekSchedule.map(({ period, games }) => ({
          period: state.periodsMap[period],
          games: games.map(({ teamA, teamB, location }) => ({
            teamA: state.teamsMap[teamA],
            teamB: state.teamsMap[teamB],
            location: state.locationsMap[location],
          })),
        })),
      }));
      state.isSolution = true;
    },
    setSpeed(state, action) {
      state.speed = action.payload;
    },
    reduceSpeed(state, _) {
      if (state.speed < 10000) state.speed += 1000;
    },
    increaseSpeed(state, _) {
      if (state.speed > 1000) state.speed -= 1000;
    },
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
                  teamA: state.teamsMap[teamA],
                  teamB: state.teamsMap[teamB],
                  location: state.locationsMap[location],
                },
                week: state.weeksMap[week],
                period: state.periodsMap[period],
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

    setSolution(state, _) {
      // state.teamsMap = mock_teamsMap;
      // state.locationsMap = mock_locationsMap;
      // state.periodsMap = mock_periodsMap;
      // state.weeksMap = mock_weeksMap;
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
    setState(state, action) {
      const {
        selectedTeam,
        selectedTeamJourney,
        selectedTeamGames,
        focusedGame,
        violatedSoftConstraints,
        schedule,
        curvedPaths,
        speed,
        teamsMap,
        locationsMap,
        periodsMap,
        weeksMap,
        solution,
        isOutdated,
        internalData,
        isSolution,
      } = action.payload;
      state.selectedTeam = selectedTeam;
      state.selectedTeamJourney = selectedTeamJourney;
      state.selectedTeamGames = selectedTeamGames;
      state.focusedGame = focusedGame;
      state.violatedSoftConstraints = violatedSoftConstraints;
      state.schedule = schedule;
      state.curvedPaths = curvedPaths;
      state.speed = speed;
      state.teamsMap = teamsMap;
      state.locationsMap = locationsMap;
      state.periodsMap = periodsMap;
      state.weeksMap = weeksMap;
      state.solution = solution;
      state.isOutdated = isOutdated;
      state.internalData = internalData;
      state.isSolution = isSolution;
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
