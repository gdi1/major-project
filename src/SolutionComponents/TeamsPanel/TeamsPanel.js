import { useSelector } from "react-redux";
import Container from "../../GeneralComponents/Container";
import Label from "../../GeneralComponents/Label";
import Title from "../../GeneralComponents/Title";

const TeamsPanel = () => {
  const { teams } = useSelector((state) => state.constraints);
  return (
    <Container
      flexDirection="column"
      width="10%"
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
          }}
          onClick={() => {}}
        >
          {team.label}
        </Label>
      ))}
    </Container>
  );
};

export default TeamsPanel;
