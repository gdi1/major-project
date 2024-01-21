import { currentConstraintActions } from "../store/currentConstraint";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import Modal from "react-modal";
import { modal_content } from "../style-utils/modalContent";
import { constraintsActions } from "../store/constraints";
import {
  ModalBody,
  ModalButton,
  ModalLabel,
  ModalTitle,
  ModalButtonGroup,
  NewConstraintNameInputField,
} from "./ConstraintModalComponents";

const EditConstraintModal = ({ isModalOpen, setIsModalOpen, editInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { index, type, constraint } = editInfo;
  const { hardConstraints, softConstraints } = useSelector(
    (state) => state.constraints
  );

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalRef = useRef();
  const editConstraintNameRef = useRef();

  const changeName = () => {
    const name = editConstraintNameRef.current.value;
    if (!name) {
      alert("New name mustn't be empty!");
      return false;
    }
    const isAlready =
      constraint.name !== name &&
      (hardConstraints.some((c) => c.name === name) ||
        softConstraints.some((c) => c.name === name));
    if (isAlready) {
      alert("Name already exists!");
      return false;
    }
    dispatch(constraintsActions.changeName({ index, type, name }));
    return true;
  };

  const continueToEditConstraint = () => {
    if (!changeName()) return;
    dispatch(
      currentConstraintActions.setCurrentConstraint({
        ...constraint,
        name: editConstraintNameRef.current.value,
      })
    );
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
        <ModalButton
          style={{ alignSelf: "end", width: "auto" }}
          onClick={closeModal}
        >
          Remove
        </ModalButton>
        <ModalTitle>Edit Constraint</ModalTitle>
        <ModalLabel>Name</ModalLabel>
        <NewConstraintNameInputField
          defaultValue={constraint ? constraint.name : ""}
          ref={editConstraintNameRef}
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
