import { useOnSelectionChange } from "reactflow";
import { constraintFlowActions } from "../../store/constraintFlow";
import { useDispatch } from "react-redux";

const NodeSelection = () => {
  const dispatch = useDispatch();
  useOnSelectionChange({
    onChange: ({ nodes, edges }) => {
      console.log("nodes", nodes);
      dispatch(
        constraintFlowActions.setSelectedNode(
          nodes.length > 0 ? nodes[nodes.length - 1].id : undefined
        )
      );
    },
  });
  return;
};
export default NodeSelection;
