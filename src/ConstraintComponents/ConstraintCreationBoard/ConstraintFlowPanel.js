import styled from "styled-components";
import { RowContainer } from "../../GeneralComponents/Containers";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  getOutgoers,
  useReactFlow,
  Controls,
  Background,
} from "reactflow";
import borders from "../../style-utils/borders";
import { useCallback, useMemo } from "react";
import ConstraintNode from "./ConstraintNode";
import NodeSelection from "./NodeSelection";
import { useSelector, useDispatch } from "react-redux";
import { constraintFlowActions } from "../../store/constraintFlow";
import "reactflow/dist/style.css";
import Legend from "./Legend";

/**
 *
 * References
 *
 * “Quickstart – React Flow.” – React Flow, n.d. https://reactflow.dev/learn.
 */

const ConstraintFlowPanel = () => {
  const dispatch = useDispatch();
  const nodeTypes = useMemo(() => ({ ConstraintNode: ConstraintNode }), []);

  const { nodes, edges } = useSelector((state) => state.flow);
  const { getNodes, getEdges } = useReactFlow();

  const onNodesChange = useCallback(
    (changes) => {
      dispatch(
        constraintFlowActions.setNodes(applyNodeChanges(changes, nodes))
      );
    },
    [nodes, dispatch]
  );
  const onEdgesChange = useCallback(
    (changes) => {
      dispatch(
        constraintFlowActions.setEdges(applyEdgeChanges(changes, edges))
      );
    },
    [edges, dispatch]
  );

  const onConnect = useCallback(
    (connection) => {
      dispatch(constraintFlowActions.setEdges(addEdge(connection, edges)));
    },
    [edges, dispatch]
  );

  /**
   * References
   *
   * “React Flow – React Flow.” React Flow – React Flow, n.d.
   * https://reactflow.dev/examples/interaction/prevent-cycles.
   */
  const isValidConnection = useCallback(
    (connection) => {
      const nodes = getNodes();
      const edges = getEdges();
      if (edges.map((edge) => edge.target).includes(connection.target))
        return false;

      const target = nodes.find((node) => node.id === connection.target);
      const hasCycle = (node, visited = new Set()) => {
        if (visited.has(node.id)) return false;

        visited.add(node.id);

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true;
          if (hasCycle(outgoer, visited)) return true;
        }
      };

      if (target.id === connection.source) return false;
      return !hasCycle(target);
    },
    [getNodes, getEdges, edges]
  );

  return (
    <ConstraintFlow>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        isValidConnection={isValidConnection}
        fitViewOptions={{ padding: 3 }}
        fitView
        zoomOnPinch={false}
        zoomOnScroll={false}
        preventScrolling={false}
        onInit={() => dispatch(constraintFlowActions.focusRootNode())}
      >
        <NodeSelection />
        <Background gap={16} />
        <Controls />
        <Legend />
      </ReactFlow>
    </ConstraintFlow>
  );
};

export default ConstraintFlowPanel;

const ConstraintFlow = styled(RowContainer)`
  border: ${borders.small};
  box-sizing: border-box;
  height: 85vh;
`;
