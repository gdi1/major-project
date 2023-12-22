import { useSelector, useDispatch } from "react-redux";
import { constraintsActions } from "../store/constraints";
import Container from "../GeneralComponents/Container";
import SetupPanel from "../HomeComponents/SetupPanel";
import ConstraintsPanel from "../HomeComponents/ConstraintsPanel";

const HomeScreen = () => {
  return (
    <Container justifyContent={"space-between"}>
      <SetupPanel />
      <ConstraintsPanel />
    </Container>
  );
};
export default HomeScreen;
