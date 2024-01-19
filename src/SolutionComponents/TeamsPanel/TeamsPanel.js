import { useSelector, useDispatch } from "react-redux";
import { ColumnContainer } from "../../GeneralComponents/Containers";
import { CenteredLabel } from "../../GeneralComponents/Labels";
import Title from "../../GeneralComponents/Title";
import { solutionActions } from "../../store/solution";
import styled from "styled-components";
import paddings from "../../style-utils/paddings";
import borders from "../../style-utils/borders";

const TeamsPanel = () => {
  const dispatch = useDispatch();
  const { teams } = useSelector((state) => state.constraints);
  const { selectedTeam, selectedTeamGames, selectedTeamJourney } = useSelector(
    (state) => state.solution
  );
  console.log(selectedTeam, selectedTeamGames, selectedTeamJourney);
  const toggleTeamSelection = (team) => {
    dispatch(
      selectedTeam !== team.value
        ? solutionActions.selectTeam(team.value)
        : solutionActions.deselectTeam(team.value)
    );
  };

  return (
    <TeamOptionsBody>
      <TeamsPanelTitle>Teams</TeamsPanelTitle>
      {teams.map((team) => (
        <TeamOption
          focused={selectedTeam === team.value}
          onClick={() => toggleTeamSelection(team)}
        >
          {team.label}
        </TeamOption>
      ))}
    </TeamOptionsBody>
  );
};

const TeamOption = styled(CenteredLabel)`
  padding: ${paddings.small};
  border: ${borders.small};
  cursor: pointer;
  width: 80%;
  background-color: ${(props) => (props.focused ? "blue" : "white")};
`;

const TeamOptionsBody = styled(ColumnContainer)`
  width: 12%;
  height: 90vh;
  overflow: scroll;
  justify-content: start;
  border-right: ${borders.small};
`;

const TeamsPanelTitle = styled(Title)`
  border-bottom: ${borders.small};
  padding-bottom: ${paddings.xsmall};
`;

export default TeamsPanel;
