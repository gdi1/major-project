import text_styles from "../style-utils/text_styles";
import styled from "styled-components";

const Label = styled.label`
  color: #${text_styles.colors.black};
  font-size: ${text_styles.resizbale_font.small_med};
  font-weight: bold;
`;

export default Label;
