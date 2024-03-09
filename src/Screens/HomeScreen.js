import { ColumnContainer, RowContainer } from "../GeneralComponents/Containers";
import ConstraintsPanel from "../HomeComponents/ConstraintPanel/ConstraintsPanel";
import Title from "../GeneralComponents/Title";
import styled from "styled-components";
import margins from "../style-utils/margins";
import SnapshotsPanel from "../HomeComponents/SnapshotsPanel/SnapshotsPanel";
import React, { useEffect, useState } from "react";
import SidebarComponent from "../HomeComponents/SidebarComponent";
import GeneralButton from "../GeneralComponents/GeneralButton";
import SetupOptionsPanel from "../HomeComponents/ParametersPanel/SetupOptionsPanel";
import { solutionActions } from "../store/solution";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SaveWorkingCopyModal from "../HomeComponents/HomeModals/SaveWorkingCopyModal";
import outdated_icon from "./../icons/outdated_icon.png";
import { encodeAllInternalData } from "../Utilities/EncodingFunctions";
import ExportEverythingModal from "../HomeComponents/HomeModals/ExportEverythingModal";
import { NotificationManager } from "react-notifications";
import { formatNtf } from "../Utilities/NotificationWrapper";
import { compareInternalDatas } from "../Utilities/EncodingFunctions";
import { TooltipText } from "../GeneralComponents/TooltipText";
import GeneralImportModal from "../HomeComponents/HomeModals/GeneralImportModal";
import gaps from "../style-utils/gaps";
import paddings from "../style-utils/paddings";
import { LargeIcon, IconContainer } from "../GeneralComponents/Icons";
import colors from "../style-utils/colors";
import ResetSolutionModal from "../HomeComponents/HomeModals/ResetSolutionModal";
import GenerateNewSolutionModal from "../HomeComponents/HomeModals/GenerateNewSolutionModal";
import text_styles from "../style-utils/text_styles";
import LoadingModal from "../HomeComponents/HomeModals/LoadingModal";

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
  const [showResetSolutionModal, setShowResetSolutionModal] = useState(false);
  const [showGenerateNewSolutionModal, setShowGenerateNewSolutionModal] =
    useState(false);

  const internalData = useSelector((state) => state.configurations);
  const { outdatedConstraints } = internalData;
  const {
    isSolution,
    isOutdated,
    internalData: solutionInternalData,
  } = useSelector((state) => state.solution);

  const solveConfiguration = async (signal) => {
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

    // try {
    //   const response = await fetch("http://localhost:8080", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     withCredentials: true,
    //     credentials: "include",
    //     signal,
    //     body: JSON.stringify(formattedConfiguration),
    //   });
    //   if (response.ok) {
    //     const data = await response.json();
    //     console.log(data);
    //   } else {
    //     const data = await response.json();
    //     console.log(data);
    //     return false;
    //   }
    // } catch (err) {
    //   if (err.name !== "AbortError") return false;
    //   setIsLoadingModalOpened(false);
    //   return true;
    // }

    dispatch(
      solutionActions.setInternalData({
        internalData,
        teamsMap,
        locationsMap,
        weeksMap,
        periodsMap,
      })
    );
    setIsLoadingModalOpened(false);
    navigate("/show-solution");
    return true;
  };

  useEffect(() => {
    if (isSolution) {
      if (!compareInternalDatas(internalData, solutionInternalData))
        dispatch(solutionActions.setOutdatedStatus(true));
      else dispatch(solutionActions.setOutdatedStatus(false));
    }
  }, [internalData]);

  const [isLoadingModalOpened, setIsLoadingModalOpened] = useState(false);

  return (
    <React.Fragment>
      <HomeScreenPage>
        <LoadingModal
          isModalOpen={isLoadingModalOpened}
          setIsModalOpen={setIsLoadingModalOpened}
          solveConfiguration={solveConfiguration}
        />
        <GenerateNewSolutionModal
          setIsModalOpen={setShowGenerateNewSolutionModal}
          isModalOpen={showGenerateNewSolutionModal}
          setIsLoadingModalOpened={setIsLoadingModalOpened}
        />
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
        <ResetSolutionModal
          setIsModalOpen={setShowResetSolutionModal}
          isModalOpen={showResetSolutionModal}
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
            <Attribution>
              Icons by
              <IconsLink
                href="https://icons8.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Icons8
              </IconsLink>
            </Attribution>
            <HomePageTitle>Sport Tournament Scheduling</HomePageTitle>
            <ButtonGroup>
              <GeneralButton
                onClick={() =>
                  isSolution
                    ? setShowGenerateNewSolutionModal(true)
                    : setIsLoadingModalOpened(true)
                }
              >
                Generate new solution
              </GeneralButton>
              {isSolution && (
                <RowContainer style={{ width: "auto", gap: `${gaps.small}` }}>
                  <GeneralButton onClick={() => navigate("/show-solution")}>
                    View last solution
                  </GeneralButton>
                  <GeneralButton
                    onClick={() => setShowResetSolutionModal(true)}
                  >
                    Reset solution
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

const IconsLink = styled.a`
  font-size: ${text_styles.fonts.xsmall};
  font-family: ${text_styles.styles.fontFamily};
`;

const Attribution = styled.div`
  align-self: end;
  font-size: ${text_styles.fonts.xsmall};
  font-family: ${text_styles.styles.fontFamily};
`;

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
  height: 15vh;
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
  box-sizing: border-box;
  gap: ${gaps.med};
`;

const HomePageTitle = styled(Title)`
  margin-bottom: ${margins.small};
  width: auto;
`;

export default HomeScreen;
