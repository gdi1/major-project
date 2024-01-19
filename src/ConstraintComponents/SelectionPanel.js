import { ColumnContainer } from "../GeneralComponents/Containers";
import SelectionBlock from "./SelectionBlock";
import paddings from "../style-utils/paddings";
import styled from "styled-components";
import borders from "../style-utils/borders";

const SelectionPanel = () => {
  const block_types = [
    ["teams"],
    ["weeks", "periods", "locations"],
    ["at-least", "at-most"],
    ["and", "or"],
    ["play", "not-play", "play-against", "not-play-against"],
  ];
  return (
    <SelectionBlocks>
      {block_types.map((group) => (
        <SelectionBlocksGroup>
          {group.map((type) => (
            <SelectionBlock type={type} key={type} />
          ))}
        </SelectionBlocksGroup>
      ))}
    </SelectionBlocks>
  );
};

const SelectionBlocksGroup = styled(ColumnContainer)`
  height: auto;
  gap: 5px;
`;

const SelectionBlocks = styled(ColumnContainer)`
  width: 15%;
  justify-content: space-between;
  height: 85vh;
  border: ${borders.small};
  padding: ${paddings.small};
`;
export default SelectionPanel;
