import text_styles from "../style-utils/text_styles";
import styled from "styled-components";
import colors from "../style-utils/colors";

const InputField = styled.input`
  color: #${colors.black};
  font-size: ${text_styles.fonts.xsmall};
  font-family: ${text_styles.styles.fontFamily};
  font-weight: bold;
  height: 100%;
`;

export default InputField;
