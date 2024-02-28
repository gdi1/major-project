import { useSelector, useDispatch } from "react-redux";
import { ColumnContainer } from "../../GeneralComponents/Containers";
import { CenteredLabel } from "../../GeneralComponents/Labels";
import Title from "../../GeneralComponents/Title";
import { solutionActions } from "../../store/solution";
import styled from "styled-components";
import paddings from "../../style-utils/paddings";
import borders from "../../style-utils/borders";
import margins from "../../style-utils/margins";
import gaps from "../../style-utils/gaps";
import colors from "../../style-utils/colors";

const TeamsPanel = () => {
  const dispatch = useDispatch();
  const { teams } = useSelector((state) => state.solution.internalData);
  const { selectedTeam } = useSelector((state) => state.solution);
  const toggleTeamSelection = (team) => {
    if (selectedTeam !== team.value) {
    }
    dispatch(
      selectedTeam !== team.value
        ? solutionActions.selectTeam(team.value)
        : solutionActions.deselectTeam(team.value)
    );
  };

  return (
    <TeamOptionsBody>
      <TeamsPanelTitle>Teams</TeamsPanelTitle>
      <OptionsContainer>
        {teams.map((team) => (
          <TeamOption
            focused={selectedTeam === team.value}
            onClick={() => toggleTeamSelection(team)}
            key={team.label}
          >
            {team.label}
          </TeamOption>
        ))}
      </OptionsContainer>
    </TeamOptionsBody>
  );
};

const TeamOption = styled(CenteredLabel)`
  padding: ${paddings.xxsmall};
  border: ${borders.small};
  cursor: pointer;
  width: 80%;
  word-break: break-word;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  background-color: ${(props) => (props.focused ? `${colors.brick}` : "white")};
`;

const OptionsContainer = styled(ColumnContainer)`
  gap: ${gaps.xxsmall};
  justify-content: start;
  height: 80vh;
  overflow: scroll;
`;
const TeamOptionsBody = styled(ColumnContainer)`
  width: 15vw;
  height: 82vh;
  justify-content: start;
`;

const TeamsPanelTitle = styled(CenteredLabel)`
  height: 2vh;
  border-bottom: ${borders.small};
  padding: ${paddings.xsmall} 0;
  margin-bottom: ${margins.xsmall};
`;

export default TeamsPanel;
