import { useSelector } from "react-redux";
import styled from "styled-components";
import { ColumnContainer } from "../../GeneralComponents/Containers";
import Snapshot from "./Snapshot";
import Title from "../../GeneralComponents/Title";
import { RowContainer } from "../../GeneralComponents/Containers";
import borders from "../../style-utils/borders";
import { CenteredLabel } from "../../GeneralComponents/Labels";
import LoadBackSnapshotModal from "../Modals/LoadBackSnapshotModal";
import { useEffect, useState } from "react";
import DeleteSnapshotModal from "../Modals/DeleteSnapshotModal";

const SnapshotsPanel = () => {
  const { snapshots } = useSelector((state) => state.snapshotsHistory);

  const [showLoadBackSnapshotModal, setShowLoadBackSnapshotModal] =
    useState(false);
  const [snapshotToLoadBack, setSnapshotToLoadBack] = useState(undefined);

  const [snapshotToDelete, setSnapshotToDelete] = useState(undefined);
  const [showSnapshotToDeleteModal, setShowSnapshotToDeleteModal] =
    useState(false);

  useEffect(() => {
    if (snapshotToLoadBack) setShowLoadBackSnapshotModal(true);
  }, snapshotToLoadBack);

  useEffect(() => {
    if (!showLoadBackSnapshotModal) setSnapshotToLoadBack(undefined);
  }, [showLoadBackSnapshotModal]);

  useEffect(() => {
    if (snapshotToDelete) setShowSnapshotToDeleteModal(true);
  }, snapshotToDelete);

  useEffect(() => {
    if (!setShowSnapshotToDeleteModal) setSnapshotToDelete(undefined);
  }, [setShowSnapshotToDeleteModal]);

  return (
    <SnapshotsBody>
      <LoadBackSnapshotModal
        isModalOpen={showLoadBackSnapshotModal}
        setIsModalOpen={setShowLoadBackSnapshotModal}
        snapshotName={snapshotToLoadBack}
      />
      <DeleteSnapshotModal
        isModalOpen={showSnapshotToDeleteModal}
        setIsModalOpen={setShowSnapshotToDeleteModal}
        snapshotToDelete={snapshotToDelete}
      />
      <SectionHeader>
        <Title>Snapshots</Title>
      </SectionHeader>
      <SnapshotsList>
        {snapshots.length === 0 && <CenteredLabel>No snapshots.</CenteredLabel>}
        {snapshots.map((snapshot) => (
          <Snapshot
            key={snapshot.name}
            snapshot={snapshot}
            setSnapshotToLoadBack={setSnapshotToLoadBack}
            setSnapshotToDelete={setSnapshotToDelete}
          />
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
