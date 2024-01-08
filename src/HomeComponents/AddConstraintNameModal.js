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
    dispatch(currentConstraintActions.setNewConstraintName(name));
    if (newConstraint)
      dispatch(currentConstraintActions.setNewConstraint(newConstraint));
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
          Add Constraint
        </Title>
        <Label style={{ alignSelf: "start" }}>Name</Label>
        <InputField
          style={{ width: "100%", height: "40px", fontSize: "20px" }}
          placeholder="Enter name"
          ref={newConstraintNameRef}
        />
        <Container justifyContent={"space-evenly"}>
          <GeneralButton style={{ width: "45%" }} onClick={closeModal}>
            Close
          </GeneralButton>
          <GeneralButton
            style={{ width: "45%" }}
            onClick={goToNewConstraintCreation}
          >
            Continue
          </GeneralButton>
        </Container>
      </Container>
    </Modal>
  );
};

export default AddConstraintNameModal;
