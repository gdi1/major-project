import { useSelector, useDispatch } from "react-redux";
import SelectionPanel from "../ConstraintComponents/SelectionPanel/SelectionPanel";
import { ColumnContainer, RowContainer } from "../GeneralComponents/Containers";
import Title from "../GeneralComponents/Title";
import GeneralButton from "../GeneralComponents/GeneralButton";
import { configurationsActions } from "../store/configurations";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Label } from "../GeneralComponents/Labels";
import ConstraintFlowPanel from "../ConstraintComponents/ConstraintCreationBoard/ConstraintFlowPanel";
import { ReactFlowProvider } from "reactflow";
import { constraintFlowActions } from "../store/constraintFlow";
import { NotificationManager } from "react-notifications";
import { formatNtf } from "../Utilities/NotificationWrapper";
import gaps from "../style-utils/gaps";
import margins from "../style-utils/margins";
import colors from "../style-utils/colors";
import text_styles from "../style-utils/text_styles";

const operators = ["and", "or"];
const types = [
  "teams",
  "locations",
  "periods",
  "weeks",
  "not-play-against",
  "play-against",
];
const verbs = ["play", "not-play", "play-against", "not-play-against"];

const ConstraintCreationScreen = () => {
  const { nodes, edges, name, type, mode } = useSelector((state) => state.flow);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedNode } = useSelector((state) => state.flow);
  console.log(selectedNode);

  const title = mode === "new" ? "New Constraint" : "Edit Constraint";
  const actionButtonTitle = mode === "new" ? "Add" : "Done Editing";

  const addNewFlowConstraint = () => {
    if (nodes.length !== edges.length + 1) {
      NotificationManager.error(
        ...formatNtf("The constraint is not tree shaped!", "Error")
      );
      return;
    }
    if (nodes.length === 1) {
      const types = Object.keys(nodes[0].data.types);
      if (types.some((type) => operators.includes(type))) {
        NotificationManager.error(
          ...formatNtf("The only node can't be an operator node!", "Error")
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

    const eachNonLeafNodesWithAtLeastTwoChildren = nodes.every((node) => {
      const nodeTypes = Object.keys(node.data.types);
      if (nodeTypes.some((type) => operators.includes(type)))
        return edges.filter((edge) => edge.source === node.id).length >= 2;
      return true;
    });

    const atLeastOneLeafNode = nodes.some((node) => {
      const nodeTypes = Object.keys(node.data.types);
      return nodeTypes.some((type) => types.includes(type));
    });

    const allFrequencyBlockIsNonnegative = nodes.every((node) => {
      const nodeTypes = Object.keys(node.data.types);
      return nodeTypes.every((type) =>
        type === "at-least" || type === "at-most"
          ? node.data.types[type][0].value !== "" &&
            node.data.types[type][0].value > 0
          : true
      );
    });

    if (!allLeafNodesNonEmpty) {
      NotificationManager.error(
        ...formatNtf(
          "You must select at least one option for each multi select block!",
          "Error"
        )
      );
      return;
    }
    if (!allNodesEitherNonLeafOrLeafWithTeamsAndVerb) {
      NotificationManager.error(
        ...formatNtf(
          "Non-leaf nodes must be either AND or OR.\nLeaf nodes must contain both a 'Teams' and a Verb block.",
          "Error"
        )
      );
      return;
    }
    if (!atLeastOneLeafNode) {
      NotificationManager.error(
        ...formatNtf(
          "At least one node must not be an AND or OR node.",
          "Error"
        )
      );
      return;
    }

    if (!allFrequencyBlockIsNonnegative) {
      NotificationManager.error(
        ...formatNtf(
          "All 'at least' or 'at most' blocks' must have a non-negative value",
          "Error"
        )
      );
      return;
    }

    if (!eachNonLeafNodesWithAtLeastTwoChildren) {
      NotificationManager.error(
        ...formatNtf(
          "Each non-leaf node must have at least two children.",
          "Error"
        )
      );
      return;
    }

    dispatch(
      configurationsActions.addNewFlowConstraint({ name, type, nodes, edges })
    );
    dispatch(constraintFlowActions.resetConstraintFlow());
    NotificationManager.success(
      ...formatNtf(
        `Successfully ${
          mode === "new" ? "added new" : "edited"
        } constraint ${name}`,
        "Success"
      )
    );
    navigate("/");
  };

  const goBackAction = () => {
    dispatch(constraintFlowActions.resetConstraintFlow());
    navigate("/");
  };

  const handleConstraintTypeChange = (e) => {
    const newType = e.target.value;
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
        <ConstraintName>
          Name:
          <span style={{ fontSize: `${text_styles.fonts.small}` }}>{name}</span>
        </ConstraintName>
        {mode === "new" && (
          <TypeSelection>
            <Label>Type: </Label>
            <TypeSelectComponent
              value={type}
              onChange={handleConstraintTypeChange}
            >
              <option value="hard">Hard</option>
              <option value="soft">Soft</option>
            </TypeSelectComponent>
          </TypeSelection>
        )}
      </PageSubHeader>
      <PageBody>
        <SelectionPanel />
        <ReactFlowProvider>
          <ConstraintFlowPanel />
        </ReactFlowProvider>
      </PageBody>
    </ConstraintCreationPage>
  );
};

const TypeSelectComponent = styled.select`
  background-color: ${colors.beige};
  font-size: ${text_styles.fonts.small};
  font-family: ${text_styles.styles.fontFamily};
  font-weight: bold;
  border-radius: 0.2vw;
`;

const PageHeader = styled(RowContainer)`
  justify-content: space-between;
`;

const PageSubHeader = styled(RowContainer)`
  justify-content: start;

  width: 100%;
  gap: ${gaps.small_med};
  margin-bottom: ${margins.xxsmall};
`;

const PageBody = styled(RowContainer)`
  justify-content: start;
  gap: ${gaps.small};
  height: 85vh;
`;

const TypeSelection = styled(RowContainer)`
  justify-content: center;
  align-items: center;
  width: auto;
`;

const ConstraintName = styled(Label)`
  width: auto;
`;

const ConstraintCreationPage = styled(ColumnContainer)`
  background-color: ${colors.beige};
  height: 98vh;
`;

const ButtonGroup = styled(RowContainer)`
  width: auto;
  gap: ${gaps.small};
`;

export default ConstraintCreationScreen;
