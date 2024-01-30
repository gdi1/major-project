import { useSelector, useDispatch } from "react-redux";
import {
  RowContainer,
  ColumnContainer,
} from "../../GeneralComponents/Containers";
import styled, { css, keyframes } from "styled-components";
import { TextWithEllipsis } from "../../GeneralComponents/TextWithEllipsis";
import borders from "../../style-utils/borders";
import colors from "../../style-utils/colors";
import { solutionActions } from "../../store/solution";

const SelectedTeamGamesDescription = ({ pulsatingGames }) => {
  const { selectedTeamGames, focusedGame, selectedTeam } = useSelector(
    (state) => state.solution
  );
  const dispatch = useDispatch();

  const toggleFocusedGameOnMap = (idx) => {
    focusedGame === idx
      ? dispatch(solutionActions.resetFocusedGame())
      : dispatch(solutionActions.setFocusedGame(idx));
  };
  return (
    <GamesDescription>
      {selectedTeamGames.map(({ game, period, week }, idx) => (
        <GameCard
          onClick={() => toggleFocusedGameOnMap(idx)}
          focused={idx === focusedGame}
          pulsating={
            focusedGame === undefined &&
            pulsatingGames[0] <= idx &&
            pulsatingGames[1] >= idx
          }
          key={`${selectedTeam}-${idx}`}
        >
          <GameDetailsSection style={{ justifyContent: "space-between" }}>
            <div>Week: {week.label}</div>
            <div style={{ fontWeight: "bold" }}>Game {idx + 1}</div>
            <div> Period: {period.label}</div>
          </GameDetailsSection>
          <GameDetailsSection>
            <LeftTeam>{game.teamA.label}</LeftTeam>
            <div>vs</div>
            <RightTeam>{game.teamB.label}</RightTeam>
          </GameDetailsSection>
          <GameDetailsSection>
            <Location>Location: {game.location.label}</Location>
          </GameDetailsSection>
        </GameCard>
      ))}
    </GamesDescription>
  );
};
export default SelectedTeamGamesDescription;

const pulseAnimation = keyframes`
  0%, 100% {
    background-color: white;
  }
  50% {
    background-color: #9e42b0;
  }
`;

const GamesDescription = styled(ColumnContainer)`
  justify-content: start;
  height: 85vh;
  gap: 5px;
  overflow: scroll;
`;

const Location = styled(TextWithEllipsis)`
  width: 60%;
  text-align: center;
`;

const LeftTeam = styled(TextWithEllipsis)`
  width: 40%;
  text-align: right;
`;

const RightTeam = styled(TextWithEllipsis)`
  width: 40%;
  text-align: left;
`;

const GameCard = styled(ColumnContainer)`
  border: ${borders.small};
  cursor: pointer;
  height: 80px;
  min-height: 80px;
  justify-content: space-between;
  background-color: ${(props) => (props.focused ? `${colors.creme}` : "")};
  ${(props) =>
    props.pulsating
      ? css`
          animation: ${pulseAnimation} 1s;
        `
      : "animation: none;"}
  &: hover {
    background-color: ${colors.creme};
  }
`;
const GameDetailsSection = styled(RowContainer)`
  gap: 10px;
`;
