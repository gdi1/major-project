import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MultiSelect } from "react-multi-select-component";
import { currentConstraintActions } from "../store/currentConstraint";
import Block from "./Block";
import InputField from "../GeneralComponents/InputField";
import styled from "styled-components";
import colors from "../style-utils/colors";
import { constraintFlowActions } from "../store/constraintFlow";
import text_styles from "../style-utils/text_styles";

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
  const { selectedNode } = useSelector((state) => state.flow);

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
          <Name>{blockNames[type]}</Name>
          <MultiSelect options={[]} disabled={true} labelledBy="Select" />
        </React.Fragment>
      );
    } else if (type === "at-least" || type === "at-most") {
      return (
        <React.Fragment>
          <Name>{blockNames[type][0]}</Name>
          <NoOfTimesInputField type="number" disabled={true} />
          <Name>{blockNames[type][1]}</Name>
        </React.Fragment>
      );
    } else {
      return <Name>{blockNames[type]}</Name>;
    }
  };

  const addConstraintBlock = (type) => {
    dispatch(currentConstraintActions.addNewConstraintBlock(type));
  };

  const addFlowBlock = () => {
    console.log("hello", selectedNode);
    if (selectedNode !== undefined)
      dispatch(constraintFlowActions.addFlowBlock(type));
    else dispatch(constraintFlowActions.addNewNode(type));
  };

  const addNewNode = () => {};

  const removeBlock = () => {
    dispatch(constraintFlowActions.removeFlowBlock(type));
  };

  return (
    <SelectionBlock onClick={addFlowBlock}>{getContentBlock()}</SelectionBlock>
  );
};

const Name = styled.div`
  font-size: ${text_styles.fonts.xsmall};
`;

const SelectionBlock = styled(Block)`
  &:hover {
    background-color: ${colors.mustard};
  }
`;

const NoOfTimesInputField = styled(InputField)`
  width: 40%;
  box-sizing: border-box;
`;

export default ConstraintBlock;
