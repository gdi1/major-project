import { useSelector, useDispatch } from "react-redux";
import SelectionPanel from "../ConstraintComponents/SelectionPanel";
import PreviewPanel from "../ConstraintComponents/PreviewPanel";
import Container from "../GeneralComponents/Container";
import Title from "../GeneralComponents/Title";
import GeneralButton from "../GeneralComponents/GeneralButton";

const ConstraintCreationScreen = () => {
  const { constraintLists } = useSelector((state) => state.currentConstraint);
  const dispatch = useDispatch();

  const addNewConstraint = () => {};

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
