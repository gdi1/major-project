import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import Modal from "react-modal";
import { modal_content } from "../../../style-utils/modalContent";
import { constraintsActions } from "../../../store/constraints";
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
      // alert("New name mustn't be empty!");
      NotificationManager.error("New name mustn't be empty!", "Error");
      return false;
    }
    const isAlready =
      constraint.name !== name &&
      (hardConstraints.some((c) => c.name === name) ||
        softConstraints.some((c) => c.name === name));
    if (isAlready) {
      // alert("Name already exists!");
      NotificationManager.error("Name already exists!", "Error");
      return false;
    }
    dispatch(constraintsActions.changeName({ index, type, name }));
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
    // dispatch(
    //   currentConstraintActions.setCurrentConstraint({
    //     ...constraint,
    //     name: editConstraintNameRef.current.value,
    //   })
    // );
    navigate("/new-constraint");
  };

  const removeConstraint = () => {
    dispatch(constraintsActions.removeConstraint({ index, type }));
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
        <ModalTitle>Edit Constraint</ModalTitle>
        <ModalLabel>Name</ModalLabel>
        <NameInputField
          defaultValue={constraint ? constraint.name : ""}
          ref={editConstraintNameRef}
        />
        <ModalButtonGroup>
          <ModalButton
            onClick={() => {
              if (changeName()) {
                NotificationManager.success(
                  "Successfully changed name",
                  "Success"
                );
                closeModal();
              }
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
