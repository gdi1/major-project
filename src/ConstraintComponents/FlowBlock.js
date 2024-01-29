import { useSelector } from "react-redux";
import { constraintFlowActions } from "../store/constraintFlow";
import { useDispatch } from "react-redux";
import { MultiSelect } from "react-multi-select-component";
import React, { useState } from "react";
import styled from "styled-components";
import Block from "./Block";
import InputField from "../GeneralComponents/InputField";
import colors from "../style-utils/colors";
import delete_icon from "./../icons/delete_icon.png";

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
        selectedOptions: sanitizedValue,
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
          {blockNames[type]}
          <div
            style={{ width: "60%" }}
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
          {blockNames[type][0]}
          <div
            // onMouseEnter={() => setShowRemoveOverlayMessage(false)}
            // onMouseLeave={() => setShowRemoveOverlayMessage(true)}
            style={{ width: "30%" }}
            // onClick={(e) => {
            //   e.stopPropagation();
            // }}
          >
            <NoOfTimesInputField
              value={selectedOptions}
              onChange={handleInputChange}
              placeholder="Only digits allowed"
            />
          </div>
          {blockNames[type][1]}
        </React.Fragment>
      );
    } else {
      return <React.Fragment>{blockNames[type]}</React.Fragment>;
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
      <Icon src={delete_icon} onClick={removeBlock} />
    </PreviewBlockComponent>
  );
};

const PreviewBlockComponent = styled(Block)`
  width: 300px;
`;

const NoOfTimesInputField = styled(InputField)`
  width: 100%;
  box-sizing: border-box;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
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
