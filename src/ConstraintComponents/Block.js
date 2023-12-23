import styled, { keyframes } from "styled-components";
import paddings from "../style-utils/paddings";
import colors from "../style-utils/colors";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    
  }
  to {
    opacity: 0;
  }
`;

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
  animation: ${fadeIn} 0.3s ease-in-out;
`;
export default Block;
