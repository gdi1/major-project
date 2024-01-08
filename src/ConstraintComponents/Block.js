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

const Block = styled.div`
  position: relative;
  border: 3px solid black;
  display: flex;
  width: 220px;
  height: 60px;
  padding: ${paddings.small};
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  box-sizing: border-box;
  background-color: white;
  &:hover {
    background-color: ${colors.creme};
  }
  animation: ${fadeIn} 0.3s ease-in-out;
  &:hover {
    .close-btn {
      display: block;
    }
  }
`;
export default Block;
