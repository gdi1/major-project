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
  position: relative;
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
  &:hover {
    .close-btn {
      display: block;
    }
  }
`;

export const CloseButton = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  display: none;
  cursor: pointer;

  &::before {
    content: " ";
    position: absolute;
    width: 105%;
    height: 2px;
    background-color: red;
    left: 0;
    transform-origin: 0 0;
    transform: rotate(15deg);
    cursor: pointer;
  }

  &::after {
    content: " ";
    position: absolute;
    width: 105%;
    height: 2px;
    background-color: red;
    left: 100%;
    transform-origin: 0 0;
    transform: rotate(165deg);
  }
`;

export default Block;
