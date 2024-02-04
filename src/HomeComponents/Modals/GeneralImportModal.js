import {
  ModalTitle,
  ModalButton,
  ModalBody,
  ModalButtonGroup,
  CenteredModalLabel,
} from "../ConstraintPanel/ConstraintModals/ConstraintModalComponents";
import { modal_content } from "../../style-utils/modalContent";
import Modal from "react-modal";
import { useRef, useState } from "react";
import { NotificationManager } from "react-notifications";
import InputField from "../../GeneralComponents/InputField";
import { solutionActions } from "../../store/solution";
import { constraintsActions } from "../../store/constraints";
import { snapshotsHistoryActions } from "../../store/snapshotsHistory";
import { useDispatch } from "react-redux";

const GeneralImportModal = ({ isModalOpen, setIsModalOpen }) => {
  const modalRef = useRef();
  const [jsonFile, setJsonFile] = useState(undefined);
  const dispatch = useDispatch();

  const closeModal = () => setIsModalOpen(false);

  const importFile = () => {
    console.log(jsonFile);
    if (jsonFile === undefined) {
      NotificationManager.error("Must upload a file first!", "Error");
      return;
    }
    const isEverythingExport = jsonFile.snapshots ? true : false;
    if (isEverythingExport) {
      const { internalState, snapshots, solution } = jsonFile;
      dispatch(constraintsActions.setState(internalState));
      dispatch(solutionActions.setState(solution));
      dispatch(snapshotsHistoryActions.setSnapshots(snapshots));
    } else {
      const { internalState, solution } = jsonFile.snapshot;
      dispatch(constraintsActions.setState(internalState));
      dispatch(solutionActions.setState(solution));
    }
    NotificationManager.success(
      `Successfully imported ${
        isEverythingExport
          ? "everything"
          : `external snapshot ${jsonFile.snapshot.name}`
      }!`,
      "Success"
    );
    closeModal();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        setJsonFile(data);
      } catch (error) {
        NotificationManager.error(
          "Error uploading file. Make sure it is a properly formatted JSON file.",
          "Error"
        );
      }
    };
    reader.readAsText(file);
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
        <ModalTitle>General Import</ModalTitle>
        <CenteredModalLabel>
          Import either a saved snapshot, or an entire application state.
        </CenteredModalLabel>
        <InputField type={"file"} onChange={handleFileUpload} />
        <CenteredModalLabel>
          This action is going to override the current state of the application.
          Are you sure you want to continue?
        </CenteredModalLabel>
        <ModalButtonGroup>
          <ModalButton onClick={closeModal}>Close</ModalButton>
          <ModalButton onClick={importFile}>Continue</ModalButton>
        </ModalButtonGroup>
      </ModalBody>
    </Modal>
  );
};
export default GeneralImportModal;
