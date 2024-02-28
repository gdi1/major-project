import { useSelector } from "react-redux";
import { ColumnContainer } from "../../GeneralComponents/Containers";
import { CenteredLabel, Label } from "../../GeneralComponents/Labels";
import React from "react";
import Game from "./Game";
import { useState } from "react";
import AddConstraintNameModal from "../../HomeComponents/ConstraintPanel/ConstraintModals/AddConstraintNameModal";
import { GridContainer } from "../../GeneralComponents/GridComponents";
import styled from "styled-components";
import borders from "../../style-utils/borders";
import margins from "../../style-utils/margins";
import colors from "../../style-utils/colors";

const ScheduleView = () => {
  const { schedule } = useSelector((state) => state.solution);
  const [isModalOpened, setModalOpened] = useState(false);
  const [newConstraint, setNewConstraint] = useState(undefined);
  const { teamsMap, locationsMap, periodsMap, weeksMap, solution } =
    useSelector((state) => state.solution);
  console.log("schedule ", schedule, solution);

  return (
    <TournamentSchedule>
      <AddConstraintNameModal
        isModalOpen={isModalOpened}
        setIsModalOpen={setModalOpened}
        newConstraint={newConstraint}
      />
      {schedule.map(({ week, weekSchedule }) => (
        <WeekSchedule key={week.label}>
          <WeekLabel>{week.label}</WeekLabel>
          {weekSchedule.map(({ period, games }) => (
            <PeriodSchedule key={period.label}>
              <Label>{period.label}</Label>
              <GamesGrid>
                {games.map((game, gameIdx) => (
                  <Game
                    game={game}
                    week={week}
                    period={period}
                    setNewConstraint={setNewConstraint}
                    setModalOpened={setModalOpened}
                    key={gameIdx}
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

const GamesGrid = styled(GridContainer)`
  margin: ${margins.xsmall} 0;
  background-color: ${colors.beige};
`;

const TournamentSchedule = styled(ColumnContainer)`
  justify-content: start;
  align-items: start;
  overflow: scroll;
  height: 80vh;
`;

const WeekLabel = styled(CenteredLabel)`
  border-bottom: ${borders.small};
`;

const WeekSchedule = styled(ColumnContainer)``;
const PeriodSchedule = styled(ColumnContainer)`
  margin: ${margins.xsmall} 0;
`;

export default ScheduleView;
