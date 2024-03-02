import Modal from "react-modal";
import { modal_content } from "../../../style-utils/modalContent";
import {
  ModalBody,
  ModalButton,
  ModalTitle,
  ModalButtonGroup,
  CenteredModalLabel,
} from "../../../GeneralComponents/ModalComponents";
import { useRef } from "react";

const ConstraintsInfoCardModal = ({ isModalOpen, setIsModalOpen }) => {
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const modalRef = useRef();

  return (
    <Modal
      ariaHideApp={false}
      ref={modalRef}
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={{
        content: { ...modal_content.content, width: "40%" },
        overlay: { ...modal_content.overlay },
      }}
    >
      <ModalBody>
        <ModalTitle>Constraints Info Card</ModalTitle>
        <CenteredModalLabel>
          Soft constraints can be violated by the solver when it cannot find a
          solution satisfying all requirements.
        </CenteredModalLabel>
        <CenteredModalLabel>
          The soft constraints will be violated based on their ordering in a
          bottom-up manner.
        </CenteredModalLabel>
        <ModalButtonGroup>
          <ModalButton onClick={closeModal}>Close</ModalButton>
        </ModalButtonGroup>
      </ModalBody>
    </Modal>
  );
};

export default ConstraintsInfoCardModal;
