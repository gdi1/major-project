import { useOnSelectionChange } from "reactflow";
import { useState } from "react";
import { constraintFlowActions } from "../store/constraintFlow";
import { useDispatch } from "react-redux";

const NodeSelection = () => {
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [selectedEdges, setSelectedEdges] = useState([]);
  const dispatch = useDispatch();

  useOnSelectionChange({
    onChange: ({ nodes, edges }) => {
      dispatch(
        constraintFlowActions.setSelectedNode(
          nodes.length > 0 ? nodes[nodes.length - 1].id : undefined
        )
      );
      setSelectedNodes(nodes.map((node) => node.id));
      setSelectedEdges(edges.map((edge) => edge.id));
    },
  });

  // return (
  //   <div>
  //     <p>Selected nodes: {selectedNodes.join(", ")}</p>
  //     <p>Selected edges: {selectedEdges.join(", ")}</p>
  //   </div>
  // );
  return;
};
export default NodeSelection;
