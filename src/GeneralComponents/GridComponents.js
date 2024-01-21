import styled from "styled-components";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 24%);
  width: 100%;
  gap: 10px;
  background-color: #fff;
  box-sizing: border-box;
  justify-content: space-between;
`;

export const GridItem = styled.div`
  /* Optional: add styling to the grid items */
  border: 1px solid #ccc;
  text-align: center;
`;

// Style the middle column to occupy the full width
export const AutoColumn = styled(GridItem)`
  grid-column: 2 / span 1;
`;

// export default GridContainer;
