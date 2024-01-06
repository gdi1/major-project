import { useSelector } from "react-redux";
import Container from "../../GeneralComponents/Container";
import styled from "styled-components";
import Label from "../../GeneralComponents/Label";
import React from "react";
import Game from "./Game";

const ScheduleView = () => {
  const { schedule } = useSelector((state) => state.solution);
  return (
    <Container
      flexDirection="column"
      justifyContent="start"
      alignItems="start"
      style={{ overflow: "scroll", height: "85vh" }}
    >
      {schedule.map(({ week, weekSchedule }) => (
        <React.Fragment>
          <Label
            style={{
              borderBottom: "1px solid black",
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
  );
};

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 24%);
  width: 100%;
  gap: 10px;
  background-color: #fff;

  box-sizing: border-box;
  justify-content: space-between;
`;

export default ScheduleView;
