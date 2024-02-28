import text_styles from "../style-utils/text_styles";
import styled from "styled-components";
import colors from "../style-utils/colors";

const GeneralButton = styled.button`
  color: #${colors.black};
  font-size: ${text_styles.fonts.small_med};
  font-weight: bold;
  cursor: pointer;
  background-color: ${colors.olive};
  font-family: ${text_styles.styles.fontFamily};
  border-radius: 0.3vw;

  position: relative;
  display: inline-block;

  &:hover span {
    visibility: visible;
    opacity: 1;
  }

  span::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent black transparent;
  }
`;

export default GeneralButton;
