import { Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import ConstraintCreationScreen from "./Screens/ConstraintCreationScreen";
import SolutionScreen from "./Screens/SolutionScreen";
import React from "react";
import "reactflow/dist/style.css";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import styled from "styled-components";
import colors from "./style-utils/colors";
import paddings from "./style-utils/paddings";

const App = () => {
  return (
    <FullView>
      <NotificationContainer />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
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
  overflow: hidden;
`;

export default App;

// <Route path="options" element={<SetupOptionsPanel />} />
//           <Route path="constraints" element={<ConstraintsPanel />} />
//           </Route>

// useEffect(() => {
//   if (localStorage.getItem("firstLoadDone") !== null) navigate("/");
// }, []);
