import {
  ModalTitle,
  ModalButton,
  ModalBody,
  ModalButtonGroup,
  CenteredModalLabel,
} from "../../../GeneralComponents/ModalComponents";
import { modal_content } from "../../../style-utils/modalContent";
import Modal from "react-modal";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { constraintsActions } from "../../../store/constraints";
import { NotificationManager } from "react-notifications";
import { formatNtf } from "../../../Utilities/NotificationWrapper";

const DeleteConstraintModal = ({
  isModalOpen,
  setIsModalOpen,
  constraintToDelete,
}) => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const closeModal = () => setIsModalOpen(false);

  const deleteConstraint = () => {
    dispatch(constraintsActions.removeConstraintByName(constraintToDelete));
    NotificationManager.success(
      ...formatNtf(
        `Successfully removed constraint ${constraintToDelete}`,
        "Success"
      )
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
        <ModalTitle>Delete constraint</ModalTitle>
        <CenteredModalLabel>
          Are you sure you want to delete constraint {constraintToDelete}? This
          action cannot be undone once performed.
        </CenteredModalLabel>
        <ModalButtonGroup>
          <ModalButton onClick={closeModal}>Close</ModalButton>
          <ModalButton onClick={deleteConstraint}>Delete</ModalButton>
        </ModalButtonGroup>
      </ModalBody>
    </Modal>
  );
};
export default DeleteConstraintModal;
