import text_styles from "../style-utils/text_styles";
import styled from "styled-components";
import { TextWithWordBreakCSS } from "./TextWithoutOverflow";

export const NotificationTitle = styled.div`
  font-size: ${text_styles.fonts.small};
  font-family: ${text_styles.styles.fontFamily};
  ${TextWithWordBreakCSS};
`;

export const NotificationMessage = styled.div`
  font-size: ${text_styles.fonts.xsmall};
  font-family: ${text_styles.styles.fontFamily};
  ${TextWithWordBreakCSS};
`;
