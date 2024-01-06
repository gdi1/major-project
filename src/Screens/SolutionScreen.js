import React from "react";
import Container from "../GeneralComponents/Container";
import SolutionPanel from "../SolutionComponents/SolutionPanel/SolutionPanel";
import TeamsPanel from "../SolutionComponents/TeamsPanel/TeamsPanel";
import Title from "../GeneralComponents/Title";
import GeneralButton from "../GeneralComponents/GeneralButton";
import { useNavigate } from "react-router-dom";

const SolutionScreen = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Container justifyContent="space-between">
        <div />
        <Title>Solution</Title>
        <GeneralButton onClick={() => navigate("/")}>Back</GeneralButton>
      </Container>
      <Container
        justifyContent="space-between"
        style={{
          boxSizing: "border-box",
          border: "1px solid black",
          padding: "10px",
        }}
        alignItems="start"
      >
        <TeamsPanel />
        <SolutionPanel />
      </Container>
    </React.Fragment>
  );
};
export default SolutionScreen;
