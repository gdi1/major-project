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
import { constraintFlowActions } from "../store/constraintFlow";
import { NotificationManager } from "react-notifications";

const operators = ["and", "or"];
const types = [
  "teams",
  "locations",
  "periods",
  "weeks",
  "not-play-against",
  "play-against",
];
const verbs = ["play", "not play", "play-against", "not-play-against"];

const ConstraintCreationScreen = () => {
  // const { constraintLists, name, mode, type } = useSelector(
  //   (state) => state.currentConstraint
  // );
  const { nodes, edges, name, type, mode } = useSelector((state) => state.flow);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const title = mode === "new" ? "New Constraint" : "Edit Constraint";
  const actionButtonTitle = mode === "new" ? "Add" : "Done Editing";

  // const addNewConstraint = () => {
  //   console.log("here");
  //   dispatch(
  //     constraintsActions.addNewConstraint({
  //       name,
  //       type,
  //       constraintLists,
  //       // constraint: new ConstraintIterator(constraintLists).parseConstraint(),
  //     })
  //   );
  //   dispatch(currentConstraintActions.resetCurrentConstraint());
  //   navigate("/");
  // };

  const addNewFlowConstraint = () => {
    if (nodes.length !== edges.length + 1) {
      NotificationManager.error("The constraint is not tree shaped!", "Error");
      return;
    }
    if (nodes.length === 1) {
      const types = Object.keys(nodes[0].data.types);
      if (types.some((type) => operators.includes(type))) {
        NotificationManager.error(
          "The only node can't be an operator node!",
          "Error"
        );
        return;
      }
    }
    const allLeafNodesNonEmpty = nodes.every((node) =>
      types.every(
        (cur) =>
          node.data.types[cur] === undefined || node.data.types[cur].length > 0
      )
    );
    const allNodesEitherNonLeafOrLeafWithTeamsAndVerb = nodes.every((node) => {
      const nodeTypes = Object.keys(node.data.types);
      return (
        nodeTypes.some((type) => operators.includes(type)) ||
        (nodeTypes.includes("teams") &&
          nodeTypes.some((type) => verbs.includes(type)))
      );
    });
    const atLeastOneLeafNode = nodes.some((node) => {
      const nodeTypes = Object.keys(node.data.types);
      return nodeTypes.some((type) => types.includes(type));
    });

    if (!allLeafNodesNonEmpty) {
      // alert("allLeafNodesNonEmpty is not right!");
      NotificationManager.error(
        "You must select at least one option for each multi select block!",
        "Error"
      );
      return;
    }
    if (!allNodesEitherNonLeafOrLeafWithTeamsAndVerb) {
      // alert("allNodesEitherNonLeafOrLeafWithTeamsAndVerb is not right!");
      NotificationManager.error(
        "Non leaf nodes must be either AND or OR, leaf nodes must contain 'Teams' and a verb at least.",
        "Error"
      );
      return;
    }
    if (!atLeastOneLeafNode) {
      // alert("atLeastOneLeafNode is not right!");
      NotificationManager.error(
        "At least one node must not be an AND or OR node.",
        "Error"
      );
      return;
    }
    dispatch(
      constraintsActions.addNewFlowConstraint({ name, type, nodes, edges })
    );
    dispatch(constraintFlowActions.resetConstraintFlow());
    NotificationManager.success(
      `Successfully ${
        mode === "new" ? "added new" : "edited"
      } constraint ${name}`,
      "Success"
    );
    navigate("/");
  };

  const goBackAction = () => {
    dispatch(constraintFlowActions.resetConstraintFlow());
    navigate("/");
  };

  const handleConstraintTypeChange = (e) => {
    const newType = e.target.value;
    console.log(newType);
    // dispatch(currentConstraintActions.setType(newType));
    dispatch(constraintFlowActions.setType(newType));
  };

  return (
    <ConstraintCreationPage>
      <PageHeader>
        <div></div>
        <Title>{title}</Title>
        <ButtonGroup>
          <GeneralButton onClick={goBackAction}>Back</GeneralButton>
          <GeneralButton onClick={addNewFlowConstraint}>
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

// () => {
//   dispatch(currentConstraintActions.resetCurrentConstraint());
//   navigate("/");
// }

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
