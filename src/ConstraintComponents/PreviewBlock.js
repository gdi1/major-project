import { MultiSelect } from "react-multi-select-component";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Block from "./Block";
import { currentConstraintActions } from "../store/currentConstraint";
import InputField from "../GeneralComponents/InputField";
import styled from "styled-components";

const blockNames = {
  teams: "Team(s) ",
  locations: "Location ",
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

const PreviewBlock = ({ block, x, y }) => {
  const global_state = useSelector((state) => state.constraints);
  const { focusedConstraint } = useSelector((state) => state.currentConstraint);

  const dispatch = useDispatch();

  const handleChange = (selectedOptions) => {
    dispatch(currentConstraintActions.updateOptions({ selectedOptions, x, y }));
  };

  const removeConstraintBlock = (e) => {
    if (focusedConstraint !== x) return;
    dispatch(currentConstraintActions.removeConstraintBlock({ x, y }));
  };

  const handleInputChange = (e) => {
    const sanitizedValue = e.target.value.replace(/\D/g, "");
    dispatch(
      currentConstraintActions.updateOptions({
        selectedOptions: sanitizedValue,
        x,
        y,
      })
    );
  };

  const getContentBlock = () => {
    const { type } = block;
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
            onClick={(e) => {
              if (focusedConstraint === x) e.stopPropagation();
            }}
          >
            <MultiSelect
              options={
                derived_multiselect_types.includes(type)
                  ? global_state["teams"]
                  : global_state[type]
              }
              value={block.options}
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
            onClick={(e) => {
              if (focusedConstraint === x) e.stopPropagation();
            }}
            style={{ width: "30%" }}
          >
            <NoOfTimesInputField
              type="number"
              value={block.times}
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
    <Block isSelection={false} onClick={removeConstraintBlock}>
      {getContentBlock()}
    </Block>
  );
};

const NoOfTimesInputField = styled(InputField)`
  width: 100%;
  box-sizing: border-box;
`;

export default PreviewBlock;
