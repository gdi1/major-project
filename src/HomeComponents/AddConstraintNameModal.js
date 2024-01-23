import { currentConstraintActions } from "../store/currentConstraint";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import Modal from "react-modal";
import { modal_content } from "../style-utils/modalContent";
import {
  ModalBody,
  ModalButton,
  ModalLabel,
  ModalTitle,
  ModalButtonGroup,
  NewConstraintNameInputField,
} from "./ConstraintModalComponents";
import { constraintFlowActions } from "../store/constraintFlow";

const AddConstraintNameModal = ({
  isModalOpen,
  setIsModalOpen,
  newConstraint = undefined,
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
      alert("Must enter a name to continue!");
      return;
    }
    const isAlready =
      hardConstraints.some((c) => c.name === name) ||
      softConstraints.some((c) => c.name === name);
    if (isAlready) {
      alert("Name already exists!");
      return;
    }
    // dispatch(currentConstraintActions.setNewConstraintName(name));
    dispatch(constraintFlowActions.setName(name));
    if (newConstraint)
      dispatch(constraintFlowActions.setNewConstraint(newConstraint));
    // dispatch(currentConstraintActions.setNewConstraint(newConstraint));
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
        <NewConstraintNameInputField
          placeholder="Enter name"
          ref={newConstraintNameRef}
        />
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
