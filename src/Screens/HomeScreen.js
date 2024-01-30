import { ColumnContainer, RowContainer } from "../GeneralComponents/Containers";
import SetupPanel from "../HomeComponents/InitialSetupPanel/SetupPanel";
import ConstraintsPanel from "../HomeComponents/ConstraintPanel/ConstraintsPanel";
import Title from "../GeneralComponents/Title";
import styled from "styled-components";
import margins from "../style-utils/margins";
import SnapshotsPanel from "../HomeComponents/SnapshotsPanel/SnapshotsPanel";
import WorkingCopy from "../HomeComponents/SnapshotsPanel/WorkingCopy";
import React, { useState } from "react";
import SidebarComponent from "../HomeComponents/SidebarComponent";
import GeneralButton from "../GeneralComponents/GeneralButton";
import SetupOptionsPanel from "../HomeComponents/InitialSetupPanel/SetupOptionsPanel";
import { solutionActions } from "../store/solution";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SaveCurrentSetupModal from "../HomeComponents/SaveCurrentSetupModal";
import outdated_icon from "./../icons/outdated_icon.png";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState("home");
  const [optionsTypes, setOptionsTypes] = useState([]);
  const [showSaveCurrentSetupModal, setShowSaveCurrentSetupModal] =
    useState(false);

  const internalData = useSelector((state) => state.constraints);
  const { outdatedConstraints } = internalData;
  const { isSolution, isOutdated } = useSelector((state) => state.solution);

  const solveConfiguration = () => {
    if (outdatedConstraints.length > 0) {
      alert(
        "Constraints are inconsistent! Please resolve them before generating a solution."
      );
      return;
    }
    dispatch(solutionActions.setInternalData(internalData));
    navigate("/show-solution");
  };

  return (
    <React.Fragment>
      <RowContainer style={{ height: "100vh", alignItems: "start" }}>
        <SaveCurrentSetupModal
          setIsModalOpen={setShowSaveCurrentSetupModal}
          isModalOpen={showSaveCurrentSetupModal}
        />
        <SidebarComponent
          show={show}
          setShow={setShow}
          setOptionsTypes={setOptionsTypes}
          optionsTypes={optionsTypes}
          setShowSaveCurrentSetupModal={setShowSaveCurrentSetupModal}
        />
        <HomePage>
          <Header>
            <HomePageTitle>Sport Tournament Scheduling</HomePageTitle>
            <ButtonGroup>
              <GeneralButton onClick={solveConfiguration}>
                Generate new solution
              </GeneralButton>
              {isSolution && (
                <RowContainer style={{ width: "auto", gap: "5px" }}>
                  <GeneralButton onClick={() => navigate("/show-solution")}>
                    View previous solution
                  </GeneralButton>
                  {isOutdated && <Icon src={outdated_icon} />}
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
      </RowContainer>
    </React.Fragment>
  );
};

const Icon = styled.img`
  width: 40px;
  height: 40px;
`;

const ButtonGroup = styled(RowContainer)`
  margin-bottom: 20px;
  gap: 40px;
`;

const Header = styled(ColumnContainer)`
  height: 150px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: white;
`;

const HomePage = styled(ColumnContainer)`
  overflow-y: scroll;
  justify-content: start;
  gap: 20px;
`;

const HomePageTitle = styled(Title)`
  margin-bottom: ${margins.lrg};
  width: auto;
`;
const HomePageBodySection = styled(RowContainer)`
  align-items: start;
  width: 100%;
`;

export default HomeScreen;

// align-items: start;
//   justify-content: start;
// overflow-y: scroll;

// {/* <HomePageBodySection> */}
//           {/* <SetupPanel /> */}
//           {/* <div style={{ paddingTop: "150px" }}></div> */}

// {/* </HomePageBodySection> */}
//           {/* <HomePageBodySection>
//             <SnapshotsPanel />
//             <WorkingCopy />
//           </HomePageBodySection> */}
