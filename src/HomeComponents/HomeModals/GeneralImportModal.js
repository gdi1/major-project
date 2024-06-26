import {
  ModalTitle,
  ModalButton,
  ModalBody,
  ModalButtonGroup,
  CenteredModalLabel,
} from "../../GeneralComponents/ModalComponents";
import { modal_content } from "../../style-utils/modalContent";
import Modal from "react-modal";
import { useRef, useState } from "react";
import { NotificationManager } from "react-notifications";
import { formatNtf } from "../../Utilities/NotificationWrapper";
import InputField from "../../GeneralComponents/InputField";
import { solutionActions } from "../../store/solution";
import { configurationsActions } from "../../store/configurations";
import { snapshotsHistoryActions } from "../../store/snapshotsHistory";
import { useDispatch } from "react-redux";

const GeneralImportModal = ({ isModalOpen, setIsModalOpen }) => {
  const modalRef = useRef();
  const [jsonImportFile, setJsonImportFile] = useState(undefined);
  const dispatch = useDispatch();

  const closeModal = () => setIsModalOpen(false);

  const importFile = () => {
    if (jsonImportFile === undefined) {
      NotificationManager.error(
        ...formatNtf("Must upload a file first!", "Error")
      );
      return;
    }
    const isEverythingExport = jsonImportFile.snapshots ? true : false;
    if (isEverythingExport) {
      const { internalState, snapshots, solution } = jsonImportFile;
      dispatch(configurationsActions.setState(internalState));
      dispatch(solutionActions.setState(solution));
      dispatch(snapshotsHistoryActions.setSnapshots(snapshots));
    } else {
      const { internalState, solution } = jsonImportFile.snapshot;
      dispatch(configurationsActions.setState(internalState));
      dispatch(solutionActions.setState(solution));
    }
    NotificationManager.success(
      ...formatNtf(
        `Successfully imported external${
          isEverythingExport
            ? "project"
            : `snapshot ${jsonImportFile.snapshot.name}`
        }!`,
        "Success"
      )
    );
    closeModal();
  };

  /**
   *
   * References
   *
   * “Using the Filereader API to Preview Images in React.” LogRocket Blog, n.d.
   * https://blog.logrocket.com/using-filereader-api-preview-images-react/.
   *
   * JSFiddle, JSFiddle, n.d., https://jsfiddle.net/Noitidart/zTe4j/3/.
   */
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        setJsonImportFile(data);
      } catch (error) {
        NotificationManager.error(
          ...formatNtf(
            "Error uploading file. Make sure it is a properly formatted JSON file.",
            "Error"
          )
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
