import text_styles from "../style-utils/text_styles";
import styled from "styled-components";
import colors from "../style-utils/colors";

export const Label = styled.label`
  font-size: ${text_styles.fonts.small_med};
  font-family: ${text_styles.styles.fontFamily};
  font-weight: bold;
  width: 100%;
`;

export const CenteredLabel = styled.label`
  font-size: ${text_styles.fonts.small_med};
  font-family: ${text_styles.styles.fontFamily};
  font-weight: bold;
  width: 100%;
  text-align: center;
`;
