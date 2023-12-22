import { constraintsActions } from "../store/constraints";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../GeneralComponents/Container";

const ConstraintsPanel = () => {
  return <Container width={"50%"} border={"1px solid black"}></Container>;
};
export default ConstraintsPanel;
