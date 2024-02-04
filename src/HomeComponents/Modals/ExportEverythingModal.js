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
import { useSelector, useDispatch } from "react-redux";
import { exportJSON } from "../../Utilities/ExportingFunction";
import { NotificationManager } from "react-notifications";

const ExportEverythingModal = ({ isModalOpen, setIsModalOpen }) => {
  const modalRef = useRef();
  const internalState = useSelector((state) => state.constraints);
  const { snapshots } = useSelector((state) => state.snapshotsHistory);
  const solution = useSelector((state) => state.solution);

  const closeModal = () => setIsModalOpen(false);

  const exportEverything = () => {
    exportJSON({ internalState, snapshots, solution });
    NotificationManager.success(`Successfully exported everthing!`, "Success");
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
        <ModalTitle>Export everything</ModalTitle>
        <CenteredModalLabel>
          This operation will export the application's entire state including
          all its saved snapshots.
        </CenteredModalLabel>
        <CenteredModalLabel>Do you want to continue?</CenteredModalLabel>
        <ModalButtonGroup>
          <ModalButton onClick={closeModal}>Close</ModalButton>
          <ModalButton onClick={exportEverything}>Continue</ModalButton>
        </ModalButtonGroup>
      </ModalBody>
    </Modal>
  );
};
export default ExportEverythingModal;