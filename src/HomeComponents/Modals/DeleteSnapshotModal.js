import {
  ModalTitle,
  ModalButton,
  ModalBody,
  ModalButtonGroup,
  CenteredModalLabel,
} from "../ConstraintPanel/ConstraintModals/ConstraintModalComponents";
import { modal_content } from "../../style-utils/modalContent";
import Modal from "react-modal";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { snapshotsHistoryActions } from "../../store/snapshotsHistory";
import { NotificationManager } from "react-notifications";

const DeleteSnapshotModal = ({
  isModalOpen,
  setIsModalOpen,
  snapshotToDelete,
}) => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const closeModal = () => setIsModalOpen(false);

  const deleteSnapshot = () => {
    dispatch(snapshotsHistoryActions.removeSnapshot(snapshotToDelete));
    NotificationManager.success(
      `Successfully deleted snapshot ${snapshotToDelete}!`,
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
        <ModalTitle>Delete snapshot</ModalTitle>
        <CenteredModalLabel>
          Are you sure you want to delete snapshot {snapshotToDelete}? You will
          not be able to revert this action once done.
        </CenteredModalLabel>
        <ModalButtonGroup>
          <ModalButton onClick={closeModal}>Close</ModalButton>
          <ModalButton onClick={deleteSnapshot}>Delete</ModalButton>
        </ModalButtonGroup>
      </ModalBody>
    </Modal>
  );
};
export default DeleteSnapshotModal;
