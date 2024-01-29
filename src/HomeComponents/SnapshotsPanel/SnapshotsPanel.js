import { useSelector } from "react-redux";
import styled from "styled-components";
import { ColumnContainer } from "../../GeneralComponents/Containers";
import Snapshot from "./Snapshot";
import Title from "../../GeneralComponents/Title";
import { RowContainer } from "../../GeneralComponents/Containers";
import borders from "../../style-utils/borders";
import { CenteredLabel } from "../../GeneralComponents/Labels";

const SnapshotsPanel = () => {
  const { snapshots } = useSelector((state) => state.snapshotsHistory);

  return (
    <SnapshotsBody>
      <SectionHeader>
        <Title>Snapshots</Title>
      </SectionHeader>
      <SnapshotsList>
        {snapshots.length === 0 && <CenteredLabel>No snapshots.</CenteredLabel>}
        {snapshots.map((snapshot, idx) => (
          <Snapshot snapshot={snapshot} idx={idx} />
        ))}
      </SnapshotsList>
    </SnapshotsBody>
  );
};

const SnapshotsBody = styled(ColumnContainer)`
  height: auto;
  width: 80%;
  margin-bottom: 40px;
`;

const SectionHeader = styled(RowContainer)`
  height: auto;
  border-bottom: ${borders.small};
  margin-bottom: 40px;
  justify-content: start;
`;

const SnapshotsList = styled(ColumnContainer)`
  width: 90%;
  gap: 20px;
`;
export default SnapshotsPanel;
