import styled from "styled-components";
import text_styles from "../style-utils/text_styles";

/**
 * References
 *
 * CSS Tooltip, n.d., https://www.w3schools.com/css/css_tooltip.asp.
 *
 * “W3Schools Online HTML Editor,” W3Schools Online Web Tutorials,
 * n.d., https://www.w3schools.com/css/tryit.asp?filename=trycss_tooltip_arrow_top.
 */
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
  z-index: 1000;
  left: 50%;
  top: 160%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s;
`;
