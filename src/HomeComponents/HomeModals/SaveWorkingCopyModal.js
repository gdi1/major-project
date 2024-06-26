import {
  ModalTitle,
  ModalButton,
  ModalLabel,
  ModalBody,
  ModalButtonGroup,
  NameInputField,
} from "../../GeneralComponents/ModalComponents";
import { modal_content } from "../../style-utils/modalContent";
import Modal from "react-modal";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { snapshotsHistoryActions } from "../../store/snapshotsHistory";
import { NotificationManager } from "react-notifications";
import { formatNtf } from "../../Utilities/NotificationWrapper";

const SaveWorkingCopyModal = ({ isModalOpen, setIsModalOpen }) => {
  const modalRef = useRef();
  const nameRef = useRef();
  const internalState = useSelector((state) => state.configurations);
  const { snapshots } = useSelector((state) => state.snapshotsHistory);
  const solution = useSelector((state) => state.solution);
  const dispatch = useDispatch();

  const closeModal = () => setIsModalOpen(false);

  const saveWorkingCopy = () => {
    const name = nameRef.current.value;
    if (!name || name.trim() === "") {
      NotificationManager.error(
        ...formatNtf("Mush give a name to the snapshot!", "Error")
      );
      return;
    }
    if (snapshots.map((snapshot) => snapshot.name).includes(name)) {
      NotificationManager.error(
        ...formatNtf("This name already exists!", "Error")
      );
      return;
    }
    dispatch(
      snapshotsHistoryActions.addSnapshot({
        name: name.trim(),
        internalState,
        solution,
        date: new window.Date().toISOString(),
      })
    );
    NotificationManager.success(
      ...formatNtf(
        `Successfully took snapshot ${name} of the working copy!`,
        "Success"
      )
    );
    closeModal();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") saveWorkingCopy();
  };

  return (
    <Modal
      ariaHideApp={false}
      ref={modalRef}
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={modal_content}
    >
      <ModalBody>
        <ModalTitle>Save working copy</ModalTitle>
        <ModalLabel>Name</ModalLabel>
        <NameInputField
          placeholder="Enter name"
          ref={nameRef}
          autoFocus={true}
          onKeyDown={handleKeyDown}
        />
        <ModalButtonGroup>
          <ModalButton onClick={closeModal}>Close</ModalButton>
          <ModalButton onClick={saveWorkingCopy}>Save</ModalButton>
        </ModalButtonGroup>
      </ModalBody>
    </Modal>
  );
};
export default SaveWorkingCopyModal;
