import {
  ModalTitle,
  ModalButton,
  ModalLabel,
  ModalBody,
  ModalButtonGroup,
  CenteredModalLabel,
  NameInputField,
} from "../../GeneralComponents/ModalComponents";
import { modal_content } from "../../style-utils/modalContent";
import Modal from "react-modal";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { snapshotsHistoryActions } from "../../store/snapshotsHistory";
import { configurationsActions } from "../../store/configurations";
import { solutionActions } from "../../store/solution";
import { NotificationManager } from "react-notifications";
import { formatNtf } from "../../Utilities/NotificationWrapper";

const LoadBackSnapshotModal = ({
  isModalOpen,
  setIsModalOpen,
  snapshotName,
  setSnapshotToLoadBack,
}) => {
  const modalRef = useRef();
  const nameRef = useRef();
  const internalState = useSelector((state) => state.configurations);
  const { snapshots } = useSelector((state) => state.snapshotsHistory);
  const solution = useSelector((state) => state.solution);
  const dispatch = useDispatch();

  const [goToSaveWorkingCopy, setGoToSaveWorkingCopy] = useState(false);

  const closeModal = () => {
    setGoToSaveWorkingCopy(false);
    setIsModalOpen(false);
  };

  const saveCurrentWorkingCopy = () => {
    const name = nameRef.current.value.trim();
    if (!name || name === "") {
      NotificationManager.error(
        ...formatNtf("Mush give a name to the snapshot", "Error")
      );
      return false;
    }
    if (snapshots.map((snapshot) => snapshot.name).includes(name)) {
      NotificationManager.error(
        ...formatNtf("This name already exists", "Error")
      );
      return false;
    }
    dispatch(
      snapshotsHistoryActions.addSnapshot({
        name,
        internalState,
        solution,
        date: new window.Date().toISOString(),
      })
    );
    return true;
  };

  const loadBackSnapshot = (saveWorkingCopy) => {
    if (saveWorkingCopy && !saveCurrentWorkingCopy()) return;

    const snapshotToLoad = snapshots.find(
      (snapshot) => snapshot.name === snapshotName
    );
    dispatch(configurationsActions.setState(snapshotToLoad.internalState));
    dispatch(solutionActions.setState(snapshotToLoad.solution));
    if (saveWorkingCopy) {
      const currentWorkingCopySnapshotName = nameRef.current.value.trim();
      NotificationManager.success(
        ...formatNtf(
          `Successfully saved current working copy in snapshot ${currentWorkingCopySnapshotName}!`,
          "Success"
        )
      );
    }
    NotificationManager.success(
      ...formatNtf(
        `Successfully loaded back snapshot ${snapshotName}!`,
        "Success"
      )
    );
    setSnapshotToLoadBack(undefined);
    closeModal();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") loadBackSnapshot(true);
  };

  return (
    <Modal
      ariaHideApp={false}
      ref={modalRef}
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={{
        content: { ...modal_content.content, width: "50%" },
        overlay: modal_content.overlay,
      }}
    >
      {!goToSaveWorkingCopy && (
        <ModalBody>
          <ModalButton
            onClick={closeModal}
            style={{ alignSelf: "end", width: "auto" }}
          >
            Close
          </ModalButton>
          <ModalTitle>Load back snapshot</ModalTitle>
          <CenteredModalLabel>
            Do you want to save your current work before loading the previous
            snapshot, which will replace it?
          </CenteredModalLabel>
          <ModalButtonGroup>
            <ModalButton onClick={() => loadBackSnapshot(false)}>
              Continue without saving
            </ModalButton>
            <ModalButton onClick={() => setGoToSaveWorkingCopy(true)}>
              Save and Continue
            </ModalButton>
          </ModalButtonGroup>
        </ModalBody>
      )}
      {goToSaveWorkingCopy && (
        <ModalBody>
          <ModalButton
            onClick={() => setGoToSaveWorkingCopy(false)}
            style={{ alignSelf: "end", width: "auto" }}
          >
            Go back
          </ModalButton>
          <ModalTitle>Save current working copy</ModalTitle>
          <ModalLabel>Working Copy's Snapshot Name</ModalLabel>
          <NameInputField
            placeholder="Enter name"
            ref={nameRef}
            autoFocus={true}
            onKeyDown={handleKeyDown}
          />
          <ModalButtonGroup>
            <ModalButton onClick={closeModal}>Close</ModalButton>
            <ModalButton onClick={() => loadBackSnapshot(true)}>
              Save and Continue
            </ModalButton>
          </ModalButtonGroup>
        </ModalBody>
      )}
    </Modal>
  );
};
export default LoadBackSnapshotModal;
