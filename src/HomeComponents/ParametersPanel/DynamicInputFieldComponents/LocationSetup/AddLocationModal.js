import { useRef } from "react";
import Title from "../../../../GeneralComponents/Title";
import GeneralButton from "../../../../GeneralComponents/GeneralButton";
import Modal from "react-modal";
import { modal_content } from "../../../../style-utils/modalContent";
import Map from "./Map";
import "leaflet/dist/leaflet.css";
import { CenteredModalLabel } from "../../../../GeneralComponents/ModalComponents";
import margins from "../../../../style-utils/margins";

const AddLocationModal = ({ isModalOpen, setIsModalOpen }) => {
  const { content, overlay } = modal_content;
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
      style={{ content: { ...content, width: "80%", height: "80%" }, overlay }}
    >
      <GeneralButton
        onClick={() => setIsModalOpen(false)}
        style={{ alignSelf: "end" }}
      >
        Close
      </GeneralButton>
      <Title style={{ alignSelf: "center" }}>Choose location</Title>
      <CenteredModalLabel style={{ marginBottom: `${margins.xsmall}` }}>
        Use the search bar to look up locations or click on the map to place a
        marker.
      </CenteredModalLabel>
      <Map />
    </Modal>
  );
};

export default AddLocationModal;
