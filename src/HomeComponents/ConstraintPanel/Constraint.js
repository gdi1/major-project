import styled from "styled-components";
import text_styles from "../../style-utils/text_styles";
import borders from "../../style-utils/borders";
import paddings from "../../style-utils/paddings";
import colors from "../../style-utils/colors";

const Constraint = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  border-radius: 0.2vw;
  color: #${colors.black};
  font-size: ${text_styles.fonts.small_med};
  font-family: ${text_styles.styles.fontFamily};
  font-weight: bold;
  border: ${borders.small};
  padding: ${paddings.xxsmall};
  background-color: ${(props) =>
    props.outdated ? `${colors.brick}` : `${colors.mustard}`};
`;
export default Constraint;
