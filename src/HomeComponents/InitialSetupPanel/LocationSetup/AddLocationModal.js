import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import Container from "../../../GeneralComponents/Container";
import Title from "../../../GeneralComponents/Title";
import Label from "../../../GeneralComponents/Label";
import InputField from "../../../GeneralComponents/InputField";
import GeneralButton from "../../../GeneralComponents/GeneralButton";
import Modal from "react-modal";
import { modal_content } from "../../../style-utils/modalContent";
import Map from "./Map";
import "leaflet/dist/leaflet.css";

const AddLocationModal = ({ isModalOpen, setIsModalOpen }) => {
  const dispatch = useDispatch();
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
      <Title style={{ alignSelf: "center" }}>Choose location</Title>
      <Map />
      <GeneralButton onClick={() => setIsModalOpen(false)}>Close</GeneralButton>
    </Modal>
  );
};

export default AddLocationModal;
