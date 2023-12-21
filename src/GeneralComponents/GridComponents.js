import styled from "styled-components";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 50px auto 50px; /* Fixed, Auto, Fixed */
  align-items: start;
  justify-items: start;
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
