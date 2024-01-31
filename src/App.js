import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import ConstraintCreationScreen from "./Screens/ConstraintCreationScreen";
import SolutionScreen from "./Screens/SolutionScreen";
import React, { useEffect } from "react";
import SetupOptionsPanel from "./HomeComponents/InitialSetupPanel/SetupOptionsPanel";
import ConstraintsPanel from "./HomeComponents/ConstraintPanel/ConstraintsPanel";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "reactflow/dist/style.css";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

const App = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (localStorage.getItem("firstLoadDone") !== null) navigate("/");
  // }, []);
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default App;
