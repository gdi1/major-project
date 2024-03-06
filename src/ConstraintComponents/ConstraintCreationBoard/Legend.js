import styled from "styled-components";
import { RowContainer } from "../../GeneralComponents/Containers";
import gaps from "../../style-utils/gaps";
import paddings from "../../style-utils/paddings";
import text_styles from "../../style-utils/text_styles";

const Legend = () => {
  return (
    <div>
      <Container>
        <Text>Source handle: </Text>
        <OrangeDot />
      </Container>
      <Container>
        <Text>Target handle: </Text> <GreenDot />
      </Container>
      <Container>
        <Text>To delete a node, select it and press the "Delete" key. </Text>
      </Container>
    </div>
  );
};

export default Legend;

const Text = styled.div`
  font-size: ${text_styles.fonts.xsmall};
  font-family: ${text_styles.styles.fontFamily};
`;
const Dot = styled.div`
  height: 1vw;
  width: 1vw;
  border-radius: 50%;
`;

const OrangeDot = styled(Dot)`
  background-color: orange;
`;

const GreenDot = styled(Dot)`
  background-color: green;
`;

const Container = styled(RowContainer)`
  width: auto;
  height: auto;
  justify-content: start;
  gap: ${gaps.xsmall};
  padding: ${paddings.xxsmall};
`;
