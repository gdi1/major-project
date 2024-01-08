import { useSelector } from "react-redux";
import { ColumnContainer, Container } from "../../GeneralComponents/Containers";
import { CenteredLabel, Label } from "../../GeneralComponents/Labels";
import React from "react";
import Game from "./Game";
import { useState } from "react";
import AddConstraintNameModal from "../../HomeComponents/AddConstraintNameModal";
import { GridContainer as GamesGrid } from "../../GeneralComponents/GridComponents";
import styled from "styled-components";
import borders from "../../style-utils/borders";

const ScheduleView = () => {
  const { schedule } = useSelector((state) => state.solution);
  const [isModalOpened, setModalOpened] = useState(false);
  const [newConstraint, setNewConstraint] = useState(undefined);

  return (
    <TournamentSchedule>
      {isModalOpened && (
        <AddConstraintNameModal
          isModalOpen={isModalOpened}
          setIsModalOpen={setModalOpened}
          newConstraint={newConstraint}
        />
      )}
      {schedule.map(({ week, weekSchedule }) => (
        <WeekSchedule>
          <WeekLabel>Week {week}</WeekLabel>
          {weekSchedule.map(({ period, games }) => (
            <PeriodSchedule>
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
            </PeriodSchedule>
          ))}
        </WeekSchedule>
      ))}
    </TournamentSchedule>
  );
};

const TournamentSchedule = styled(ColumnContainer)`
  justify-content: start;
  align-items: start;
  overflow: scroll;
  height: 85vh;
`;

const WeekLabel = styled(CenteredLabel)`
  border-bottom: ${borders.small};
`;

const WeekSchedule = styled(ColumnContainer)``;
const PeriodSchedule = styled(ColumnContainer)``;

export default ScheduleView;
