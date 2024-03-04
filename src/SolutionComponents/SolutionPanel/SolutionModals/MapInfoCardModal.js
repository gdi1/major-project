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

const MapInfoCardModal = ({ isModalOpen, setIsModalOpen }) => {
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
        <ModalTitle>Map Info Card</ModalTitle>
        <CenteredModalLabel>
          If the animation speed is modified while the animaion is ongoing, then
          the new speed will be visible from the next marker onwards, relative
          to the position of the team icon.
        </CenteredModalLabel>
        <ModalButtonGroup>
          <ModalButton onClick={closeModal}>Close</ModalButton>
        </ModalButtonGroup>
      </ModalBody>
    </Modal>
  );
};

export default MapInfoCardModal;
