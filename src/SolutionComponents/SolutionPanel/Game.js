import Container from "../../GeneralComponents/Container";

const Game = ({ game }) => {
  const { teamA, teamB, location } = game;

  return (
    <Container flexDirection="column" style={{ border: "1px solid black" }}>
      <Container gap="10px">
        <div>{teamA}</div>
        <div>vs</div>
        <div>{teamB}</div>
      </Container>
      <div>{location}</div>
    </Container>
  );
};

export default Game;
