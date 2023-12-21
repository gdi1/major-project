import { Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import ConstraintCreationScreen from "./Screens/ConstraintCreationScreen";
import SolutionScreen from "./Screens/SolutionScreen";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/new-constraint" element={<ConstraintCreationScreen />} />
      <Route path="/solution" element={<SolutionScreen />} />
      <Route path="/*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default App;
