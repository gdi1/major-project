import styled, { keyframes } from "styled-components";
import { GridContainer } from "../../GeneralComponents/GridComponents";
import text_styles from "../../style-utils/text_styles";
import borders from "../../style-utils/borders";
import paddings from "../../style-utils/paddings";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const DropdownList = styled(GridContainer)`
  animation: ${fadeIn} 0.3s ease-in-out; /* Use the fadeIn animation */
  max-height: 30vh;
  overflow: scroll;
  padding: ${paddings.small};
  border-bottom: ${borders.small};
`;

export const DropdownItem = styled.div`
  white-space: nowrap;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: ${text_styles.fonts.xsmall};
`;
