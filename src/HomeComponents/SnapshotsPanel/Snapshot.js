import styled from "styled-components";
import { RowContainer } from "../../GeneralComponents/Containers";
import GeneralButton from "../../GeneralComponents/GeneralButton";
import export_icon from "../../icons/export_icon.png";
import delete_icon from "../../icons/delete_icon.png";
import { Label } from "../../GeneralComponents/Labels";
import borders from "../../style-utils/borders";
import paddings from "../../style-utils/paddings";
import outdated_icon from "../../icons/outdated_icon.png";
import incomplete_icon from "../../icons/incomplete_icon.png";
import load_back_icon from "../../icons/load_back_icon.png";
import { exportJSON } from "../../Utilities/ExportingFunction";
import { NotificationManager } from "react-notifications";
import text_styles from "../../style-utils/text_styles";
import { TooltipText } from "../../GeneralComponents/TooltipText";

const Snapshot = ({ snapshot, setSnapshotToLoadBack, setSnapshotToDelete }) => {
  const { name, date } = snapshot;
  const { isOutdated, solution } = snapshot.solution;
  const noSolution = solution.length === 0;

  const exportSnapshot = () => {
    exportJSON({ snapshot });
    NotificationManager.success(`Successfully exported snapshot ${name}`);
  };

  return (
    <SnapshotBody>
      <SnapshotDetails>
        <Name>{name}</Name>
        <DateAndSolutionStatusContainer>
          <Date>Created: {new window.Date(date).toLocaleString()}</Date>
          {isOutdated && !noSolution && (
            <IconContainer>
              <SolutionStatusIcon src={outdated_icon} />
              <TooltipText>Outdated solution</TooltipText>
            </IconContainer>
          )}
          {!isOutdated && noSolution && (
            <IconContainer>
              <SolutionStatusIcon src={incomplete_icon} />
              <TooltipText>No solution</TooltipText>
            </IconContainer>
          )}
        </DateAndSolutionStatusContainer>
      </SnapshotDetails>
      <SnapshotActionsGroup>
        <GeneralButton onClick={() => setSnapshotToLoadBack(name)}>
          <Icon src={load_back_icon} />
          <TooltipText>Load snapshot back</TooltipText>
        </GeneralButton>
        <GeneralButton onClick={exportSnapshot}>
          <Icon src={export_icon} />
          <TooltipText>Export</TooltipText>
        </GeneralButton>
        <GeneralButton onClick={() => setSnapshotToDelete(name)}>
          <Icon src={delete_icon} />
          <TooltipText>Delete</TooltipText>
        </GeneralButton>
      </SnapshotActionsGroup>
    </SnapshotBody>
  );
};

const Name = styled(Label)`
  width: 60%;
`;

const SolutionStatusIcon = styled.img`
  width: 40px;
  height: 40px;
`;

const DateAndSolutionStatusContainer = styled(RowContainer)`
  justify-content: start;
  width: auto;
  height: auto;
  gap: 10px;
`;

const Date = styled.div``;

const SnapshotBody = styled(RowContainer)`
  height: auto;
  justify-content: space-between;
  border-bottom: ${borders.small};
  padding: ${paddings.small};
`;
const SnapshotDetails = styled(RowContainer)`
  height: auto;
  justify-content: start;
`;
const SnapshotActionsGroup = styled(RowContainer)`
  width: auto;
  height: auto;
  gap: 10px;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

const IconContainer = styled.div`
  position: relative;
  display: inline-block;

  font-size: ${text_styles.resizbale_font.small_med};
  font-weight: bold;

  &:hover span {
    visibility: visible;
    opacity: 1;
  }

  span::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent black transparent;
  }
`;

export default Snapshot;
