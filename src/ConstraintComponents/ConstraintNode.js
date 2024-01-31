import { Handle, Position } from "reactflow";
import FlowBlock from "./FlowBlock";
import { useSelector } from "react-redux";
import { sortConstraintBlockTypes } from "../Utilities/BinarySearch";
import borders from "../style-utils/borders";
import styled from "styled-components";
import delete_icon from "./../icons/delete_icon.png";

const operators = ["and", "or"];

const ConstraintNode = ({ id, data }) => {
  const types = sortConstraintBlockTypes(Object.keys(data.types));
  const bottomHandle = types.some((type) => operators.includes(type));
  const { selectedNode } = useSelector((state) => state.flow);

  return (
    <ConstraintNodeBody focused={selectedNode === id}>
      {types.length > 0 && (
        <Handle
          type="target"
          position={Position.Top}
          style={{ backgroundColor: "green" }}
        />
      )}
      {types.map((type) => (
        <FlowBlock type={type} selectedOptions={data.types[type]} id={id} />
      ))}
      {bottomHandle && (
        <Handle
          type="source"
          position={Position.Bottom}
          style={{ backgroundColor: "orange" }}
        />
      )}
    </ConstraintNodeBody>
  );
};

const ConstraintNodeBody = styled.div`
  padding: 20px;
  border: ${borders.small};
  background-color: ${(props) => (props.focused ? "blue" : "white")};
`;
const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

export default ConstraintNode;
