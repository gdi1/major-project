import styled from "styled-components";
import paddings from "../style-utils/paddings";
import colors from "../style-utils/colors";

const Block = styled.div`
  border: 3px solid black;
  display: flex;
  width: 200px;
  height: 60px;
  padding: ${paddings.med};
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  box-sizing: border-box;
  &:hover {
    background-color: ${colors.creme};
  }
`;

export default Block;
