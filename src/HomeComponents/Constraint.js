import styled from "styled-components";
import text_styles from "../style-utils/text_styles";

export const Constraint = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  color: #${text_styles.colors.black};
  font-size: ${text_styles.resizbale_font.small_med};
  font-weight: bold;
  border: 1px solid black;
  padding: 5px;
`;
