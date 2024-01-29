import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import ConstraintCreationScreen from "./Screens/ConstraintCreationScreen";
import SolutionScreen from "./Screens/SolutionScreen";
import { useEffect } from "react";
import SetupOptionsPanel from "./HomeComponents/InitialSetupPanel/SetupOptionsPanel";
import ConstraintsPanel from "./HomeComponents/ConstraintPanel/ConstraintsPanel";
import { useDispatch } from "react-redux";
import { snapshotsHistoryActions } from "./store/snapshotsHistory";

const App = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // dispatch(snapshotsHistoryActions.removeAllSnapshots());
  // useEffect(() => {
  //   if (localStorage.getItem("firstLoadDone") !== null) navigate("/");
  // }, []);
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />}>
        <Route path="options" element={<SetupOptionsPanel />} />
        <Route path="constraints" element={<ConstraintsPanel />} />
      </Route>
      <Route path="/new-constraint" element={<ConstraintCreationScreen />} />
      <Route path="/show-solution" element={<SolutionScreen />} />
      <Route path="/*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default App;
