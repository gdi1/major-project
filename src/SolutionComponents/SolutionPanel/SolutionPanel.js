import { useSelector } from "react-redux";
import { Container } from "../../GeneralComponents/Containers";
import GeneralButton from "../../GeneralComponents/GeneralButton";
import React, { useState, useCallback, useEffect } from "react";
import ScheduleView from "./ScheduleView";
import JourneyView from "./JourneyView";

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
    <Container
      flexDirection="column"
      justifyContent="center"
      width="85%"
      style={{ padding: "10px" }}
    >
      <GeneralButton onClick={switchFunction} style={{ alignSelf: "end" }}>
        {switchButtonTitle}
      </GeneralButton>
      {view === "schedule" && <ScheduleView />}
      {view === "journey" && <JourneyView />}
    </Container>
  );
};

export default SolutionPanel;
