import { Handle, Position } from "reactflow";
import FlowBlock from "./FlowBlock";
import { useSelector } from "react-redux";
import { sortConstraintBlockTypes } from "../Utilities/BinarySearch";

const operators = ["and", "or"];

const ConstraintNode = ({ id, data }) => {
  const types = sortConstraintBlockTypes(Object.keys(data.types));
  const bottomHandle = types.some((type) => operators.includes(type));
  const { selectedNode } = useSelector((state) => state.flow);

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid black",
        backgroundColor: selectedNode === id ? "blue" : "white",
      }}
    >
      {types.length > 0 && <Handle type="target" position={Position.Top} />}
      {types.map((type) => (
        <FlowBlock type={type} selectedOptions={data.types[type]} id={id} />
      ))}
      {bottomHandle && <Handle type="source" position={Position.Bottom} />}
    </div>
  );
};

export default ConstraintNode;
