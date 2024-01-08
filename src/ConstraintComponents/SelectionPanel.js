import { ColumnContainer, Container } from "../GeneralComponents/Containers";
import SelectionBlock from "./SelectionBlock";
import paddings from "../style-utils/paddings";
import styled from "styled-components";
import borders from "../style-utils/borders";

const SelectionPanel = () => {
  const block_types = [
    "teams",
    "weeks",
    "periods",
    "locations",
    "at-least",
    "at-most",
    "and",
    "or",
    "play",
    "not-play",
    "play-against",
    "not-play-against",
  ];
  return (
    <SelectionBlocks>
      {block_types.map((type) => (
        <SelectionBlock type={type} key={type} />
      ))}
    </SelectionBlocks>
  );
};

const SelectionBlocks = styled(ColumnContainer)`
  width: 15%;
  gap: 5px;
  height: 90vh;
  border: ${borders.small};
  padding: ${paddings.small};
`;
export default SelectionPanel;
