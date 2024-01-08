import { Container } from "../../GeneralComponents/Containers";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Game = ({ game, week, period, setNewConstraint, setModalOpened }) => {
  const { teamA, teamB, location } = game;
  const { selectedTeam } = useSelector((state) => state.solution);
  const focused = selectedTeam === teamA || selectedTeam === teamB;

  return (
    <Container
      flexDirection="column"
      style={{
        border: "1px solid black",
        cursor: "pointer",
        boxSizing: "border-box",
        backgroundColor: focused ? "blue" : "white",
      }}
      onClick={() => {
        setNewConstraint({ game, week, period });
        setModalOpened(true);
      }}
      height="8vh"
    >
      <Container
        gap="10px"
        height="auto"
        style={{ backgroundColor: focused ? "blue" : "white" }}
      >
        <TextWithEllipsis
          style={{
            width: "40%",
            textAlign: "right",
          }}
        >
          {teamA}
        </TextWithEllipsis>
        <div>vs</div>
        <TextWithEllipsis
          style={{
            textAlign: "left",
            width: "40%",
          }}
        >
          {teamB}
        </TextWithEllipsis>
      </Container>
      <TextWithEllipsis
        style={{
          width: "60%",
          textAlign: "center",
        }}
      >
        Location: {location}
      </TextWithEllipsis>
    </Container>
  );
};

const TextWithEllipsis = styled.div`
  word-break: break-word;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export default Game;
