import React from "react";
import { RowContainer } from "../GeneralComponents/Containers";
import SolutionPanel from "../SolutionComponents/SolutionPanel";
import TeamsPanel from "../SolutionComponents/TeamsPanel";
import Title from "../GeneralComponents/Title";
import GeneralButton from "../GeneralComponents/GeneralButton";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import borders from "../style-utils/borders";
import gaps from "../style-utils/gaps";

const SolutionScreen = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <SolutionPageHeader>
        <div />
        <Title>Solution</Title>
        <ButtonGroup>
          <GeneralButton>Save</GeneralButton>
          <GeneralButton onClick={() => navigate("/")}>Back</GeneralButton>
        </ButtonGroup>
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
  height: 10vh;
`;
const SolutionPageBody = styled(RowContainer)`
  border: ${borders.small};
  align-items: start;
  justify-content: space-between;
  height: 88vh;
`;
const ButtonGroup = styled(RowContainer)`
  width: auto;
  gap: ${gaps.xsmall};
`;
export default SolutionScreen;
