import Container from "../GeneralComponents/Container";
import SelectionBlock from "./SelectionBlock";
import paddings from "../style-utils/paddings";
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
    <Container
      flexDirection={"column"}
      width={"15%"}
      justifyContent={"center"}
      gap={"5px"}
      height="90vh"
      border="1px solid black"
      padding={paddings.med}
    >
      {block_types.map((type) => (
        <SelectionBlock type={type} key={type} />
      ))}
    </Container>
  );
};
export default SelectionPanel;
