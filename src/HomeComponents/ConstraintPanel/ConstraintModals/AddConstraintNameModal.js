import { currentConstraintActions } from "../../../store/currentConstraint";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import Modal from "react-modal";
import { modal_content } from "../../../style-utils/modalContent";
import {
  ModalBody,
  ModalButton,
  ModalLabel,
  ModalTitle,
  ModalButtonGroup,
  NameInputField,
} from "./ConstraintModalComponents";
import { constraintFlowActions } from "../../../store/constraintFlow";
import { NotificationManager } from "react-notifications";

const AddConstraintNameModal = ({
  isModalOpen,
  setIsModalOpen,
  newConstraint = undefined,
  isSoft = false,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { hardConstraints, softConstraints } = useSelector(
    (state) => state.constraints
  );

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalRef = useRef();
  const newConstraintNameRef = useRef();

  const goToNewConstraintCreation = () => {
    const name = newConstraintNameRef.current.value;
    if (!name) {
      NotificationManager.error(
        "Constraint must have a name to continue!",
        "Error"
      );
      return;
    }
    const isAlready =
      hardConstraints.some((c) => c.name === name) ||
      softConstraints.some((c) => c.name === name);
    if (isAlready) {
      NotificationManager.error("Name already exists!", "Error");
      return;
    }
    dispatch(constraintFlowActions.setName(name));
    if (isSoft) dispatch(constraintFlowActions.setType("soft"));
    if (newConstraint)
      dispatch(constraintFlowActions.setNewConstraint(newConstraint));
    navigate("/new-constraint");
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
        <ModalTitle>Add Constraint</ModalTitle>
        <ModalLabel>Name</ModalLabel>
        <NameInputField placeholder="Enter name" ref={newConstraintNameRef} />
        <ModalButtonGroup>
          <ModalButton onClick={closeModal}>Close</ModalButton>
          <ModalButton onClick={goToNewConstraintCreation}>
            Continue
          </ModalButton>
        </ModalButtonGroup>
      </ModalBody>
    </Modal>
  );
};

export default AddConstraintNameModal;

// dispatch(currentConstraintActions.setNewConstraintName(name));
// dispatch(currentConstraintActions.setNewConstraint(newConstraint));
