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

  const closeModal = () => setIsModalOpen(false);

  const saveCurrentWorkingCopy = () => {
    const name = nameRef.current.value;
    if (!name || name.trim() === "") {
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
        date: new Date(),
      })
    );
    return true;
  };

  const loadBackSnapshot = (saveWorkingCopy) => {
    if (saveWorkingCopy && !saveCurrentWorkingCopy()) return;
    const snapshotToLoad = snapshots.find(
      (snapshot) => snapshot.name === snapshotName
    );
    console.log("Snapshot is:", snapshotToLoad);
    dispatch(configurationsActions.setState(snapshotToLoad.internalState));
    dispatch(solutionActions.setState(snapshotToLoad.solution));
    console.log("name: ", snapshotName);
    NotificationManager.success(
      ...formatNtf(
        `Successfully loaded back snapshot ${snapshotName}!`,
        "Success"
      )
    );
    setSnapshotToLoadBack(undefined);
    closeModal();
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
          <ModalTitle>Export everything</ModalTitle>
          <ModalLabel>Working Copy's Snapshot Name</ModalLabel>
          <NameInputField placeholder="Enter name" ref={nameRef} />
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
