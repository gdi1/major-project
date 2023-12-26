import { useSelector, useDispatch } from "react-redux";
import SelectionPanel from "../ConstraintComponents/SelectionPanel";
import PreviewPanel from "../ConstraintComponents/PreviewPanel";
import Container from "../GeneralComponents/Container";
import Title from "../GeneralComponents/Title";
import GeneralButton from "../GeneralComponents/GeneralButton";
import { constraintsActions } from "../store/constraints";
import ConstraintIterator from "../Utilities/ConstraintIterator";
import { useNavigate } from "react-router-dom";
import { currentConstraintActions } from "../store/currentConstraint";

const ConstraintCreationScreen = () => {
  const { constraintLists, name } = useSelector(
    (state) => state.currentConstraint
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addNewConstraint = () => {
    dispatch(
      constraintsActions.addNewConstraint({
        name,
        constraintLists,
        // constraint: new ConstraintIterator(constraintLists).parseConstraint(),
      })
    );
    dispatch(currentConstraintActions.resetCurrentConstraint());
    navigate("/");
  };

  return (
    <Container flexDirection={"column"}>
      <Container justifyContent={"space-between"}>
        <div></div>
        <Title>New Constraint</Title>
        <GeneralButton onClick={addNewConstraint}>Add</GeneralButton>
      </Container>
      <Container justifyContent={"space-evenly"}>
        <SelectionPanel />
        <PreviewPanel />
      </Container>
    </Container>
  );
};

export default ConstraintCreationScreen;
