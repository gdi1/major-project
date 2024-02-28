import text_styles from "../style-utils/text_styles";
import styled from "styled-components";

export const NotificationTitle = styled.div`
  font-size: ${text_styles.fonts.small};
  font-family: ${text_styles.styles.fontFamily};
`;

export const NotificationMessage = styled.div`
  font-size: ${text_styles.fonts.xsmall};
  font-family: ${text_styles.styles.fontFamily};
`;
