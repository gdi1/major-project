import { useSelector } from "react-redux";
import { Container } from "../../GeneralComponents/Containers";
import styled from "styled-components";
import { Label } from "../../GeneralComponents/Labels";
import React from "react";
import Game from "./Game";
import { useState } from "react";
import AddConstraintNameModal from "../../HomeComponents/AddConstraintNameModal";

const ScheduleView = () => {
  const { schedule } = useSelector((state) => state.solution);
  const [isModalOpened, setModalOpened] = useState(false);
  const [newConstraint, setNewConstraint] = useState(undefined);

  return (
    <Container
      flexDirection="column"
      justifyContent="start"
      alignItems="start"
      style={{ overflow: "scroll", height: "85vh" }}
    >
      {isModalOpened && (
        <AddConstraintNameModal
          isModalOpen={isModalOpened}
          setIsModalOpen={setModalOpened}
          newConstraint={newConstraint}
        />
      )}
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
                  <Game
                    game={game}
                    week={week}
                    period={period}
                    setNewConstraint={setNewConstraint}
                    setModalOpened={setModalOpened}
                  />
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
