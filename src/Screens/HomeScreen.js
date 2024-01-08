import { ColumnContainer, RowContainer } from "../GeneralComponents/Containers";
import SetupPanel from "../HomeComponents/InitialSetupPanel/SetupPanel";
import ConstraintsPanel from "../HomeComponents/ConstraintPanel/ConstraintsPanel";
import Title from "../GeneralComponents/Title";
import styled from "styled-components";
import margins from "../style-utils/margins";

const HomeScreen = () => {
  return (
    <HomePage>
      <HomePageTitle>Welcome to Sport Tournament Scheduling</HomePageTitle>
      <HomePageBody>
        <SetupPanel />
        <ConstraintsPanel />
      </HomePageBody>
    </HomePage>
  );
};

const HomePage = styled(ColumnContainer)``;
const HomePageTitle = styled(Title)`
  margin-bottom: ${margins.lrg};
`;
const HomePageBody = styled(RowContainer)`
  align-items: start;
  width: 100%;
`;
export default HomeScreen;
