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

const SaveWorkingCopyModal = ({ isModalOpen, setIsModalOpen }) => {
  const modalRef = useRef();
  const nameRef = useRef();
  const internalState = useSelector((state) => state.constraints);
  const { snapshots } = useSelector((state) => state.snapshotsHistory);
  const solution = useSelector((state) => state.solution);
  const dispatch = useDispatch();

  const closeModal = () => setIsModalOpen(false);

  const saveWorkingCopy = () => {
    const name = nameRef.current.value;
    if (!name || name.trim() === "") {
      NotificationManager.error("Mush give a name to the snapshot!", "Error");
      return;
    }
    if (snapshots.map((snapshot) => snapshot.name).includes(name)) {
      NotificationManager.error("This name already exists!", "Error");
      return;
    }
    dispatch(
      snapshotsHistoryActions.addSnapshot({
        name,
        internalState,
        solution,
        date: new window.Date().toISOString(),
      })
    );
    NotificationManager.success(
      `Successfully took snapshot ${name} of the working copy!`,
      "Success"
    );
    closeModal();
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
        <NameInputField placeholder="Enter name" ref={nameRef} />
        <ModalButtonGroup>
          <ModalButton onClick={closeModal}>Close</ModalButton>
          <ModalButton onClick={saveWorkingCopy}>Save</ModalButton>
        </ModalButtonGroup>
      </ModalBody>
    </Modal>
  );
};
export default SaveWorkingCopyModal;
