import styled from "styled-components";
import text_styles from "../style-utils/text_styles";

export const TextWithEllipsis = styled.div`
  word-break: break-word;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: ${text_styles.fonts.xsmall};
  font-family: ${text_styles.styles.fontFamily};
`;
