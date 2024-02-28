import { useSelector } from "react-redux";
import { constraintFlowActions } from "../store/constraintFlow";
import { useDispatch } from "react-redux";
import { MultiSelect } from "react-multi-select-component";
import React, { useState } from "react";
import styled from "styled-components";
import Block from "./Block";
import InputField from "../GeneralComponents/InputField";
import delete_icon from "./../icons/delete_icon.png";
import GeneralButton from "../GeneralComponents/GeneralButton";
import { TooltipText } from "../GeneralComponents/TooltipText";
import { SmallIcon } from "../GeneralComponents/Icons";
import text_styles from "../style-utils/text_styles";
import colors from "../style-utils/colors";

const blockNames = {
  teams: "Team(s) ",
  locations: "Location(s) ",
  weeks: "Week(s)",
  periods: "Period(s)",
  and: "AND",
  or: "OR",
  "at-least": ["At least", "times"],
  "at-most": ["At most", "times"],
  play: "Play",
  "not-play": "Not Play",
  "play-against": "Play Against ",
  "not-play-against": "Not Play Against ",
};

const FlowBlock = ({ id, type, selectedOptions }) => {
  const dispatch = useDispatch();
  const global_state = useSelector((state) => state.constraints);
  //   console.log(id, type, selectedOptions);

  const removeBlock = () => {
    dispatch(constraintFlowActions.removeFlowBlock(type));
  };

  const handleChange = (selectedOptions) => {
    dispatch(
      constraintFlowActions.updateOptions({ selectedOptions, id, type })
    );
  };

  const handleInputChange = (e) => {
    const sanitizedValue = e.target.value.replace(/\D/g, "");
    dispatch(
      constraintFlowActions.updateOptions({
        selectedOptions: [{ value: sanitizedValue, label: sanitizedValue }],
        id,
        type,
      })
    );
  };

  const [showRemoveOverlayMessage, setShowRemoveOverlayMessage] =
    useState(false);

  const getContentBlock = () => {
    const multiselect_types = [
      "locations",
      "weeks",
      "periods",
      "teams",
      "play-against",
      "not-play-against",
    ];
    const derived_multiselect_types = ["play-against", "not-play-against"];
    if (multiselect_types.includes(type)) {
      return (
        <React.Fragment>
          <Name>{blockNames[type]}</Name>
          <div
            style={{ width: "8vw" }}
            // onMouseEnter={() => {
            //   setShowRemoveOverlayMessage(false);
            // }}
            // onClick={(e) => {
            //   e.stopPropagation();
            // }}
            // onMouseLeave={() => setShowRemoveOverlayMessage(true)}
          >
            <MultiSelect
              options={
                derived_multiselect_types.includes(type)
                  ? global_state["teams"]
                  : global_state[type]
              }
              value={selectedOptions}
              onChange={handleChange}
              labelledBy="Select"
            />
          </div>
        </React.Fragment>
      );
    } else if (type === "at-least" || type === "at-most") {
      return (
        <React.Fragment>
          <Name>{blockNames[type][0]}</Name>
          <div
            // onMouseEnter={() => setShowRemoveOverlayMessage(false)}
            // onMouseLeave={() => setShowRemoveOverlayMessage(true)}
            style={{ width: "30%" }}
            // onClick={(e) => {
            //   e.stopPropagation();
            // }}
          >
            <NoOfTimesInputField
              value={selectedOptions[0].label}
              onChange={handleInputChange}
              placeholder="Only digits allowed"
            />
          </div>
          <Name>{blockNames[type][1]}</Name>
        </React.Fragment>
      );
    } else {
      return <Name>{blockNames[type]}</Name>;
    }
  };

  return (
    <PreviewBlockComponent
    // onClick={removeBlock}
    // showX={showRemoveOverlayMessage}
    // onMouseEnter={() => setShowRemoveOverlayMessage(true)}
    // onMouseLeave={() => setShowRemoveOverlayMessage(false)}
    >
      {getContentBlock()}
      <GeneralButton onClick={removeBlock}>
        <SmallIcon src={delete_icon} />
        <TooltipText>Delete '{type}' block</TooltipText>
      </GeneralButton>
    </PreviewBlockComponent>
  );
};

const Name = styled.div`
  font-size: ${text_styles.fonts.xsmall};
  font-family: ${text_styles.styles.fontFamily};
`;

const PreviewBlockComponent = styled(Block)`
  width: 20vw;
`;
//width: 300px;

const NoOfTimesInputField = styled(InputField)`
  width: 100%;
  box-sizing: border-box;
`;

export default FlowBlock;

// position: relative;

//   &:hover {
//     background-color: ${(props) => (props.showX ? colors.creme : "")};
//   }

//   background: ${(props) =>
//     props.showX
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
