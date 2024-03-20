import { useSelector, useDispatch } from "react-redux";
import {
  RowContainer,
  ColumnContainer,
} from "../../GeneralComponents/Containers";
import styled, { css } from "styled-components";
import { TextWithEllipsis } from "../../GeneralComponents/TextWithoutOverflow";
import borders from "../../style-utils/borders";
import colors from "../../style-utils/colors";
import { solutionActions } from "../../store/solution";
import gaps from "../../style-utils/gaps";
import text_styles from "../../style-utils/text_styles";
import paddings from "../../style-utils/paddings";
import { pulseAnimation } from "../../GeneralComponents/animations";

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
            <Details>{week.label}</Details>
            <Details style={{ fontWeight: "bold" }}>Game {idx + 1}</Details>
            <Details>{period.label}</Details>
          </GameDetailsSection>
          <GameDetailsSection>
            <LeftTeam>{game.teamA.label}</LeftTeam>
            <Details>vs</Details>
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

const Details = styled.div`
  font-size: ${text_styles.fonts.xsmall};
  font-family: ${text_styles.styles.fontFamily};
`;

const GamesDescription = styled(ColumnContainer)`
  justify-content: start;
  height: 85vh;
  gap: ${gaps.xxsmall};
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

const pulseAnimationCSS = css`
  animation: ${pulseAnimation} 1s;
`;

const noAnimationCSS = css`
  animation: none;
`;

const GameCard = styled(ColumnContainer)`
  border: ${borders.small};
  cursor: pointer;
  gap: ${gaps.xxsmall};
  height: auto;
  padding: ${paddings.xxsmall};
  box-sizing: border-box;

  justify-content: space-between;
  background-color: ${(props) =>
    props.focused ? `${colors.brick}` : `${colors.beige}`};
  ${(props) => (props.pulsating ? pulseAnimationCSS : noAnimationCSS)}
  &: hover {
    background-color: ${(props) =>
      !props.focused ? `${colors.mustard}` : `${colors.brick}`};
  }
`;
const GameDetailsSection = styled(RowContainer)`
  gap: ${gaps.xsmall};
`;
