import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const DropdownList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 100%;
  background-color: #fff;
  animation: ${fadeIn} 0.3s ease-in-out; /* Use the fadeIn animation */
  max-height: 30vh;
  overflow: scroll;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid black;
`;

export const DropdownItem = styled.div`
  width: 50%;
  white-space: normal;
  word-break: break-word;
`;
