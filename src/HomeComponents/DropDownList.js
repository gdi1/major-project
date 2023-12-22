import styled from "styled-components";

const fadeIn = styled.keyframes`
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
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.3s ease-in-out; /* Use the fadeIn animation */
`;

export const DropdownItem = styled.div`
  display: flex;
  align-items: space-between;
`;
