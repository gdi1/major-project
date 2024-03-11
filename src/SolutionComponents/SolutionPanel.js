import { useSelector } from "react-redux";
import { ColumnContainer, RowContainer } from "../GeneralComponents/Containers";
import GeneralButton from "../GeneralComponents/GeneralButton";
import React, { useState, useCallback, useEffect } from "react";
import ScheduleView from "./ScheduleView/ScheduleView";
import JourneyView from "./JourneyView/JourneyView";
import styled from "styled-components";
import paddings from "../style-utils/paddings";
import borders from "../style-utils/borders";
import gaps from "../style-utils/gaps";
import { Label } from "../GeneralComponents/Labels";
import { IconContainer, LargeIcon } from "../GeneralComponents/Icons";
import info_icon from "../icons/info_icon.png";
import MapInfoCardModal from "./SolutionModals/MapInfoCardModal";
import { TooltipText } from "../GeneralComponents/TooltipText";

const SolutionPanel = () => {
  const [view, setView] = useState("schedule");
  const { selectedTeam, speed } = useSelector((state) => state.solution);
  const switchButtonTitle =
    view === "schedule" ? "Switch to View Journey" : "Switch to View Schedule";
  const switchFunction = useCallback(
    () => (view === "schedule" ? setView("journey") : setView("schedule")),
    [view]
  );
  const [isMapInfoCardOpened, setIsMapInfoCardOpened] = useState(false);

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
      <MapInfoCardModal
        isModalOpen={isMapInfoCardOpened}
        setIsModalOpen={setIsMapInfoCardOpened}
      />
      <SubHeaderContainer>
        {view === "journey" && selectedTeam !== undefined && (
          <React.Fragment>
            <Speed>Speed setting: {6 - speed / 1000}</Speed>
            <IconContainer>
              <InfoIcon
                src={info_icon}
                onClick={() => setIsMapInfoCardOpened(true)}
              />
              <TooltipText>Info</TooltipText>
            </IconContainer>
          </React.Fragment>
        )}
        <SwitchButton onClick={switchFunction}>
          {switchButtonTitle}
        </SwitchButton>
      </SubHeaderContainer>
      {view === "schedule" && <ScheduleView />}
      {view === "journey" && <JourneyView />}
    </SolutionBody>
  );
};

const SubHeaderContainer = styled(RowContainer)`
  height: auto;
  justify-content: end;
  gap: ${gaps.med};
`;

const InfoIcon = styled(LargeIcon)`
  cursor: pointer;
`;

const Speed = styled(Label)`
  width: auto;
`;

const SolutionBody = styled(ColumnContainer)`
  padding: ${paddings.xsmall};
  border-left: ${borders.small};
  box-sizing: border-box;
  width: 85vw;
`;
const SwitchButton = styled(GeneralButton)`
  align-self: end;
`;

export default SolutionPanel;
