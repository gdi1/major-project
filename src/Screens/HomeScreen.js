import Container from "../GeneralComponents/Container";
import SetupPanel from "../HomeComponents/InitialSetupPanel/SetupPanel";
import ConstraintsPanel from "../HomeComponents/ConstraintPanel/ConstraintsPanel";
import Title from "../GeneralComponents/Title";
import GeneralButton from "../GeneralComponents/GeneralButton";

const HomeScreen = () => {
  return (
    <Container flexDirection={"column"}>
      <Title style={{ marginBottom: "50px" }}>
        Welcome to Sport Tournament Scheduling
      </Title>
      <Container alignItems={"start"}>
        <SetupPanel />
        <ConstraintsPanel />
      </Container>
    </Container>
  );
};
export default HomeScreen;
