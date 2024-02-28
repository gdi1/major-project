import { ColumnContainer, RowContainer } from "../GeneralComponents/Containers";
import ConstraintsPanel from "../HomeComponents/ConstraintPanel/ConstraintsPanel";
import Title from "../GeneralComponents/Title";
import styled from "styled-components";
import margins from "../style-utils/margins";
import SnapshotsPanel from "../HomeComponents/SnapshotsPanel/SnapshotsPanel";
import React, { useEffect, useState } from "react";
import SidebarComponent from "../HomeComponents/SidebarComponent";
import GeneralButton from "../GeneralComponents/GeneralButton";
import SetupOptionsPanel from "../HomeComponents/InitialSetupPanel/SetupOptionsPanel";
import { solutionActions } from "../store/solution";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SaveWorkingCopyModal from "../HomeComponents/Modals/SaveWorkingCopyModal";
import outdated_icon from "./../icons/outdated_icon.png";
import { encodeAllInternalData } from "../Utilities/EncodingFunctions";
import ExportEverythingModal from "../HomeComponents/Modals/ExportEverythingModal";
import { NotificationManager } from "react-notifications";
import { formatNtf } from "../Utilities/NotificationWrapper";
import { compareInternalDatas } from "../Utilities/EncodingFunctions";
import { TooltipText } from "../GeneralComponents/TooltipText";
import GeneralImportModal from "../HomeComponents/Modals/GeneralImportModal";
import gaps from "../style-utils/gaps";
import paddings from "../style-utils/paddings";
import { LargeIcon, IconContainer } from "../GeneralComponents/Icons";
import colors from "../style-utils/colors";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState("home");
  const [optionsTypes, setOptionsTypes] = useState([]);
  const [showSaveWorkingCopyModal, setShowSaveWorkingCopyModal] =
    useState(false);
  const [showExportEverythingModal, setShowExportEverythingModal] =
    useState(false);
  const [showGeneralImportModal, setShowGeneralImportModal] = useState(false);

  const internalData = useSelector((state) => state.constraints);
  const { outdatedConstraints } = internalData;
  const {
    isSolution,
    isOutdated,
    internalData: solutionInternalData,
  } = useSelector((state) => state.solution);

  const solveConfiguration = () => {
    if (outdatedConstraints.length > 0) {
      NotificationManager.error(
        ...formatNtf(
          "Constraints are inconsistent! Please resolve them before generating a solution.",
          "Error"
        )
      );
      return;
    }
    const {
      encodedAllInternalData: formattedConfiguration,
      teamsMap,
      locationsMap,
      weeksMap,
      periodsMap,
    } = encodeAllInternalData(internalData);
    console.log("formatted", formattedConfiguration);
    console.log(teamsMap, locationsMap, periodsMap, weeksMap);
    console.log(internalData);
    dispatch(
      solutionActions.setInternalData({
        internalData,
        teamsMap,
        locationsMap,
        weeksMap,
        periodsMap,
      })
    );
    navigate("/show-solution");
  };

  useEffect(() => {
    console.log("hello");
    if (isSolution) {
      if (!compareInternalDatas(internalData, solutionInternalData))
        dispatch(solutionActions.setOutdatedStatus(true));
      else dispatch(solutionActions.setOutdatedStatus(false));
    }
  }, [internalData]);

  return (
    <React.Fragment>
      <HomeScreenPage>
        <SaveWorkingCopyModal
          setIsModalOpen={setShowSaveWorkingCopyModal}
          isModalOpen={showSaveWorkingCopyModal}
        />
        <ExportEverythingModal
          setIsModalOpen={setShowExportEverythingModal}
          isModalOpen={showExportEverythingModal}
        />
        <GeneralImportModal
          setIsModalOpen={setShowGeneralImportModal}
          isModalOpen={showGeneralImportModal}
        />
        <SidebarComponent
          show={show}
          setShow={setShow}
          setOptionsTypes={setOptionsTypes}
          optionsTypes={optionsTypes}
          setShowSaveWorkingCopyModal={setShowSaveWorkingCopyModal}
          setShowExportEverythingModal={setShowExportEverythingModal}
          setShowGeneralImportModal={setShowGeneralImportModal}
        />
        <HomePage>
          <Header>
            <HomePageTitle>Sport Tournament Scheduling</HomePageTitle>
            <ButtonGroup>
              <GeneralButton onClick={solveConfiguration}>
                Generate new solution
              </GeneralButton>
              {isSolution && (
                <RowContainer style={{ width: "auto", gap: `${gaps.small}` }}>
                  <GeneralButton onClick={() => navigate("/show-solution")}>
                    View previous solution
                  </GeneralButton>
                  {isOutdated && (
                    <IconContainer>
                      <LargeIcon src={outdated_icon} />
                      <TooltipText>Outdated solution</TooltipText>
                    </IconContainer>
                  )}
                </RowContainer>
              )}
            </ButtonGroup>
          </Header>
          {(show === "home" || show === "options") && (
            <SetupOptionsPanel
              optionsTypes={optionsTypes.length > 0 ? optionsTypes : undefined}
            />
          )}
          {(show === "home" || show === "constraints") && (
            <ConstraintsPanel
              optionsTypes={optionsTypes.length > 0 ? optionsTypes : undefined}
            />
          )}
          {(show === "home" || show === "snapshots") && <SnapshotsPanel />}
        </HomePage>
      </HomeScreenPage>
    </React.Fragment>
  );
};

const HomeScreenPage = styled(RowContainer)`
  height: 100vh;
  align-items: start;
  background-color: ${colors.beige};
`;

const ButtonGroup = styled(RowContainer)`
  margin-bottom: ${margins.med};
  gap: ${gaps.med};
`;

const Header = styled(ColumnContainer)`
  height: 12vh;
  padding: ${paddings.small};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: ${colors.beige};
`;

const HomePage = styled(ColumnContainer)`
  overflow-y: scroll;
  overflow-x: hidden;
  justify-content: start;
  gap: ${gaps.med};
`;

const HomePageTitle = styled(Title)`
  margin-bottom: ${margins.small};
  width: auto;
`;

export default HomeScreen;
