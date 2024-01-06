import { useSelector } from "react-redux";
import Container from "../../GeneralComponents/Container";
import styled from "styled-components";
import GeneralButton from "../../GeneralComponents/GeneralButton";
import Label from "../../GeneralComponents/Label";
import React from "react";
import Game from "./Game";

const SolutionPanel = () => {
  const { schedule } = useSelector((state) => state.solution);

  return (
    <Container flexDirection="column" justifyContent="start">
      <Container justifyContent="space-evenly">
        <GeneralButton onClick={() => {}}>View Schedule</GeneralButton>
        <GeneralButton onClick={() => {}}>View Journey</GeneralButton>
      </Container>
      <Container
        flexDirection="column"
        justifyContent="start"
        alignItems="start"
      >
        {schedule.map(({ week, weekSchedule }) => (
          <React.Fragment>
            <Label
              style={{
                borderBottom: "1px solid black",
                wdith: "100%",
                alignSelf: "center",
              }}
            >
              Week {week}
            </Label>
            {weekSchedule.map(({ period, games }) => (
              <React.Fragment>
                <Label>{period}</Label>
                <GamesGrid>
                  {games.map((game) => (
                    <Game game={game} />
                  ))}
                </GamesGrid>
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </Container>
    </Container>
  );
};
const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 24%);
  width: 100%;
  gap: 10px;
  background-color: #fff;
  max-height: 80vh;
  overflow: scroll;
  padding: 10px;
  box-sizing: border-box;
  justify-content: space-between;
`;
export default SolutionPanel;
