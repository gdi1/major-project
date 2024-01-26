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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import borders from "../style-utils/borders";
import { Outlet } from "react-router-dom";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState("home");
  const solveConfiguration = () => {
    // dispatch(
    //   solutionActions.createValueToOptionMappings({
    //     teams,
    //     weeks,
    //     locations,
    //     periods,
    //   })
    // );
    dispatch(solutionActions.setSolution());
    navigate("/show-solution");
  };

  return (
    <React.Fragment>
      <RowContainer style={{ height: "100vh", alignItems: "start" }}>
        <SidebarComponent setShow={setShow} />
        <HomePage>
          <Header>
            <HomePageTitle>Sport Tournament Scheduling</HomePageTitle>
            <GeneralButton onClick={solveConfiguration}>
              Solve current configuration
            </GeneralButton>
          </Header>
          {/* <HomePageBodySection> */}
          {/* <SetupPanel /> */}
          {/* <div style={{ paddingTop: "150px" }}></div> */}
          {(show === "home" || show === "options") && <SetupOptionsPanel />}
          {(show === "home" || show === "constraints") && <ConstraintsPanel />}
          {/* </HomePageBodySection> */}
          {/* <HomePageBodySection>
            <SnapshotsPanel />
            <WorkingCopy />
          </HomePageBodySection> */}
        </HomePage>
        <Outlet />
      </RowContainer>
    </React.Fragment>
  );
};
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

// align-items: start;
//   justify-content: start;
// overflow-y: scroll;

export default HomeScreen;
