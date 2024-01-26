import { useSelector } from "react-redux";
import styled from "styled-components";
import { ColumnContainer } from "../../GeneralComponents/Containers";
import Snapshot from "./Snapshot";

const SnapshotsPanel = () => {
  const { snapshots } = useSelector((state) => state.snapshotsHistory);

  return (
    <SnapshotsList>
      {snapshots.map((snapshot) => (
        <Snapshot snapshot={snapshot} />
      ))}
    </SnapshotsList>
  );
};

const SnapshotsList = styled(ColumnContainer)``;
export default SnapshotsPanel;
