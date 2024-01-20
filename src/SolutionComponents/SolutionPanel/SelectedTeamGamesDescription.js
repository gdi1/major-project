import { useSelector, useDispatch } from "react-redux";
import {
  RowContainer,
  ColumnContainer,
} from "../../GeneralComponents/Containers";
import styled from "styled-components";
import { TextWithEllipsis } from "../../GeneralComponents/TextWithEllipsis";
import borders from "../../style-utils/borders";
import colors from "../../style-utils/colors";
import { solutionActions } from "../../store/solution";
import { Label } from "../../GeneralComponents/Labels";

const SelectedTeamGamesDescription = () => {
  const { selectedTeamGames, focusedGame } = useSelector(
    (state) => state.solution
  );
  const dispatch = useDispatch();

  const toggleFocusedGameOnMap = (idx) => {
    focusedGame === idx
      ? dispatch(solutionActions.resetFocusedGame(idx))
      : dispatch(solutionActions.setFocusedGame(idx));
  };
  return (
    <GamesDescription>
      {selectedTeamGames.map(({ game, period, week }, idx) => (
        <GameCard
          onClick={() => toggleFocusedGameOnMap(idx)}
          focused={idx === focusedGame}
        >
          <GameDetailsSection style={{ justifyContent: "space-between" }}>
            <div>Week: {week}</div>
            <div style={{ fontWeight: "bold" }}>Game {idx + 1}</div>
            <div> Period: {period}</div>
          </GameDetailsSection>
          <GameDetailsSection>
            <LeftTeam>{game.teamA}</LeftTeam>
            <div>vs</div>
            <RightTeam>{game.teamB}</RightTeam>
          </GameDetailsSection>
          <GameDetailsSection>
            <Location>Location: {game.location}</Location>
          </GameDetailsSection>
        </GameCard>
      ))}
    </GamesDescription>
  );
};
export default SelectedTeamGamesDescription;

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
  justify-content: space-between;
  background-color: ${(props) => (props.focused ? `${colors.creme}` : "")};
  &: hover {
    background-color: ${colors.creme};
  }
`;
const GameDetailsSection = styled(RowContainer)`
  gap: 10px;
`;
