import styled from "styled-components";
import text_styles from "../style-utils/text_styles";

export const TooltipText = styled.span`
  visibility: hidden;
  background-color: black;
  color: #fff;
  border-radius: 3px;
  font-size: ${text_styles.fonts.xxsmall};
  font-family: ${text_styles.styles.fontFamily};
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
