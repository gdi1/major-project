import styled from "styled-components";
import paddings from "../style-utils/paddings";
import gaps from "../style-utils/gaps";
import borders from "../style-utils/borders";
import text_styles from "../style-utils/text_styles";
import { fadeIn } from "../GeneralComponents/animations";

const Block = styled.div`
  border: ${borders.small};
  display: flex;
  gap: ${gaps.xxsmall};
  width: 16vw;
  height: 5.5vh;
  padding: ${paddings.xxsmall};
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  box-sizing: border-box;
  background-color: white;
  font-size: ${text_styles.fonts.xxsmall};
  font-family: ${text_styles.styles.fontFamily};
  animation: ${fadeIn} 0.3s ease-in-out;
`;
export default Block;
