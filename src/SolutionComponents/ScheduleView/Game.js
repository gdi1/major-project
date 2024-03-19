import {
  ColumnContainer,
  RowContainer,
} from "../../GeneralComponents/Containers";
import styled from "styled-components";
import { useSelector } from "react-redux";
import borders from "../../style-utils/borders";
import { TextWithEllipsis } from "../../GeneralComponents/TextWithoutOverflow";
import gaps from "../../style-utils/gaps";
import colors from "../../style-utils/colors";
import text_styles from "../../style-utils/text_styles";
import paddings from "../../style-utils/paddings";

const Game = ({ game, week, period, setNewConstraint, setModalOpened }) => {
  const { teamA, teamB, location } = game;
  const { selectedTeam } = useSelector((state) => state.solution);
  const focused = selectedTeam === teamA.value || selectedTeam === teamB.value;

  const goToAddNewConstraint = () => {
    setNewConstraint({ game, week, period });
    setModalOpened(true);
  };

  return (
    <GameDescriptionBody focused={focused} onClick={goToAddNewConstraint}>
      <TeamsDescription focused={focused}>
        <LeftTeam>{teamA.label}</LeftTeam>
        <div
          style={{
            fontFamily: `${text_styles.styles.fontFamily}`,
            fontSize: `${text_styles.fonts.xsmall}`,
          }}
        >
          vs
        </div>
        <RightTeam>{teamB.label}</RightTeam>
      </TeamsDescription>
      <Location>Location: {location.label}</Location>
    </GameDescriptionBody>
  );
};

const GameDescriptionBody = styled(ColumnContainer)`
  border: ${borders.small};
  border-radius: 0.2vw;
  cursor: pointer;
  height: auto;
  box-sizing: border-box;
  padding: ${paddings.xsmall} 0;
  background-color: ${(props) => (props.focused ? `${colors.brick}` : "white")};
`;

const TeamsDescription = styled(RowContainer)`
  gap: ${gaps.xsmall};
  height: auto;
  background-color: ${(props) => (props.focused ? `${colors.brick}` : "white")};
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

export default Game;