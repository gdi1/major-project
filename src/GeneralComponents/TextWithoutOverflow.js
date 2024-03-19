import styled, { css } from "styled-components";
import text_styles from "../style-utils/text_styles";

/**
 * References
 *
 * CSS Tooltip, n.d., https://www.w3schools.com/css/css_tooltip.asp.
 */
export const TextWithEllipsis = styled.div`
  word-break: break-word;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: ${text_styles.fonts.xsmall};
  font-family: ${text_styles.styles.fontFamily};
`;

export const TextWithEllipsisCSS = css`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  overflow-wrap: break-word;
`;

export const TextWithWordBreakCSS = css`
  white-space: normal;
  overflow-wrap: break-word;
`;