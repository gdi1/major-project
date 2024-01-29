import {
  ModalTitle,
  ModalButton,
  ModalLabel,
  ModalBody,
  ModalButtonGroup,
  NameInputField,
} from "./ConstraintPanel/ConstraintModals/ConstraintModalComponents";
import { modal_content } from "../style-utils/modalContent";
import Modal from "react-modal";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { snapshotsHistoryActions } from "../store/snapshotsHistory";

const SaveCurrentSetupModal = ({ isModalOpen, setIsModalOpen }) => {
  const modalRef = useRef();
  const nameRef = useRef();
  const internalState = useSelector((state) => state.constraints);
  const { snapshots } = useSelector((state) => state.snapshotsHistory);
  const solution = useSelector((state) => state.solution);
  const dispatch = useDispatch();

  const closeModal = () => setIsModalOpen(false);

  const saveCurrentSetup = () => {
    const name = nameRef.current.value;
    if (!name || name.trim() === "") {
      alert("Mush give a name to the snapshot");
      return;
    }
    if (snapshots.map((snapshot) => snapshot.name).includes(name)) {
      alert("This name already exists");
      return;
    }
    dispatch(
      snapshotsHistoryActions.addSnapshot({
        name,
        internalState,
        solution,
        date: new Date(),
      })
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
        <ModalTitle>Save current setup</ModalTitle>
        <ModalLabel>Name</ModalLabel>
        <NameInputField placeholder="Enter name" ref={nameRef} />
        <ModalButtonGroup>
          <ModalButton onClick={closeModal}>Close</ModalButton>
          <ModalButton onClick={saveCurrentSetup}>Save</ModalButton>
        </ModalButtonGroup>
      </ModalBody>
    </Modal>
  );
};
export default SaveCurrentSetupModal;
