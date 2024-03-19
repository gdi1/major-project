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
import { useSelector } from "react-redux";

/**
 * References
 *
 * “React-Notifications,” npm, n.d.,
 * https://www.npmjs.com/package/react-notifications.
 */
const App = () => {
  const { isSolution } = useSelector((state) => state.solution);
  const { name } = useSelector((state) => state.flow);
  console.log("App", window.location);
  const path = window.location.pathname.split("/").slice(0, 2);
  const redirectPath = path.join("/");
  console.log("App", redirectPath, window.location.origin + redirectPath);
  return (
    <FullView>
      <NotificationContainer />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route
          path="/new-constraint"
          element={
            name !== undefined ? (
              <ConstraintCreationScreen />
            ) : (
              <Navigate replace to="/" />
            )
          }
        />
        <Route
          path="/show-solution"
          element={
            isSolution ? <SolutionScreen /> : <Navigate replace to="/" />
          }
        />
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
