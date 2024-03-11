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
      >
        <NodeSelection />
        <Background color="#aaa" gap={16} />
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

// height: 6vh;
// height: 87vh;

// const initialNodes = [
//   {
//     id: "1",
//     data: { label: "Input Node" },
//     position: { x: -620.5, y: 34.5 },
//   },
//   {
//     id: "2",
//     // you can also pass a React component as a label
//     style: { height: "200px" },
//     data: {
//       label: (
//         <div>
//           Default Node
//           <MultiSelect
//             className="nodrag"
//             options={[
//               { value: 1, label: "1" },
//               { value: 2, label: "2" },
//             ]}
//             onClick={() => console.log("Hello")}
//             onChange={() => {}}
//           />
//         </div>
//       ),
//     },
//     position: { x: 100, y: 125 },
//   },
//   {
//     id: "3",
//     type: "output",
//     data: { label: "Output Node" },
//     position: { x: 250, y: 250 },
//   },
//   {
//     id: "4",
//     type: "customnode",
//     position: { x: 300, y: 300 },
//     data: { types: ["teams", "weeks", "locations"] },
//   },
// ];

// const initialEdges = [
//   { id: "e1-2", source: "1", target: "2" },
//   { id: "e2-3", source: "2", target: "3" },
// ];

// const addNewNode = () => {
//   console.log("hello");
//   setNodes((nds) => [
//     ...nds,
//     {
//       id: `${cnt}`,
//       data: { label: `Node ${cnt}` },
//       position: { x: nds[0].position.x, y: nds[0].position.y + 10 },
//     },
//   ]);
//   setEdges((eds) => [
//     ...eds,
//     { id: `e1-${cnt}`, source: `1`, target: `${cnt}` },
//   ]);
//   setCnt((c) => c + 1);
// };
// console.log(nodes);
