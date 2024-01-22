import { useSelector, useDispatch } from "react-redux";
import SelectionPanel from "../ConstraintComponents/SelectionPanel";
import PreviewPanel from "../ConstraintComponents/PreviewPanel";
import { ColumnContainer, RowContainer } from "../GeneralComponents/Containers";
import Title from "../GeneralComponents/Title";
import GeneralButton from "../GeneralComponents/GeneralButton";
import { constraintsActions } from "../store/constraints";
import ConstraintIterator from "../Utilities/ConstraintIterator";
import { useNavigate } from "react-router-dom";
import { currentConstraintActions } from "../store/currentConstraint";
import styled from "styled-components";
import { Label } from "../GeneralComponents/Labels";
import ConstraintFlowPanel from "../ConstraintComponents/ConstraintFlowPanel";
import { ReactFlowProvider } from "reactflow";

const ConstraintCreationScreen = () => {
  const { constraintLists, name, mode, type } = useSelector(
    (state) => state.currentConstraint
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const title = mode === "new" ? "New Constraint" : "Edit Constraint";
  const actionButtonTitle = mode === "new" ? "Add" : "Done Editing";

  const addNewConstraint = () => {
    console.log("here");
    dispatch(
      constraintsActions.addNewConstraint({
        name,
        type,
        constraintLists,
        // constraint: new ConstraintIterator(constraintLists).parseConstraint(),
      })
    );
    dispatch(currentConstraintActions.resetCurrentConstraint());
    navigate("/");
  };

  const handleConstraintTypeChange = (e) => {
    const newType = e.target.value;
    console.log(newType);
    dispatch(currentConstraintActions.setType(newType));
  };

  return (
    <ConstraintCreationPage>
      <PageHeader>
        <div></div>
        <Title>{title}</Title>
        <ButtonGroup>
          <GeneralButton
            onClick={() => {
              dispatch(currentConstraintActions.resetCurrentConstraint());
              navigate("/");
            }}
          >
            Back
          </GeneralButton>
          <GeneralButton onClick={addNewConstraint}>
            {actionButtonTitle}
          </GeneralButton>
        </ButtonGroup>
      </PageHeader>
      <PageSubHeader>
        <ConstraintName> Name: {name}</ConstraintName>
        {mode === "new" && (
          <TypeSelection>
            <Label>Type: </Label>
            <select value={type} onChange={handleConstraintTypeChange}>
              <option value="hard">Hard</option>
              <option value="soft">Soft</option>
            </select>
          </TypeSelection>
        )}
      </PageSubHeader>
      <PageBody>
        <SelectionPanel />
        <ReactFlowProvider>
          <ConstraintFlowPanel />
        </ReactFlowProvider>
        {/* <PreviewPanel /> */}
      </PageBody>
    </ConstraintCreationPage>
  );
};

const PageHeader = styled(RowContainer)`
  justify-content: space-between;
`;

const PageSubHeader = styled(RowContainer)`
  justify-content: start;
  align-items: start;
  width: 100%;
  gap: 20px;
`;

const PageBody = styled(RowContainer)`
  justify-content: start;
`;

const TypeSelection = styled(RowContainer)`
  justify-content: center;
  align-items: center;
  width: auto;
`;

const ConstraintName = styled(Label)`
  width: auto;
`;

const ConstraintCreationPage = styled(ColumnContainer)``;

const ButtonGroup = styled(RowContainer)`
  width: auto;
`;

export default ConstraintCreationScreen;
