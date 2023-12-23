import text_styles from "../style-utils/text_styles";
import styled from "styled-components";

const InputField = styled.input`
  color: #${text_styles.colors.black};
  font-size: ${text_styles.resizbale_font.small_minus};
  font-weight: bold;
`;

export default InputField;
