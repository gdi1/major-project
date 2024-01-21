import React from "react";
import { useDispatch } from "react-redux";
import { MultiSelect } from "react-multi-select-component";
import { currentConstraintActions } from "../store/currentConstraint";
import Block from "./Block";
import InputField from "../GeneralComponents/InputField";
import styled from "styled-components";
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

const ConstraintBlock = ({ type }) => {
  const dispatch = useDispatch();
  const multiselect_types = [
    "locations",
    "weeks",
    "periods",
    "teams",
    "play-against",
    "not-play-against",
  ];

  const getContentBlock = () => {
    if (multiselect_types.includes(type)) {
      return (
        <React.Fragment>
          {blockNames[type]}
          <MultiSelect options={[]} disabled={true} labelledBy="Select" />
        </React.Fragment>
      );
    } else if (type === "at-least" || type === "at-most") {
      return (
        <React.Fragment>
          {blockNames[type][0]}
          <NoOfTimesInputField type="number" disabled={true} />
          {blockNames[type][1]}
        </React.Fragment>
      );
    } else {
      return <React.Fragment>{blockNames[type]}</React.Fragment>;
    }
  };

  const addConstraintBlock = (type) => {
    dispatch(currentConstraintActions.addNewConstraintBlock(type));
  };

  return (
    <SelectionBlock onClick={() => addConstraintBlock(type)}>
      {getContentBlock()}
    </SelectionBlock>
  );
};

const SelectionBlock = styled(Block)`
  &:hover {
    background-color: ${colors.creme};
  }
`;

const NoOfTimesInputField = styled(InputField)`
  width: 40%;
  box-sizing: border-box;
`;

export default ConstraintBlock;
