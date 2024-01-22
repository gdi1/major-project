import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import ConstraintCreationScreen from "./Screens/ConstraintCreationScreen";
import SolutionScreen from "./Screens/SolutionScreen";
import { useEffect } from "react";

const App = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (localStorage.getItem("firstLoadDone") !== null) navigate("/");
  // }, []);
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/new-constraint" element={<ConstraintCreationScreen />} />
      <Route path="/show-solution" element={<SolutionScreen />} />
      <Route path="/*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default App;
