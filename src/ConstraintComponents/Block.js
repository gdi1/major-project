import styled, { keyframes } from "styled-components";
import paddings from "../style-utils/paddings";
import gaps from "../style-utils/gaps";
import borders from "../style-utils/borders";
import text_styles from "../style-utils/text_styles";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Block = styled.div`
  border: ${borders.small};
  display: flex;
  gap: ${gaps.xxsmall};
  width: 16vw;
  min-height: 3vw;
  padding: ${paddings.xxsmall};
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  box-sizing: border-box;
  background-color: white;
  font-size: ${text_styles.fonts.xxsmall};
  font-family: ${text_styles.styles.fontFamily};

  animation: ${fadeIn} 0.3s ease-in-out;
  &:hover {
    .close-btn {
      display: block;
    }
  }
`;
export default Block;
