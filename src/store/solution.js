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
    speed: 3000,
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
    setOutdatedStatus(state, action) {
      state.isOutdated = action.payload;
    },
    setInternalData(state, action) {
      const {
        internalData,
        teamsMap,
        periodsMap,
        locationsMap,
        weeksMap,
        solution = mock_solution,
      } = action.payload;

      state.internalData = internalData;
      state.teamsMap = teamsMap;
      state.locationsMap = locationsMap;
      state.periodsMap = periodsMap;
      state.weeksMap = weeksMap;

      state.solution = solution;
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
      if (state.speed < 5000) state.speed += 1000;
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
              .filter(
                (game) =>
                  state.teamsMap[game.teamA].value === action.payload ||
                  state.teamsMap[game.teamB].value === action.payload
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

    resetSolution(state, _) {
      state.selectedTeam = undefined;
      state.selectedTeamJourney = [];
      state.selectedTeamGames = [];
      state.focusedGame = undefined;
      state.violatedSoftConstraints = [];
      state.schedule = [];
      state.curvedPaths = [];
      state.speed = 5000;
      state.teamsMap = {};
      state.locationsMap = {};
      state.periodsMap = {};
      state.weeksMap = {};
      state.solution = [];
      state.isOutdated = false;
      state.internalData = undefined;
      state.isSolution = false;
    },
  },
});

export const solutionActions = solutionSlice.actions;

export default solutionSlice;
