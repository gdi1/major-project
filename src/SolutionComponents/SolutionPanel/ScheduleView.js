import { useSelector } from "react-redux";
import { ColumnContainer } from "../../GeneralComponents/Containers";
import { CenteredLabel, Label } from "../../GeneralComponents/Labels";
import React from "react";
import Game from "./Game";
import { useState } from "react";
import AddConstraintNameModal from "../../HomeComponents/ConstraintPanel/ConstraintModals/AddConstraintNameModal";
import { GridContainer as GamesGrid } from "../../GeneralComponents/GridComponents";
import styled from "styled-components";
import borders from "../../style-utils/borders";

const ScheduleView = () => {
  const { schedule } = useSelector((state) => state.solution);
  const [isModalOpened, setModalOpened] = useState(false);
  const [newConstraint, setNewConstraint] = useState(undefined);
  const { teamsMap, locationsMap, periodsMap, weeksMap } = useSelector(
    (state) => state.solution
  );
  console.log("Heree", teamsMap, locationsMap, periodsMap, weeksMap);
  console.log(schedule);

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
          <WeekLabel>{week.label}</WeekLabel>
          {weekSchedule.map(({ period, games }) => (
            <PeriodSchedule>
              <Label>{period.label}</Label>
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
