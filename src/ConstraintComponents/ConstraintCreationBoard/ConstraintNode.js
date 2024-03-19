import { Handle, Position, useUpdateNodeInternals } from "reactflow";
import FlowBlock from "./FlowBlock";
import { useSelector } from "react-redux";
import borders from "../../style-utils/borders";
import styled from "styled-components";
import paddings from "../../style-utils/paddings";
import colors from "../../style-utils/colors";
import { useEffect } from "react";

const positions = {
  teams: 1,
  play: 2,
  "not-play": 2,
  "play-against": 2,
  "not-play-against": 2,
  locations: 3,
  weeks: 4,
  periods: 5,
  "at-least": 6,
  "at-most": 6,
};

const sortConstraintBlockTypes = (arr) => {
  return arr.sort((a, b) => positions[a] - positions[b]);
};

const operators = ["and", "or"];

const ConstraintNode = ({ id, data }) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const types = sortConstraintBlockTypes(Object.keys(data.types));
  const bottomHandle = types.some((type) => operators.includes(type));
  const { selectedNode } = useSelector((state) => state.flow);

  useEffect(() => {
    updateNodeInternals(id);
    console.log("blabal");
  }, [bottomHandle]);

  return (
    <ConstraintNodeBody focused={selectedNode === id}>
      {types.length > 0 && (
        <Handle
          type="target"
          position={Position.Top}
          style={{ backgroundColor: "green", width: "0.5vw", height: "0.5vw" }}
        />
      )}
      {types.map((type) => (
        <FlowBlock type={type} selectedOptions={data.types[type]} id={id} />
      ))}
      {bottomHandle && (
        <Handle
          type="source"
          position={Position.Bottom}
          style={{ backgroundColor: "orange", width: "0.5vw", height: "0.5vw" }}
        />
      )}
    </ConstraintNodeBody>
  );
};

const ConstraintNodeBody = styled.div`
  padding: ${paddings.xsmall};
  border: ${borders.small};
  background-color: ${(props) =>
    props.focused ? `${colors.brick}` : `${colors.mustard}`};
  min-width: 20vw;
  min-height: 5.5vh;
`;

export default ConstraintNode;
