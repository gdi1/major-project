import Container from "../GeneralComponents/Container";
import { constraintsActions } from "../store/constraints";
import InputBundle from "./InputBundle";

const SetupPanel = () => {
  const types = [
    { type: "teams", updateFunction: constraintsActions.addTeam },
    { type: "locations", updateFunction: constraintsActions.addLocation },
    { type: "periods", updateFunction: constraintsActions.addPeriod },
    { type: "weeks", updateFunction: constraintsActions.addWeeks },
  ];
  return (
    <Container
      width={"50%"}
      border={"1px solid black"}
      flexDirection={"column"}
      style={{ borderBottom: "0" }}
    >
      {types.map(({ type, updateFunction }) => (
        <InputBundle
          title={type[0].toUpperCase() + type.substring(1)}
          type={type}
          updateFunction={updateFunction}
        />
      ))}
    </Container>
  );
};
export default SetupPanel;
