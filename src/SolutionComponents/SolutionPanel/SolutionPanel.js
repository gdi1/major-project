import { useSelector } from "react-redux";
import { ColumnContainer, Container } from "../../GeneralComponents/Containers";
import GeneralButton from "../../GeneralComponents/GeneralButton";
import React, { useState, useCallback, useEffect } from "react";
import ScheduleView from "./ScheduleView";
import JourneyView from "./JourneyView";
import styled from "styled-components";
import paddings from "../../style-utils/paddings";

const SolutionPanel = () => {
  const [view, setView] = useState("schedule");
  const { selectedTeam } = useSelector((state) => state.solution);
  const switchButtonTitle =
    view === "schedule" ? "Switch to View Journey" : "Switch to View Schedule";
  const switchFunction = useCallback(
    () => (view === "schedule" ? setView("journey") : setView("schedule")),
    [view]
  );

  useEffect(() => {
    if (!selectedTeam) return;
    const leafletDivInstructions = document.querySelector(
      ".leaflet-top.leaflet-right"
    );
    if (leafletDivInstructions) {
      leafletDivInstructions.remove();
    }
  }, [selectedTeam]);

  return (
    <SolutionBody>
      <SwitchButton onClick={switchFunction}>{switchButtonTitle}</SwitchButton>
      {view === "schedule" && <ScheduleView />}
      {view === "journey" && <JourneyView />}
    </SolutionBody>
  );
};

const SolutionBody = styled(ColumnContainer)`
  width: 85%;
  padding: ${paddings.small};
`;
const SwitchButton = styled(GeneralButton)`
  align-self: end;
`;

export default SolutionPanel;
