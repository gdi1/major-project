import styled from "styled-components";
import gaps from "../style-utils/gaps";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 24%);
  background-color: #fff;
  justify-content: space-between;
  width: 80vw;
  gap: ${gaps.xsmall};
`;
