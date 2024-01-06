import { useSelector, useDispatch } from "react-redux";
import Container from "../../GeneralComponents/Container";
import Label from "../../GeneralComponents/Label";
import Title from "../../GeneralComponents/Title";
import { solutionActions } from "../../store/solution";

const TeamsPanel = () => {
  const dispatch = useDispatch();
  const { teams } = useSelector((state) => state.constraints);
  const { selectedTeam } = useSelector((state) => state.solution);

  return (
    <Container
      flexDirection="column"
      width="12%"
      height="90vh"
      overflow="scroll"
      alignItems="center"
      justifyContent="start"
      style={{ borderRight: "1px solid black" }}
    >
      <Title style={{ borderBottom: "1px solid black", paddingBottom: "5px" }}>
        Teams
      </Title>
      {teams.map((team) => (
        <Label
          style={{
            padding: "10px",
            border: "1px solid black",
            cursor: "pointer",
            width: "80%",
            textAlign: "center",
            backgroundColor: selectedTeam === team.value ? "blue" : "white",
          }}
          onClick={() =>
            dispatch(
              selectedTeam !== team.value
                ? solutionActions.selectTeam(team.value)
                : solutionActions.deselectedTeam(team.value)
            )
          }
        >
          {team.label}
        </Label>
      ))}
    </Container>
  );
};

export default TeamsPanel;
