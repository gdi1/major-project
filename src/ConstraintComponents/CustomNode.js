import { Handle, Position } from "reactflow";
import FlowBlock from "./FlowBlock";
import { useSelector } from "react-redux";

const operators = ["and", "or"];

const CustomNode = ({ id, data }) => {
  const types = Object.keys(data.types);
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

export default CustomNode;
