import React from "react";
import { Container, RowContainer } from "../GeneralComponents/Containers";
import SolutionPanel from "../SolutionComponents/SolutionPanel/SolutionPanel";
import TeamsPanel from "../SolutionComponents/TeamsPanel/TeamsPanel";
import Title from "../GeneralComponents/Title";
import GeneralButton from "../GeneralComponents/GeneralButton";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import borders from "../style-utils/borders";
import paddings from "../style-utils/paddings";

const SolutionScreen = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <SolutionPageHeader>
        <div />
        <Title>Solution</Title>
        <GeneralButton onClick={() => navigate("/")}>Back</GeneralButton>
      </SolutionPageHeader>
      <SolutionPageBody>
        <TeamsPanel />
        <SolutionPanel />
      </SolutionPageBody>
    </React.Fragment>
  );
};

const SolutionPageHeader = styled(RowContainer)`
  justify-content: space-between;
`;
const SolutionPageBody = styled(RowContainer)`
  box-sizing: border-box;
  border: ${borders.small};
  padding: ${paddings.small};
  align-items: start;
`;
export default SolutionScreen;
