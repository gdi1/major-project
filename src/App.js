import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import ConstraintCreationScreen from "./Screens/ConstraintCreationScreen";
import SolutionScreen from "./Screens/SolutionScreen";
import React from "react";
import SetupOptionsPanel from "./HomeComponents/ParametersPanel/SetupOptionsPanel";
import ConstraintsPanel from "./HomeComponents/ConstraintPanel/ConstraintsPanel";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "reactflow/dist/style.css";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import styled from "styled-components";
import colors from "./style-utils/colors";
import paddings from "./style-utils/paddings";

const App = () => {
  // useEffect(() => {
  //   if (localStorage.getItem("firstLoadDone") !== null) navigate("/");
  // }, []);
  return (
    <FullView>
      <NotificationContainer />
      <ReactNotifications />
      <Routes>
        <Route path="/" element={<HomeScreen />}>
          <Route path="options" element={<SetupOptionsPanel />} />
          <Route path="constraints" element={<ConstraintsPanel />} />
        </Route>
        <Route path="/new-constraint" element={<ConstraintCreationScreen />} />
        <Route path="/show-solution" element={<SolutionScreen />} />
        <Route path="/*" element={<Navigate replace to="/" />} />
      </Routes>
    </FullView>
  );
};

const FullView = styled.div`
  width: 100vw;
  height: 100vh;
  padding: ${paddings.xxsmall};
  box-sizing: border-box;
  background-color: ${colors.beige};
`;

export default App;
