import {
  ModalTitle,
  ModalButton,
  ModalBody,
  ModalButtonGroup,
  CenteredModalLabel,
} from "../../GeneralComponents/ModalComponents";
import { modal_content } from "../../style-utils/modalContent";
import Modal from "react-modal";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { solutionActions } from "../../store/solution";
import { NotificationManager } from "react-notifications";
import { formatNtf } from "../../Utilities/NotificationWrapper";

const ResetSolutionModal = ({ isModalOpen, setIsModalOpen }) => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const closeModal = () => setIsModalOpen(false);

  const resetSolution = () => {
    dispatch(solutionActions.resetSolution());
    NotificationManager.success(
      ...formatNtf(`Successfully removed solution!`, "Success")
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
        <ModalTitle>Reset solution</ModalTitle>
        <CenteredModalLabel>
          Are you sure you want to reset the solution? You will not be able to
          revert this action once done.
        </CenteredModalLabel>
        <ModalButtonGroup>
          <ModalButton onClick={closeModal}>Close</ModalButton>
          <ModalButton onClick={resetSolution}>Reset</ModalButton>
        </ModalButtonGroup>
      </ModalBody>
    </Modal>
  );
};
export default ResetSolutionModal;
