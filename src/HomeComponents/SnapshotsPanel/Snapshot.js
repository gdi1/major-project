import styled from "styled-components";
import { RowContainer } from "../../GeneralComponents/Containers";
import GeneralButton from "../../GeneralComponents/GeneralButton";
import go_back_icon from "../../icons/go_back_icon.png";
import export_icon from "../../icons/export_icon.png";
import delete_icon from "../../icons/delete_icon.png";
import { Label } from "../../GeneralComponents/Labels";
import borders from "../../style-utils/borders";
import paddings from "../../style-utils/paddings";
import outdated_icon from "../../icons/outdated_icon.png";
import incomplete_icon from "../../icons/incomplete_icon.png";
import { useDispatch } from "react-redux";
import { snapshotsHistoryActions } from "../../store/snapshotsHistory";

const Snapshot = ({ snapshot, idx }) => {
  const { name, date } = snapshot;
  const { isOutdated, solution } = snapshot.solution;
  const noSolution = solution.length === 0;
  const dispatch = useDispatch();

  const deleteSnapshot = () => {
    dispatch(snapshotsHistoryActions.removeSnapshot(idx));
  };

  const downloadJSON = () => {
    const json = JSON.stringify(snapshot);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "data.json";
    document.body.appendChild(link);
    link.click();

    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };

  return (
    <SnapshotBody>
      <SnapshotDetails>
        <Name>{name}</Name>
        <DateAndSolutionStatusContainer>
          <Date>Created: {date.toLocaleString()}</Date>
          {isOutdated && !noSolution && (
            <SolutionStatusIcon src={outdated_icon} />
          )}
          {!isOutdated && noSolution && (
            <SolutionStatusIcon src={incomplete_icon} />
          )}
        </DateAndSolutionStatusContainer>
      </SnapshotDetails>
      <SnapshotActionsGroup>
        <GeneralButton>
          <Icon src={go_back_icon} />
        </GeneralButton>
        <GeneralButton onClick={downloadJSON}>
          <Icon src={export_icon} />
        </GeneralButton>
        <GeneralButton onClick={deleteSnapshot}>
          <Icon src={delete_icon} />
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

export default Snapshot;
