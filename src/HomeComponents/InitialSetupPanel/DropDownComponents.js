import styled, { keyframes } from "styled-components";
import { GridContainer } from "../../GeneralComponents/GridComponents";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const DropdownList = styled(GridContainer)`
  animation: ${fadeIn} 0.3s ease-in-out; /* Use the fadeIn animation */
  max-height: 30vh;
  overflow: scroll;
  padding: 10px;
  border-bottom: 1px solid black;
`;

export const DropdownItem = styled.div`
  white-space: nowrap;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
`;
