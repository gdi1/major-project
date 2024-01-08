import {
  ColumnContainer,
  RowContainer,
} from "../../GeneralComponents/Containers";
import styled from "styled-components";
import { useSelector } from "react-redux";
import borders from "../../style-utils/borders";

const Game = ({ game, week, period, setNewConstraint, setModalOpened }) => {
  const { teamA, teamB, location } = game;
  const { selectedTeam } = useSelector((state) => state.solution);
  const focused = selectedTeam === teamA || selectedTeam === teamB;

  const goToAddNewConstraint = () => {
    setNewConstraint({ game, week, period });
    setModalOpened(true);
  };

  return (
    <GameDescriptionBody focused={focused} onClick={goToAddNewConstraint}>
      <TeamsDescription focused={focused}>
        <LeftTeam>{teamA}</LeftTeam>
        <div>vs</div>
        <RightTeam>{teamB}</RightTeam>
      </TeamsDescription>
      <Location>Location: {location}</Location>
    </GameDescriptionBody>
  );
};

const TextWithEllipsis = styled.div`
  word-break: break-word;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const GameDescriptionBody = styled(ColumnContainer)`
  border: ${borders.small};
  cursor: pointer;
  box-sizing: border-box;
  height: 8vh;
  background-color: ${(props) => (props.focused ? "blue" : "white")};
`;

const TeamsDescription = styled(RowContainer)`
  gap: 10px;
  height: auto;
  background-color: ${(props) => (props.focused ? "blue" : "white")};
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
