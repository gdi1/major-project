import { currentConstraintActions } from "../store/currentConstraint";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { Container } from "../GeneralComponents/Containers";
import Title from "../GeneralComponents/Title";
import { Label } from "../GeneralComponents/Labels";
import InputField from "../GeneralComponents/InputField";
import GeneralButton from "../GeneralComponents/GeneralButton";
import Modal from "react-modal";
import { modal_content } from "../style-utils/modalContent";
import { constraintsActions } from "../store/constraints";

const EditConstraintModal = ({ isModalOpen, setIsModalOpen, editInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { index, type, constraint } = editInfo;
  const { hardConstraints, softConstraints } = useSelector(
    (state) => state.constraints
  );
  console.log(constraint);

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
      <Container flexDirection={"column"} gap={"10px"}>
        <Title style={{ borderBottom: "1px solid black" }}>
          Edit Constraint
        </Title>
        <Label style={{ alignSelf: "start" }}>Name</Label>
        <InputField
          style={{ width: "100%", height: "40px", fontSize: "20px" }}
          defaultValue={constraint ? constraint.name : ""}
          ref={editConstraintNameRef}
        />
        <Container justifyContent={"space-evenly"}>
          <GeneralButton style={{ width: "45%" }} onClick={closeModal}>
            Close
          </GeneralButton>
          <GeneralButton
            style={{ width: "45%" }}
            onClick={() => {
              if (changeName()) closeModal();
            }}
          >
            Done
          </GeneralButton>
          <GeneralButton
            style={{ width: "45%" }}
            onClick={continueToEditConstraint}
          >
            Continue
          </GeneralButton>
        </Container>
      </Container>
    </Modal>
  );
};

export default EditConstraintModal;
