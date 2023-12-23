import Container from "../GeneralComponents/Container";
import SetupPanel from "../HomeComponents/SetupPanel";
import ConstraintsPanel from "../HomeComponents/ConstraintsPanel";
import Title from "../GeneralComponents/Title";
import GeneralButton from "../GeneralComponents/GeneralButton";

const HomeScreen = () => {
  return (
    <Container flexDirection={"column"}>
      <Title>Welcome to Sport Torunament Scheduling</Title>
      <Container alignItems={"start"}>
        <SetupPanel />
        <ConstraintsPanel />
      </Container>
    </Container>
  );
};
export default HomeScreen;
