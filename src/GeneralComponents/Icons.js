import styled from "styled-components";
import text_styles from "../style-utils/text_styles";

export const SmallIcon = styled.img`
  width: 1vw;
  height: 1vw;
`;
export const LargeIcon = styled.img`
  width: 2vw;
  height: 2vw;
`;

export const IconContainer = styled.div`
  position: relative;
  display: inline-block;

  font-size: ${text_styles.fonts.small_med};
  font-family: ${text_styles.styles.fontFamily};
  font-weight: bold;

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
