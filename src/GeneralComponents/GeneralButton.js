import text_styles from "../style-utils/text_styles";
import styled from "styled-components";

const GeneralButton = styled.button`
  color: #${text_styles.colors.black};
  font-size: ${text_styles.resizbale_font.small_med};
  font-weight: bold;
  cursor: pointer;
`;

export default GeneralButton;
