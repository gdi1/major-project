import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import Modal from "react-modal";
import { modal_content } from "../../../style-utils/modalContent";
import { configurationsActions } from "../../../store/configurations";
import {
  ModalBody,
  ModalButton,
  ModalLabel,
  ModalTitle,
  ModalButtonGroup,
  NameInputField,
} from "../../../GeneralComponents/ModalComponents";
import { constraintFlowActions } from "../../../store/constraintFlow";
import { NotificationManager } from "react-notifications";
import { formatNtf } from "../../../Utilities/NotificationWrapper";

const EditConstraintModal = ({ isModalOpen, setIsModalOpen, editInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { index, type, constraint } = editInfo;
  const { hardConstraints, softConstraints } = useSelector(
    (state) => state.configurations
  );

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalRef = useRef();
  const editConstraintNameRef = useRef();

  const changeName = () => {
    const name = editConstraintNameRef.current.value.trim();
    if (!name) {
      NotificationManager.error(
        ...formatNtf("New name mustn't be empty!", "Error")
      );
      return false;
    }
    const isAlready =
      constraint.name !== name &&
      (hardConstraints.some((c) => c.name === name) ||
        softConstraints.some((c) => c.name === name));
    if (isAlready) {
      NotificationManager.error(...formatNtf("Name already exists!", "Error"));
      return false;
    }
    if (constraint.name === name) return true;
    dispatch(configurationsActions.changeName({ index, type, name }));
    NotificationManager.success(
      ...formatNtf("Successfully changed name", "Success")
    );
    return true;
  };

  const continueToEditConstraint = () => {
    if (!changeName()) return;
    dispatch(
      constraintFlowActions.setCurrentConstraint({
        ...constraint,
        name: editConstraintNameRef.current.value,
        type,
      })
    );
    navigate("/new-constraint");
  };

  const handleKeyDown = (e) => {
    if (e.key == "Enter") continueToEditConstraint();
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
        <ModalTitle>Edit Constraint</ModalTitle>
        <ModalLabel>Name</ModalLabel>
        <NameInputField
          defaultValue={constraint ? constraint.name : ""}
          ref={editConstraintNameRef}
          onKeyDown={handleKeyDown}
          autoFocus={true}
        />
        <ModalButtonGroup>
          <ModalButton
            onClick={() => {
              if (changeName()) closeModal();
            }}
          >
            OK
          </ModalButton>
          <ModalButton onClick={continueToEditConstraint}>Continue</ModalButton>
        </ModalButtonGroup>
      </ModalBody>
    </Modal>
  );
};

export default EditConstraintModal;
