import styled from "styled-components";
import { RowContainer } from "../GeneralComponents/Containers";

const Legend = () => {
  return (
    <div>
      <Container>
        <div>Source handle: </div>
        <OrangeDot />
      </Container>
      <Container>
        <div>Target handle: </div> <GreenDot />
      </Container>
    </div>
  );
};

export default Legend;

const Dot = styled.div`
  height: 20px;
  width: 20px;
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
  gap: 10px;
  padding: 10px;
`;
