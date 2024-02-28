// import { MultiSelect } from "react-multi-select-component";
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Block from "./Block";
// import { currentConstraintActions } from "../store/currentConstraint";
// import InputField from "../GeneralComponents/InputField";
// import styled from "styled-components";
// import colors from "../style-utils/colors";

// const blockNames = {
//   teams: "Team(s) ",
//   locations: "Location ",
//   weeks: "Week(s)",
//   periods: "Period(s)",
//   and: "AND",
//   or: "OR",
//   "at-least": ["At least", "times"],
//   "at-most": ["At most", "times"],
//   play: "Play",
//   "not-play": "Not Play",
//   "play-against": "Play Against ",
//   "not-play-against": "Not Play Against ",
// };

// const PreviewBlock = ({ block, x, y }) => {
//   const global_state = useSelector((state) => state.constraints);
//   const { focusedConstraint } = useSelector((state) => state.currentConstraint);

//   useEffect(() => {
//     // Find the dynamically added div with class "dropdown-container"
//     const dropdownContainer = document.querySelector(".dropdown-content");

//     // Check if the div exists before attempting to modify its styles
//     if (dropdownContainer) {
//       // Set the z-index to 100
//       dropdownContainer.style.zIndex = 100;
//     }
//   });

//   const dispatch = useDispatch();

//   const handleChange = (selectedOptions) => {
//     dispatch(currentConstraintActions.updateOptions({ selectedOptions, x, y }));
//   };

//   const removeConstraintBlock = () => {
//     if (focusedConstraint !== x) return;
//     dispatch(currentConstraintActions.removeConstraintBlock({ x, y }));
//   };

//   const handleInputChange = (e) => {
//     const sanitizedValue = e.target.value.replace(/\D/g, "");
//     dispatch(
//       currentConstraintActions.updateOptions({
//         selectedOptions: sanitizedValue,
//         x,
//         y,
//       })
//     );
//   };

//   const [showRemoveOverlayMessage, setShowRemoveOverlayMessage] =
//     useState(false);

//   const getContentBlock = () => {
//     const { type } = block;
//     const multiselect_types = [
//       "locations",
//       "weeks",
//       "periods",
//       "teams",
//       "play-against",
//       "not-play-against",
//     ];
//     const derived_multiselect_types = ["play-against", "not-play-against"];
//     if (multiselect_types.includes(type)) {
//       return (
//         <React.Fragment>
//           {blockNames[type]}
//           <div
//             style={{ width: "60%" }}
//             onClick={(e) => {
//               if (focusedConstraint === x) e.stopPropagation();
//             }}
//             onMouseEnter={() => {
//               setShowRemoveOverlayMessage(false);
//               console.log("bla");
//             }}
//             onMouseLeave={() => setShowRemoveOverlayMessage(true)}
//           >
//             <MultiSelect
//               options={
//                 derived_multiselect_types.includes(type)
//                   ? global_state["teams"]
//                   : global_state[type]
//               }
//               value={block.options}
//               onChange={handleChange}
//               disabled={focusedConstraint !== x}
//               labelledBy="Select"
//             />
//           </div>
//         </React.Fragment>
//       );
//     } else if (type === "at-least" || type === "at-most") {
//       return (
//         <React.Fragment>
//           {blockNames[type][0]}
//           <div
//             onClick={(e) => {
//               if (focusedConstraint === x) e.stopPropagation();
//             }}
//             onMouseEnter={() => setShowRemoveOverlayMessage(false)}
//             onMouseLeave={() => setShowRemoveOverlayMessage(true)}
//             style={{ width: "30%" }}
//           >
//             <NoOfTimesInputField
//               type="number"
//               value={block.times}
//               onChange={handleInputChange}
//               placeholder="Only digits allowed"
//             />
//           </div>
//           {blockNames[type][1]}
//         </React.Fragment>
//       );
//     } else {
//       return <React.Fragment>{blockNames[type]}</React.Fragment>;
//     }
//   };

//   return (
//     <PreviewBlockComponent
//       onClick={removeConstraintBlock}
//       focused={focusedConstraint === x}
//       showX={showRemoveOverlayMessage}
//       onMouseEnter={() => setShowRemoveOverlayMessage(true)}
//       onMouseLeave={() => setShowRemoveOverlayMessage(false)}
//     >
//       {getContentBlock()}
//     </PreviewBlockComponent>
//   );
// };

// const PreviewBlockComponent = styled(Block)`
//   position: relative;

//   &:hover {
//     background-color: ${(props) => (props.focused ? colors.creme : "")};
//   }

//   background: ${(props) =>
//     props.showX && props.focused
//       ? `linear-gradient(
//     to top left,
//     rgba(0, 0, 0, 0) 0%,
//     rgba(0, 0, 0, 0) calc(50% - 0.8px),
//     rgba(0, 0, 0, 1) 50%,
//     rgba(0, 0, 0, 0) calc(50% + 0.8px),
//     rgba(0, 0, 0, 0) 100%
//   ),
//   linear-gradient(
//     to top right,
//     rgba(0, 0, 0, 0) 0%,
//     rgba(0, 0, 0, 0) calc(50% - 0.8px),
//     rgba(0, 0, 0, 1) 50%,
//     rgba(0, 0, 0, 0) calc(50% + 0.8px),
//     rgba(0, 0, 0, 0) 100%
//   )`
//       : ""};
// `;

// const NoOfTimesInputField = styled(InputField)`
//   width: 100%;
//   box-sizing: border-box;
// `;

// export default PreviewBlock;

// // const Anchor = styled.span`
// //   position: relative;
// // `;
// // const List = styled.ul`
// //   position: absolute;
// //   z-index: 1000;
// // `;

// /* {
//               <React.Fragment>
//                 <Anchor onClick={() => setShowOptions((prev) => !prev)}>
//                   Select...
//                 </Anchor>
//                 {isShowOptions && (
//                   <List>
//                     <li style={{ zIndex: "1000" }}>
//                       <input type="checkbox" />
//                       Apple
//                     </li>
//                     <li style={{ zIndex: "1000" }}>
//                       <input type="checkbox" />
//                       Orange
//                     </li>
//                   </List>
//                 )}
//               </React.Fragment>
//             } */
