import styled from "styled-components";

export const TooltipText = styled.span`
  visibility: hidden;
  background-color: black;
  color: #fff;
  border-radius: 3px;
  font-size: 15px;
  text-align: center;
  padding: 5px;
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 160%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s;
`;
