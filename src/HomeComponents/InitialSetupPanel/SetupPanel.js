// import styled from "styled-components";
// import { ColumnContainer } from "../../GeneralComponents/Containers";
// import { constraintsActions } from "../../store/constraints";
// import InputSection from "./InputSection";
// import borders from "../../style-utils/borders";
// import { useSelector } from "react-redux";

// const SetupPanel = () => {
//   const types = [
//     { type: "teams", updateFunction: constraintsActions.addTeam },
//     { type: "locations", updateFunction: constraintsActions.addLocation },
//     { type: "periods", updateFunction: constraintsActions.addPeriod },
//     { type: "weeks", updateFunction: constraintsActions.addWeeks },
//   ];
//   const { periods, teams } = useSelector((state) => state.constraints);
//   console.log(periods, teams);
//   return (
//     <SetupSection>
//       {types.map(({ type, updateFunction }, idx) => (
//         <InputSection
//           title={type[0].toUpperCase() + type.substring(1)}
//           type={type}
//           updateFunction={updateFunction}
//           key={idx}
//         />
//       ))}
//     </SetupSection>
//   );
// };

// const SetupSection = styled(ColumnContainer)`
//   width: 50%;
//   border: ${borders.small};
//   border-bottom: 0;
// `;
// export default SetupPanel;
