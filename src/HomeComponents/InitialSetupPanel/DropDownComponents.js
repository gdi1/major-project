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
  grid-template-columns: repeat(4, 23%);
  width: 100%;
  gap: 10px;
  background-color: #fff;
  animation: ${fadeIn} 0.3s ease-in-out; /* Use the fadeIn animation */
  max-height: 30vh;
  overflow: scroll;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid black;
  justify-content: space-between;
`;

export const DropdownItem = styled.div`
  white-space: nowrap;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
`;
//word-break: break-word;
