import { ColumnContainer } from "../GeneralComponents/Containers";
import SelectionBlock from "./SelectionBlock";
import paddings from "../style-utils/paddings";
import styled from "styled-components";
import borders from "../style-utils/borders";

const SelectionPanel = () => {
  const block_types = [
    ["teams", "weeks", "periods", "locations"],
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
  gap: 1vh;
`;

const SelectionBlocks = styled(ColumnContainer)`
  align-items: start;
  justify-content: start;
  gap: 2vh;
  width: 20vw;
  border: ${borders.small};
  padding: ${paddings.xsmall};
  box-sizing: border-box;
  height: 85vh;
`;
export default SelectionPanel;
