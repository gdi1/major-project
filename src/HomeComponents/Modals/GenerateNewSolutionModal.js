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

const GenerateNewSolutionModal = ({
  isModalOpen,
  setIsModalOpen,
  solveConfiguration,
}) => {
  const modalRef = useRef();
  const closeModal = () => setIsModalOpen(false);

  const generateNewSolution = () => {
    closeModal();
    solveConfiguration();
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
        <ModalTitle>Generate New Solution</ModalTitle>
        <CenteredModalLabel>
          This action will override the existing solution. Do you want to
          continue?
        </CenteredModalLabel>
        <ModalButtonGroup>
          <ModalButton onClick={closeModal}>Close</ModalButton>
          <ModalButton onClick={generateNewSolution}>Continue</ModalButton>
        </ModalButtonGroup>
      </ModalBody>
    </Modal>
  );
};
export default GenerateNewSolutionModal;
