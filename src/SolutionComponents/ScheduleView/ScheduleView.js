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
import Constraint from "../../HomeComponents/ConstraintPanel/Constraint";
import text_styles from "../../style-utils/text_styles";
import { TextWithEllipsisCSS } from "../../GeneralComponents/TextWithoutOverflow";

const ScheduleView = () => {
  const { schedule, violatedSoftConstraints } = useSelector(
    (state) => state.solution
  );
  const [isModalOpened, setModalOpened] = useState(false);
  const [newConstraint, setNewConstraint] = useState(undefined);

  return (
    <TournamentSchedule>
      <AddConstraintNameModal
        isModalOpen={isModalOpened}
        setIsModalOpen={setModalOpened}
        newConstraint={newConstraint}
      />
      {violatedSoftConstraints.length > 0 && (
        <React.Fragment>
          <SubTitle>Violated Constraints</SubTitle>
          <ViolatedSoftConstraints>
            {violatedSoftConstraints.map((cname) => (
              <Constraint>
                <ConstraintName>{cname}</ConstraintName>
              </Constraint>
            ))}
          </ViolatedSoftConstraints>
        </React.Fragment>
      )}
      <SubTitle>Schedule</SubTitle>
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

const ConstraintName = styled.div`
  width: 100%;
  text-align: center;
  ${TextWithEllipsisCSS};
`;

const ViolatedSoftConstraints = styled(GridContainer)`
  grid-template-columns: repeat(3, 30%);
  background-color: ${colors.beige};
`;

const TournamentSchedule = styled(ColumnContainer)`
  justify-content: start;
  align-items: start;
  overflow: scroll;
  height: 82vh;
`;

const GamesGrid = styled(GridContainer)`
  margin: ${margins.xsmall} 0;
  background-color: ${colors.beige};
`;

const SubTitle = styled(CenteredLabel)`
  border-bottom: ${borders.small};
  margin: ${margins.small} 0;
  font-size: ${text_styles.fonts.med_minus};
`;

const WeekLabel = styled(CenteredLabel)`
  text-decoration: underline;
`;

const WeekSchedule = styled(ColumnContainer)`
  height: auto;
`;
const PeriodSchedule = styled(ColumnContainer)`
  margin: ${margins.xsmall} 0;
  height: auto;
`;

export default ScheduleView;
