import { useSelector, useDispatch } from "react-redux";
import SelectionPanel from "../ConstraintComponents/SelectionPanel";
import PreviewPanel from "../ConstraintComponents/PreviewPanel";
import {
  ColumnContainer,
  Container,
  RowContainer,
} from "../GeneralComponents/Containers";
import Title from "../GeneralComponents/Title";
import GeneralButton from "../GeneralComponents/GeneralButton";
import { constraintsActions } from "../store/constraints";
import ConstraintIterator from "../Utilities/ConstraintIterator";
import { useNavigate } from "react-router-dom";
import { currentConstraintActions } from "../store/currentConstraint";
import styled from "styled-components";

const ConstraintCreationScreen = () => {
  const { constraintLists, name, mode } = useSelector(
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
        constraintLists,
        // constraint: new ConstraintIterator(constraintLists).parseConstraint(),
      })
    );
    dispatch(currentConstraintActions.resetCurrentConstraint());
    navigate("/");
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
      <PageBody>
        <SelectionPanel />
        <PreviewPanel />
      </PageBody>
    </ConstraintCreationPage>
  );
};

const ConstraintCreationPage = styled(ColumnContainer)``;
const PageHeader = styled(RowContainer)`
  justify-content: space-between;
`;
const ButtonGroup = styled(RowContainer)`
  width: auto;
`;
const PageBody = styled(RowContainer)`
  jsutify-content: space-evenly;
`;

export default ConstraintCreationScreen;
